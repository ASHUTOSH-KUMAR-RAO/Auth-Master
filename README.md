# Auth Master

A modern, full-featured authentication system built with Next.js 16, NextAuth.js v5, and Prisma. This project provides a comprehensive authentication solution with a beautiful UI powered by Radix UI components and Tailwind CSS.

## Features

- 🔐 Complete authentication system with NextAuth.js v5
- 💾 Database integration with Prisma ORM
- 🎨 Modern UI components using Radix UI
- 📧 Email integration with Resend
- ✅ Form validation with React Hook Form and Zod
- 🔒 Secure password hashing with bcrypt
- 📱 Responsive design with Tailwind CSS
- 🎯 Type-safe with TypeScript
- 📊 Data visualization with Recharts

## Tech Stack

- **Framework:** Next.js 16.0.1
- **Authentication:** NextAuth.js v5.0.0-beta.30
- **Database ORM:** Prisma 6.19.0
- **UI Components:** Radix UI
- **Styling:** Tailwind CSS v4
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Language:** TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 20 or higher recommended)
- npm or yarn
- A database (PostgreSQL, MySQL, or SQLite)

## Installation

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
DATABASE_URL="your-database-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="your-resend-api-key"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

## Available Scripts

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Create an optimized production build
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
auth-master/
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                 # Utility functions and configurations
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets
└── styles/             # Global styles
```

## Key Dependencies

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

## Database Setup

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

## Authentication Configuration

NextAuth.js v5 is configured with:
- Prisma adapter for database sessions
- Multiple authentication providers support
- Secure session management
- Email verification capabilities

## Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

Create an optimized production build:
```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.

## Support

For support, please open an issue in the repository.

---

Built with ❤️ using Next.js and NextAuth.js
