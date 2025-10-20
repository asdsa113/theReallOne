# Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB (optional)
- TMDB API Key

## Environment Variables

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vel-streaming
TMDB_API_KEY=your_tmdb_api_key_here
NODE_ENV=production
```

## Production Build

### 1. Install Dependencies
```bash
npm install --production
```

### 2. Build Frontend
```bash
npm run build
```

This creates optimized files in `dist/` directory.

### 3. Test Production Build
```bash
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Add Environment Variables**
- Go to Vercel Dashboard
- Settings > Environment Variables
- Add `TMDB_API_KEY`

4. **Configure vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Build and Deploy**
```bash
npm run build
netlify deploy --prod
```

3. **Configure netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: DigitalOcean / AWS / GCP

1. **Create Droplet/Instance**
2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone Repository**
```bash
git clone <your-repo>
cd vel
```

4. **Install PM2**
```bash
npm install -g pm2
```

5. **Setup Environment**
```bash
cp .env.example .env
nano .env  # Add your keys
```

6. **Build and Start**
```bash
npm install
npm run build
pm2 start server/index.js --name vel-streaming
pm2 startup
pm2 save
```

7. **Setup Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /path/to/vel/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Option 4: Docker

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000 5000

CMD ["npm", "start"]
```

2. **Create docker-compose.yml**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "5000:5000"
    environment:
      - PORT=5000
      - TMDB_API_KEY=${TMDB_API_KEY}
      - MONGODB_URI=mongodb://mongo:27017/vel
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

volumes:
  mongo-data:
```

3. **Build and Run**
```bash
docker-compose up -d
```

### Option 5: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and Create App**
```bash
heroku login
heroku create vel-streaming
```

3. **Add Buildpacks**
```bash
heroku buildpacks:add heroku/nodejs
```

4. **Set Environment Variables**
```bash
heroku config:set TMDB_API_KEY=your_key_here
```

5. **Create Procfile**
```
web: npm run dev
```

6. **Deploy**
```bash
git push heroku main
```

## Database Setup

### MongoDB Atlas (Cloud)
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Get connection string
4. Update `.env` with connection string

### Local MongoDB
```bash
# Install MongoDB
sudo apt-get install mongodb

# Start service
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Performance Optimization

### 1. Enable Gzip Compression
```javascript
import compression from 'compression'
app.use(compression())
```

### 2. Caching
```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600')
  next()
})
```

### 3. CDN for Static Assets
- Use Cloudflare
- Or AWS CloudFront
- Or Vercel Edge Network

### 4. Image Optimization
- Use TMDB's smaller image sizes
- Implement lazy loading
- Use WebP format

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs vel-streaming
```

### Health Check Endpoint
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})
```

## Security Checklist

- [ ] Set strong MongoDB password
- [ ] Use environment variables
- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Rate limiting
- [ ] Input validation
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Keep dependencies updated

## Backup Strategy

### Database Backup
```bash
mongodump --db vel-streaming --out /backup/$(date +%Y%m%d)
```

### Automated Backups
```bash
crontab -e
# Add: 0 2 * * * /path/to/backup-script.sh
```

## Scaling

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Run multiple instances with PM2 cluster mode
- Use Redis for session storage

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Implement caching

## Troubleshooting

### Application Won't Start
```bash
# Check logs
pm2 logs vel-streaming --lines 100

# Check environment
node --version
npm --version
```

### MongoDB Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongodb

# Test connection
mongosh
```

### High Memory Usage
```bash
# Monitor
pm2 monit

# Restart
pm2 restart vel-streaming
```

## Post-Deployment

1. Test all features
2. Check mobile responsiveness
3. Test embed sources
4. Monitor error logs
5. Set up analytics
6. Configure backups
7. Document any issues

## Support

For deployment issues:
- Check logs first
- Review documentation
- Open GitHub issue
- Contact maintainers

