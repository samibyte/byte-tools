# ByteTools -- Developer Utility Marketplace

ByteTools is a curated marketplace for lightweight developer tools.
Built with Next.js 16, MongoDB, NextAuth, Tailwind, and shadcn/ui, it
provides authentication, tool management, and a polished UI.

## Installation (pnpm)

### 1. Clone

git clone https://github.com/your-username/byte-tools.git cd byte-tools

### 2. Install

pnpm install

### 3. Environment variables (.env.local)

MONGODB_URI=your_mongodb_uri\
NEXTAUTH_SECRET=your_secret\
NEXTAUTH_URL=http://localhost:3000\
GITHUB_ID=your_github_client_id\
GITHUB_SECRET=your_github_secret\
GOOGLE_CLIENT_ID=your_google_id\
GOOGLE_CLIENT_SECRET=your_google_secret

### 4. Run

pnpm dev

## Route Summary

### Public

- / --- Landing
- /login --- Login
- /register --- Register
- /discover-tools --- All tools
- /tool-details/\[id\] --- Tool details

### Protected

- /add-tools --- Add tool
- /manage-tools --- Manage tools

### API

- /api/auth/\[...nextauth\] --- Authentication
- /api/tools --- GET all
- /api/tools/latest --- GET latest 6
- /api/tools --- POST create
- /api/tools/\[id\] --- GET/PUT/DELETE
