# Auth Master

A modern, full-featured authentication system built with Next.js 16, NextAuth.js v5, and Prisma. This project provides a comprehensive authentication solution with enterprise-grade security features including Two-Factor Authentication (2FA) and a beautiful UI powered by Shadcn UI components and Tailwind CSS.

## ✨ Features

### 🔐 Security & Authentication
- **Complete authentication system** with NextAuth.js v5
- **Two-Factor Authentication (2FA)** for enhanced security
- **Email verification** with token-based system
- **Credential verification** with secure token management
- **Password reset** with email-based token verification
- **Secure password hashing** with bcrypt
- **Session management** with database persistence
- **Role-based access control** (User/Admin)

### 💎 User Experience
- **Modern glassmorphism UI** with backdrop blur effects
- **Responsive design** that works on all devices
- **Real-time form validation** with instant feedback
- **Toast notifications** for user actions
- **Loading states** and smooth transitions
- **Protected routes** with automatic redirects

### 🛠️ Technical Features
- 💾 **Database integration** with Prisma ORM
- 🎨 **Modern UI components** using Radix UI
- 📧 **Email integration** with Resend
- ✅ **Form validation** with React Hook Form and Zod
- 🎯 **Type-safe** with TypeScript
- 📊 **Data visualization** with Recharts
- 🔄 **Server Actions** for secure API calls

## 🎨 UI Highlights

- **Consistent Design System**: Slate color palette with blue/purple accents
- **Glassmorphism Effects**: Backdrop blur with semi-transparent backgrounds
- **Subtle Animations**: Smooth hover effects and transitions
- **Grid Pattern Background**: Modern geometric overlay
- **Gradient Accents**: Radial gradients for depth
- **Accessible Components**: WCAG compliant UI elements

## 🚀 Tech Stack

- **Framework:** Next.js 16.0.1
- **Authentication:** NextAuth.js v5.0.0-beta.30
- **Database ORM:** Prisma 6.19.0
- **UI Components:** Radix UI
- **Styling:** Tailwind CSS v4
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Language:** TypeScript
- **Email Service:** Resend

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 20 or higher recommended)
- npm or yarn
- A database (PostgreSQL, MySQL, or SQLite)
- Resend API key for email functionality

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd auth-master
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
Create a `.env` file in the root directory and add the following:
```env
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Email Service
RESEND_API_KEY="your-resend-api-key"

# Optional: OAuth Providers
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. (Optional) Seed the database:
```bash
npx prisma db seed
```

## 🎮 Available Scripts

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Create an optimized production build
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npx prisma studio` - Open Prisma Studio to view/edit database

## 📁 Project Structure

```
auth-master/
├── app/                    # Next.js app directory
│   ├── (protected)/       # Protected routes (require auth)
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/             # React components
│   ├── auth/              # Authentication components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions and configurations
├── actions/               # Server actions
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
└── hooks/                 # Custom React hooks
```

## 🔑 Key Features Explained

### Two-Factor Authentication (2FA)
- Users can enable 2FA from their settings
- Token-based verification system
- Secure token generation and validation
- Time-limited tokens for enhanced security

### Email Verification
- Automatic email sending on registration
- Click-to-verify token system
- Token expiration handling
- Resend verification option

### Credential Verification
- Secure token-based credential verification
- Email and password validation
- Token lifecycle management
- Automatic cleanup of expired tokens

### Protected Routes
- Automatic authentication checks
- Role-based access control
- Redirect to login for unauthenticated users
- Admin-only routes protection

## 📦 Key Dependencies

### Core
- **next**: 16.0.1 - React framework for production
- **react**: 19.2.0 - UI library
- **next-auth**: 5.0.0-beta.30 - Authentication solution
- **@prisma/client**: 6.19.0 - Database client

### UI Components (Radix UI)
Complete set of accessible, unstyled UI primitives including:
- Dialog, Dropdown Menu, Popover
- Accordion, Tabs, Navigation Menu
- Form elements (Checkbox, Radio, Select, Slider, Switch)
- Avatar, Tooltip, Alert Dialog
- And many more...

### Form & Validation
- **react-hook-form**: 7.66.0 - Performant form library
- **zod**: 4.1.12 - TypeScript-first schema validation
- **@hookform/resolvers**: 5.2.2 - Form validation resolvers

### Styling
- **tailwindcss**: 4.0 - Utility-first CSS framework
- **tailwind-merge**: 3.4.0 - Merge Tailwind classes
- **class-variance-authority**: 0.7.1 - Create variant components
- **lucide-react**: 0.553.0 - Beautiful icon set

### Additional Features
- **bcrypt/bcryptjs**: Password hashing
- **resend**: Email service integration
- **date-fns**: Date utility library
- **sonner**: Toast notifications
- **recharts**: Chart library for data visualization

## 🗄️ Database Setup

This project uses Prisma as the ORM. To set up your database:

1. Update your `DATABASE_URL` in `.env`
2. Run migrations:
```bash
npx prisma migrate dev
```

3. Open Prisma Studio to view your data:
```bash
npx prisma studio
```

### Database Schema Includes:
- User accounts with email verification
- Two-factor authentication tokens
- Password reset tokens
- Session management
- Role-based permissions

## 🔐 Authentication Configuration

NextAuth.js v5 is configured with:
- Prisma adapter for database sessions
- Credentials provider for email/password login
- OAuth providers support (GitHub, Google)
- Secure session management
- Email verification capabilities
- Two-factor authentication flow

## 💻 Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Development Features:
- Hot Module Replacement (HMR)
- Fast Refresh for instant feedback
- TypeScript error checking
- ESLint for code quality
- Prisma Studio for database management

## 🏗️ Building for Production

Create an optimized production build:
```bash
npm run build
npm start
```

The build process includes:
- Code minification
- Tree shaking
- Image optimization
- Static page generation where possible

## 🔒 Security Best Practices

This project implements:
- ✅ Password hashing with bcrypt
- ✅ CSRF protection
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection
- ✅ Secure session management
- ✅ Token-based verification
- ✅ Rate limiting ready
- ✅ Environment variable security

## 🎯 Roadmap

- [ ] Social OAuth providers (GitHub, Google)
- [ ] Rate limiting for API routes
- [ ] Account lockout after failed attempts
- [ ] Audit logs for security events
- [ ] Password strength meter
- [ ] Remember device functionality
- [ ] API key management
- [ ] Webhook integrations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.

## 💬 Support

For support, please open an issue in the repository or contact the maintainers.

## 👨‍💻 Author

**Ashutosh Kumar Rao**

A passionate developer focused on building secure, modern web applications with cutting-edge technologies.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NextAuth.js for authentication solution
- Shadcn UI for accessible components
- Tailwind CSS for utility-first styling
- Prisma for the excellent ORM

---

Built with ❤️ by Ashutosh Kumar Rao using Next.js, NextAuth.js, and modern web technologies
