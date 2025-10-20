# Contributing to VEL Streaming

## How to Contribute

### Reporting Bugs
1. Check if the bug already exists in Issues
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/OS information

### Suggesting Features
1. Check if the feature is already requested
2. Create a feature request with:
   - Clear description
   - Use case
   - Benefits
   - Possible implementation

### Code Contributions

#### Setup Development Environment
```bash
git clone <your-fork>
cd vel
npm install
cp .env.example .env
```

#### Coding Standards
- Use ESLint configuration
- Follow React best practices
- Use functional components
- Write clean, readable code
- Add comments for complex logic
- Use meaningful variable names

#### Component Guidelines
```jsx
import { useState } from 'react'

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState('')
  
  return (
    <div className="container">
      {/* Component content */}
    </div>
  )
}

export default MyComponent
```

#### Styling Guidelines
- Use Tailwind CSS classes
- Follow mobile-first approach
- Use design system colors
- Maintain consistency
- Test responsiveness

#### API Guidelines
- Use async/await
- Handle errors properly
- Add loading states
- Show user feedback
- Document endpoints

#### Git Workflow
1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make your changes

3. Commit with clear messages:
   ```bash
   git commit -m "Add: New feature description"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature
   ```

5. Create a Pull Request

#### Commit Message Format
- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Update existing feature
- `Remove:` Remove code/files
- `Refactor:` Code refactoring
- `Docs:` Documentation changes
- `Style:` Formatting changes
- `Test:` Adding tests

#### Pull Request Guidelines
- Clear title and description
- Reference related issues
- Add screenshots for UI changes
- Ensure tests pass
- Update documentation
- Keep PR focused and small

### Testing
- Test on multiple browsers
- Test mobile responsiveness
- Test all user flows
- Check console for errors
- Verify accessibility

### Code Review
- Be respectful
- Provide constructive feedback
- Explain suggestions
- Approve when ready
- Learn from others

## Areas to Contribute

### Frontend
- New components
- UI improvements
- Performance optimization
- Accessibility features
- Animation enhancements

### Backend
- API optimization
- New endpoints
- Error handling
- Database queries
- Caching strategies

### Documentation
- Code examples
- Setup guides
- API documentation
- Feature explanations
- Video tutorials

### Design
- UI mockups
- Icons
- Animations
- Color schemes
- Typography

### Testing
- Unit tests
- Integration tests
- E2E tests
- Performance tests
- Accessibility tests

## Community

- Be respectful
- Help others
- Share knowledge
- Give credit
- Have fun!

## Questions?

Feel free to:
- Open an issue
- Start a discussion
- Ask in comments
- Reach out to maintainers

Thank you for contributing! 🎉

