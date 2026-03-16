# kanban

A lightweight kanban board for teams. Create boards, organize work into lists and cards, drag and drop to reprioritize, and track activity — all within organization-based workspaces.

## Features

- **Boards with background images** — each board gets an Unsplash background
- **Lists and cards** — create, edit, copy, delete, and reorder
- **Drag and drop** — move cards between lists and reorder lists on the board
- **Card descriptions** — add details to any card
- **Organizations** — team workspaces with multi-org support via Clerk
- **Activity log** — audit trail for every create, update, and delete action
- **Board limits** — 5 boards per organization (free tier)
- **Auth** — sign in, sign up, and org selection with Clerk
- **Dark mode ready** — OKLch theme tokens with light and dark variants

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 |
| UI | React 19 |
| Styling | Tailwind CSS 4 with OKLch tokens |
| Components | shadcn/ui + Radix UI |
| Auth | Clerk 7 |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7 with PrismaPg adapter |
| Drag & drop | @hello-pangea/dnd |
| State | Zustand + TanStack React Query |
| Validation | Zod |
| Fonts | Geist + Geist Mono |

## Getting started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (we use [Neon](https://neon.tech))
- A [Clerk](https://clerk.com) account with an application created

### 1. Clone and install

```bash
git clone https://github.com/mtohernandez/kanban-manager.git
cd kanban-manager
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── actions/                    # Server actions (CRUD for boards, lists, cards)
│   ├── create-board/           # Each action has index.ts, schema.ts, types.ts
│   ├── create-list/
│   ├── create-card/
│   ├── copy-card/
│   ├── copy-list/
│   ├── update-board/
│   ├── update-card/
│   ├── update-card-order/
│   ├── update-list/
│   ├── update-list-order/
│   ├── delete-board/
│   ├── delete-card/
│   └── delete-list/
├── app/
│   ├── (marketing)/            # Public landing page
│   ├── (platform)/
│   │   ├── (auth)/             # Sign in, sign up, org selection
│   │   └── (dashboard)/
│   │       ├── board/[boardId]/          # Board view with drag-and-drop
│   │       └── organization/[orgId]/     # Org dashboard, activity, settings
│   ├── api/cards/[cardId]/     # Card detail + audit log endpoints
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   └── globals.css             # Tailwind config + OKLch theme tokens
├── components/
│   ├── ui/                     # shadcn components (button, card, dialog, etc.)
│   ├── form/                   # Form components (input, textarea, picker, popover)
│   ├── modals/card-modal/      # Card detail modal (description, activity, actions)
│   └── providers/              # Clerk, React Query, modal, toast providers
├── hooks/
│   ├── use-action.ts           # Server action state management
│   ├── use-card-modal.ts       # Zustand store for card modal
│   └── use-mobile-sidebar.ts   # Mobile sidebar toggle
├── lib/
│   ├── db.ts                   # Prisma client with PrismaPg adapter
│   ├── create-safe-action.ts   # Zod-validated server action wrapper
│   ├── create-audit-log.ts     # Audit log creation
│   ├── org-limit.ts            # Board count enforcement
│   └── generate-log-message.ts # Human-readable log messages
├── constants/
│   ├── boards.ts               # MAX_FREE_BOARDS = 5
│   └── images.ts               # Default Unsplash backgrounds
├── config/
│   └── site.ts                 # App name and description
├── generated/prisma/           # Auto-generated Prisma client
├── middleware.ts                # Clerk auth + route protection
└── types.d.ts                  # Shared type definitions
```

## Architecture

### Routing

The app uses Next.js route groups to separate concerns:

- **(marketing)** — public landing page at `/`
- **(platform)/(auth)** — Clerk auth pages (`/sign-in`, `/sign-up`, `/select-org`)
- **(platform)/(dashboard)** — protected app routes (`/organization/[id]`, `/board/[id]`)

### Middleware

`src/middleware.ts` handles all auth routing:

- Public routes: `/`, `/sign-in`, `/sign-up`
- Authenticated users on public routes get redirected to their org
- Unauthenticated users on protected routes get redirected to sign-in
- Users without an org get redirected to `/select-org`

### Server actions

Every mutation goes through a server action in `src/actions/`. Each action follows the same pattern:

```
action-name/
├── schema.ts   # Zod validation schema
├── types.ts    # TypeScript types (input/output)
└── index.ts    # Handler: auth check → validate → db operation → audit log
```

Actions are wrapped with `createSafeAction()` which validates input with Zod and returns a typed `ActionState` with either `data` or `error`/`fieldErrors`.

On the client, the `useAction` hook manages loading, error, and success states with callbacks.

### Database

PostgreSQL via Prisma 7 with the PrismaPg adapter. Five models:

- **Board** — belongs to an org, has lists, stores Unsplash image metadata
- **List** — belongs to a board, has cards, ordered by `order` field
- **Card** — belongs to a list, optional description, ordered by `order` field
- **AuditLog** — records every action (create/update/delete) with user and entity info
- **OrgLimit** — tracks board count per organization

### State management

- **Zustand** — client state (card modal open/close)
- **React Query** — server state (card details, audit logs)
- **Server actions** — all mutations (no client-side API calls for writes)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Generate Prisma client + build for production |
| `npm start` | Start production server |

## Deployment

Deploy on [Vercel](https://vercel.com) with the same environment variables from `.env`. The build command already runs `prisma generate` before `next build`.

Make sure your database is accessible from Vercel's network (Neon works out of the box).
