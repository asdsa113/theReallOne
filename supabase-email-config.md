# Supabase Email Template Configuration

To customize the email messages sent by Supabase, you need to configure the email templates in your Supabase dashboard.

## Steps to Configure Custom Email Templates:

### 1. Access Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Email Templates**

### 2. Configure Password Reset Email
1. Click on **"Reset Password"** template
2. Replace the default template with:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
  <h1 style="color: #ef4444; font-size: 28px; margin: 0;">NexTv</h1>
    <p style="color: #9ca3af; margin: 5px 0;">Your favorite streaming platform</p>
  </div>
  
  <div style="background: #2a2a2a; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
    <h2 style="color: #ffffff; margin-top: 0;">Reset Your Password</h2>
    <p style="color: #d1d5db; line-height: 1.6;">
  We received a request to reset your password for your NexTv account. 
      Click the button below to set a new password:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: #ef4444; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
        Reset Password
      </a>
    </div>
    
    <p style="color: #9ca3af; font-size: 14px; margin-bottom: 0;">
      This link will expire in 1 hour for security reasons.
    </p>
  </div>
  
  <div style="text-align: center; color: #6b7280; font-size: 12px;">
    <p>If you didn't request this password reset, you can safely ignore this email.</p>
  <p>© 2024 NexTv. All rights reserved.</p>
  </div>
</div>
```

**Subject:** `Reset your NexTv password`

### 3. Configure Email Change Confirmation
1. Click on **"Email Change"** template
2. Replace with:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
  <h1 style="color: #ef4444; font-size: 28px; margin: 0;">NexTv</h1>
    <p style="color: #9ca3af; margin: 5px 0;">Your favorite streaming platform</p>
  </div>
  
  <div style="background: #2a2a2a; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
    <h2 style="color: #ffffff; margin-top: 0;">Confirm Your New Email</h2>
    <p style="color: #d1d5db; line-height: 1.6;">
  You requested to change your email address for your NexTv account. 
      Click the button below to confirm this new email address:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: #ef4444; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
        Confirm Email
      </a>
    </div>
    
    <p style="color: #9ca3af; font-size: 14px; margin-bottom: 0;">
      This link will expire in 24 hours for security reasons.
    </p>
  </div>
  
  <div style="text-align: center; color: #6b7280; font-size: 12px;">
    <p>If you didn't request this email change, please contact support immediately.</p>
  <p>© 2024 NexTv. All rights reserved.</p>
  </div>
</div>
```

**Subject:** `Confirm your new email address - NexTv`

### 4. Configure Welcome Email (Optional)
1. Click on **"Confirm Signup"** template
2. Replace with:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
  <h1 style="color: #ef4444; font-size: 28px; margin: 0;">NexTv</h1>
    <p style="color: #9ca3af; margin: 5px 0;">Your favorite streaming platform</p>
  </div>
  
  <div style="background: #2a2a2a; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
    <h2 style="color: #ffffff; margin-top: 0;">Welcome to NexTv! 🎉</h2>
    <p style="color: #d1d5db; line-height: 1.6;">
      Thanks for joining NexTv! You now have access to thousands of movies and TV shows.
    </p>
    
    <div style="background: #1f2937; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #ef4444; margin-top: 0;">What you can do:</h3>
      <ul style="color: #d1d5db; padding-left: 20px;">
        <li>Watch unlimited movies and TV shows</li>
        <li>Create your personal watchlist</li>
        <li>Track your watch progress</li>
        <li>Get personalized recommendations</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: #ef4444; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
        Confirm Your Account
      </a>
    </div>
  </div>
  
  <div style="text-align: center; color: #6b7280; font-size: 12px;">
    <p>Happy streaming! 🍿</p>
  <p>© 2024 NexTv. All rights reserved.</p>
  </div>
</div>
```

**Subject:** `Welcome to NexTv! 🎬`

## 5. Save Configuration
- Click **"Save"** after updating each template
- Test the emails by triggering password reset or email change flows

## Customization Options:
- **Colors**: Change `#ef4444` (red) to your brand color
- **Logo**: Replace text logo with image URL
- **Content**: Modify the messaging to match your brand voice
- **Styling**: Adjust padding, margins, and colors as needed

## Available Variables:
- `{{ .ConfirmationURL }}` - The confirmation/reset link
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email address
- `{{ .Token }}` - The confirmation token

## Testing:
1. Use the password reset flow to test the reset email
2. Use the email change flow to test the email change confirmation
3. Check both desktop and mobile email clients for proper rendering
