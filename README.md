<div align="center">

<!-- Animated Banner -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=FestFlow&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=College%20Fest%20Management%20System&descAlignY=60&descSize=20" />

<br/>

<!-- Badges Row 1 -->
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<!-- Badges Row 2 -->
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://recharts.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **⚡ A futuristic, glassmorphism-themed college fest management platform**  
> Built for admins, coordinators, and participants — all in one seamless experience.

<br/>

[🚀 Live Demo](#) · [📖 Documentation](#architecture) · [🐛 Report Bug](#) · [✨ Request Feature](#)

<br/>

</div>

---

## 📋 Table of Contents

- [✨ Overview](#-overview)
- [🎯 Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🔄 Application Flow](#-application-flow)
- [📂 Project Structure](#-project-structure)
- [🗺️ User Journey Maps](#️-user-journey-maps)
- [📊 Data Model](#-data-model)
- [🔐 Role-Based Access Control](#-role-based-access-control)
- [🧩 Component Architecture](#-component-architecture)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Tech Stack](#️-tech-stack)
- [🎨 Design System](#-design-system)
- [📡 Module Overview](#-module-overview)
- [🗓️ Event Lifecycle](#️-event-lifecycle)
- [🤝 Contributing](#-contributing)

---

## ✨ Overview

**FestFlow** is a comprehensive, full-featured college fest management system built with a cutting-edge tech stack. It provides a unified platform for managing every aspect of a college fest — from event creation and participant registration to QR-based attendance tracking and certificate generation.

The platform features a **futuristic glassmorphism UI** with dark/light mode, animated transitions via Framer Motion, real-time analytics dashboards, and a role-based access system supporting **Admins**, **Coordinators**, and **Participants**.

```
🎪 Events  →  📝 Register  →  🔍 Scrutiny  →  ✅ Approve  →  🎫 Pass  →  📊 Attend  →  🏆 Certificate
```

---

## 🎯 Key Features

| Feature | Description | Roles |
|---------|-------------|-------|
| 🔐 **Role-Based Auth** | Three distinct roles with tailored dashboards | All |
| 📅 **Event Management** | CRUD events with calendar, timeline & venue views | Admin, Coordinator |
| 📝 **Registration System** | Individual & team registrations with step tracker | Participant |
| 🔍 **Scrutiny Panel** | Document & payment verification with bulk actions | Admin |
| 🎫 **Digital Passes** | QR-coded passes with real-time status | All |
| 📊 **Attendance Tracking** | QR scanner simulation + manual check-in | Coordinator |
| 🏆 **Certificate Generator** | Live preview with 3 templates & category types | Admin |
| 📈 **Analytics Dashboard** | Charts, trends, AI insights & activity log | Admin |
| 🌙 **Dark/Light Mode** | Persistent theme preference | All |
| 🔔 **Notifications** | Real-time bell with unread badge | All |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FestFlow Application                      │
│                                                                   │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────────┐ │
│  │   Auth      │    │   Context    │    │     React Router     │ │
│  │   Layer     │───▶│   Providers  │───▶│   (Protected Routes) │ │
│  └─────────────┘    └──────────────┘    └──────────────────────┘ │
│         │                  │                       │              │
│         ▼                  ▼                       ▼              │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    Page Components                           │  │
│  │  ┌──────────┐ ┌────────────┐ ┌──────────┐ ┌─────────────┐  │  │
│  │  │Dashboard │ │Registrations│ │ Scrutiny │ │  Analytics  │  │  │
│  │  └──────────┘ └────────────┘ └──────────┘ └─────────────┘  │  │
│  │  ┌──────────┐ ┌────────────┐ ┌──────────┐ ┌─────────────┐  │  │
│  │  │  Events  │ │ Attendance │ │  Passes  │ │Certificates │  │  │
│  │  └──────────┘ └────────────┘ └──────────┘ └─────────────┘  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│         │                                                          │
│         ▼                                                          │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                   Shared UI Layer                            │  │
│  │   DashboardLayout ──▶ AppSidebar + Header                   │  │
│  │   SharedComponents: StatCard, PageHeader, StatusBadge        │  │
│  │   shadcn/ui: Button, Dialog, Table, Tabs, Select, Toast      │  │
│  └─────────────────────────────────────────────────────────────┘  │
│         │                                                          │
│         ▼                                                          │
│  ┌──────────────────────┐   ┌────────────────────────────────┐    │
│  │    Mock Data Layer   │   │      External Libraries        │    │
│  │  mockData.ts         │   │  Recharts · QRCode · Framer    │    │
│  │  (Events, Reg, etc.) │   │  Motion · Sonner · Lucide      │    │
│  └──────────────────────┘   └────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Application Flow

### Main Application Flow

```
                    ┌─────────────────┐
                    │   App Entry     │
                    │   (main.tsx)    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  QueryClient    │
                    │  Provider       │
                    └────────┬────────┘
                             │
               ┌─────────────▼─────────────┐
               │       ThemeProvider        │
               │  (dark/light persistence)  │
               └─────────────┬─────────────┘
                             │
               ┌─────────────▼─────────────┐
               │       AuthProvider         │
               │  (user state + roles)      │
               └─────────────┬─────────────┘
                             │
               ┌─────────────▼─────────────┐
               │       BrowserRouter        │
               └─────────────┬─────────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
       ┌────▼────┐    ┌──────▼─────┐   ┌─────▼──────┐
       │  "/"    │    │"/dashboard"│   │  Protected │
       │AuthPage │    │+ all routes│   │  Routes    │
       └────┬────┘    └──────┬─────┘   └─────┬──────┘
            │                │               │
       ┌────▼────┐    ┌──────▼─────────────┐ │
       │ Login / │    │   DashboardLayout  │◀┘
       │ SignUp  │    │  Sidebar + Header  │
       └─────────┘    └──────┬─────────────┘
                             │
              ┌──────────────▼──────────────┐
              │        Role Router           │
              │  admin / participant /       │
              │  coordinator                 │
              └──────────────┬──────────────┘
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │  Admin   │  │Participant│  │Coordinator│
        │Dashboard │  │Dashboard │  │Dashboard  │
        └──────────┘  └──────────┘  └──────────┘
```

### Registration Lifecycle Flow

```
  Participant                Admin/Coordinator             System
      │                            │                         │
      │──── Submit Form ──────────▶│                         │
      │                            │──── Create Record ─────▶│
      │◀─── Confirmation ──────────│◀─── pending status ─────│
      │                            │                         │
      │                            │── Review Documents ─────│
      │                            │   (Scrutiny Panel)      │
      │                            │                         │
      │                     ┌──────▼──────┐                  │
      │                     │  Decision   │                  │
      │                     └──────┬──────┘                  │
      │                    ┌───────┴───────┐                 │
      │                    ▼               ▼                 │
      │               Approved          Rejected             │
      │                    │               │                 │
      │◀─── Pass Issued ───│  ◀─ Remarks ──│                 │
      │                    │               │                 │
      │── Attend Event ───▶│               │                 │
      │                    │── QR Scan ───▶│                 │
      │                    │               │── Mark Present ▶│
      │◀── Certificate ────│               │                 │
```

---

## 📂 Project Structure

```
festflow/
│
├── 📁 public/
│   ├── placeholder.svg
│   └── robots.txt
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 dashboard/
│   │   │   └── SharedComponents.tsx   # StatCard, PageHeader, StatusBadge, EmptyState
│   │   ├── 📁 layout/
│   │   │   ├── AppSidebar.tsx         # Role-based navigation sidebar
│   │   │   ├── DashboardLayout.tsx    # Main layout wrapper
│   │   │   ├── Header.tsx             # Top bar with search & notifications
│   │   │   └── ThemeToggle.tsx        # Dark/light mode button
│   │   ├── NavLink.tsx                # Active-state aware nav link
│   │   └── 📁 ui/                     # 40+ shadcn/ui primitives
│   │       ├── button.tsx, input.tsx, dialog.tsx ...
│   │       └── sidebar.tsx, table.tsx, tabs.tsx ...
│   │
│   ├── 📁 contexts/
│   │   ├── AuthContext.tsx             # User state, login, logout, signup
│   │   └── ThemeContext.tsx            # Theme persistence via localStorage
│   │
│   ├── 📁 data/
│   │   └── mockData.ts                 # 70+ mock records across all entities
│   │
│   ├── 📁 hooks/
│   │   ├── use-mobile.tsx              # Responsive breakpoint hook
│   │   └── use-toast.ts               # Toast notification hook
│   │
│   ├── 📁 lib/
│   │   └── utils.ts                    # cn() className utility
│   │
│   ├── 📁 pages/
│   │   ├── AuthPage.tsx               # Login + Signup with role selector
│   │   ├── DashboardPage.tsx          # Role-specific dashboards
│   │   ├── RegistrationsPage.tsx      # Register + manage registrations
│   │   ├── ScrutinyPage.tsx           # Document verification panel
│   │   ├── EventsPage.tsx             # Cards + Calendar + Timeline views
│   │   ├── AttendancePage.tsx         # QR scanner + manual + stats
│   │   ├── PassesPage.tsx             # Digital QR passes
│   │   ├── CertificatesPage.tsx       # Certificate generator + preview
│   │   ├── AnalyticsPage.tsx          # Full analytics dashboard
│   │   └── NotFound.tsx               # 404 page
│   │
│   ├── 📁 test/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   │
│   ├── 📁 types/
│   │   └── index.ts                   # All TypeScript interfaces & types
│   │
│   ├── App.tsx                        # Root component + route definitions
│   ├── index.css                      # Tailwind directives + CSS variables
│   └── main.tsx                       # React DOM entry point
│
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗺️ User Journey Maps

### 👑 Admin Journey

```
┌──────────────────────────────────────────────────────────────┐
│                      ADMIN USER JOURNEY                       │
└──────────────────────────────────────────────────────────────┘

  [Login as Admin]
        │
        ▼
  [Admin Dashboard]
  ├── View Stats Cards (Registrations, Revenue, Events, Attendance)
  ├── Registration Trend Chart
  ├── Category Distribution Pie Chart
  ├── AI Insights Panel
  └── Activity Log Timeline
        │
        ├──▶ [Events Page]
        │         ├── Create / Edit / Delete Events
        │         ├── Calendar View (monthly)
        │         ├── Timeline View (chronological)
        │         └── Venue Allocation Table
        │
        ├──▶ [Registrations Page]
        │         ├── Search & Filter all registrations
        │         ├── Bulk Select → Approve / Reject
        │         └── View individual status badges
        │
        ├──▶ [Scrutiny Panel]
        │         ├── Filter by status
        │         ├── View detailed modal (docs + payment proof)
        │         ├── Add remarks
        │         └── One-click Approve / Reject
        │
        ├──▶ [Attendance Page]
        │         ├── QR Scan Simulation
        │         ├── Manual checkbox table
        │         └── Bar chart + Pie chart stats
        │
        ├──▶ [Passes Page]
        │         └── View all QR passes + download
        │
        ├──▶ [Certificates Page]
        │         ├── Enter name, event, category
        │         ├── Choose template (Gold/Blue/Purple)
        │         └── Live preview + download
        │
        └──▶ [Analytics Page]
                  ├── Daily Registrations (Area Chart)
                  ├── Revenue Trend (Line Chart)
                  ├── Category Distribution (Pie Chart)
                  └── Attendance by Event (Bar Chart)
```

### 🎓 Participant Journey

```
┌──────────────────────────────────────────────────────────────┐
│                   PARTICIPANT USER JOURNEY                    │
└──────────────────────────────────────────────────────────────┘

  [Login as Participant]
        │
        ▼
  [Participant Dashboard]
  ├── My Registrations count
  ├── Upcoming Events count
  └── Certificates count
        │
        ├──▶ [Events Page]
        │         ├── Browse all events (cards view)
        │         ├── Filter by category
        │         └── View event details
        │
        ├──▶ [My Registrations]
        │         ├── View Step Tracker
        │         │   (Pending → Under Scrutiny → Approved)
        │         ├── Click "Register Now"
        │         │   ├── Fill individual/team form
        │         │   ├── Select event
        │         │   └── Submit
        │         └── View all registration status
        │
        ├──▶ [My Passes]
        │         ├── View QR-coded passes
        │         └── Download passes
        │
        └──▶ [Certificates]
                  └── View earned certificates
```

### 🎛️ Coordinator Journey

```
┌──────────────────────────────────────────────────────────────┐
│                   COORDINATOR USER JOURNEY                    │
└──────────────────────────────────────────────────────────────┘

  [Login as Coordinator]
        │
        ▼
  [Coordinator Dashboard]
  ├── Assigned Events count
  ├── Total Participants
  └── Avg Attendance %
        │
        ├──▶ [My Events]
        │         ├── View assigned event cards
        │         └── See registration fill rate
        │
        ├──▶ [Attendance]
        │         ├── QR Scan participants
        │         ├── Manual check-in table
        │         └── View attendance statistics
        │
        └──▶ [Registrations]
                  └── View participant list for events
```

---

## 📊 Data Model

```
┌──────────────────┐         ┌──────────────────┐
│       User       │         │    FestEvent      │
├──────────────────┤         ├──────────────────┤
│ id: string       │         │ id: string        │
│ name: string     │         │ title: string     │
│ email: string    │         │ category: enum    │
│ role: UserRole   │         │ description: str  │
│ avatar?: string  │         │ rules: string[]   │
└──────────────────┘         │ date: string      │
                             │ time: string      │
UserRole = admin |           │ venue: string     │
  participant |              │ coordinator: obj  │
  coordinator                │ maxParticipants   │
                             │ registeredCount   │
                             │ teamSize?: obj    │
                             └──────────┬────────┘
                                        │
                                        │ 1:N
                                        ▼
┌──────────────────────────┐   ┌──────────────────────┐
│      Registration        │   │   AttendanceRecord   │
├──────────────────────────┤   ├──────────────────────┤
│ id: string               │   │ id: string           │
│ participantName: string  │   │ participantName: str │
│ email: string            │   │ eventId: string      │
│ phone: string            │   │ eventTitle: string   │
│ eventId: string          │   │ checkInTime?: string │
│ eventTitle: string       │   │ present: boolean     │
│ type: individual|team    │   └──────────────────────┘
│ teamName?: string        │
│ teamMembers?: string[]   │   ┌──────────────────────┐
│ status: RegStatus        │   │    DigitalPass        │
│ paymentStatus: PayStatus │   ├──────────────────────┤
│ amount: number           │   │ id: string           │
│ registeredAt: string     │   │ participantName: str │
│ documentUrl?: string     │   │ eventTitle: string   │
│ paymentProofUrl?: string │   │ eventDate: string    │
│ remarks?: string         │   │ status: PassStatus   │
└──────────────────────────┘   │ qrData: string       │
                               │ passType: enum       │
RegistrationStatus =           └──────────────────────┘
  pending | under_scrutiny |
  approved | rejected

PaymentStatus =
  paid | pending | failed
```

---

## 🔐 Role-Based Access Control

```
┌──────────────────────────────────────────────────────────────────┐
│                     RBAC PERMISSION MATRIX                        │
├────────────────────┬────────────┬─────────────┬──────────────────┤
│     Feature        │   Admin    │  Coordinator│   Participant    │
├────────────────────┼────────────┼─────────────┼──────────────────┤
│ View Dashboard     │     ✅     │      ✅     │       ✅         │
│ Create Events      │     ✅     │      ❌     │       ❌         │
│ Edit Events        │     ✅     │      ❌     │       ❌         │
│ Delete Events      │     ✅     │      ❌     │       ❌         │
│ View All Reg.      │     ✅     │      ✅     │   Own only       │
│ Scrutiny Panel     │     ✅     │      ❌     │       ❌         │
│ Bulk Approve/Rej.  │     ✅     │      ❌     │       ❌         │
│ Register for Event │     ❌     │      ❌     │       ✅         │
│ QR Attendance Scan │     ✅     │      ✅     │       ❌         │
│ Manual Attendance  │     ✅     │      ✅     │       ❌         │
│ View All Passes    │     ✅     │      ❌     │   Own only       │
│ Generate Cert.     │     ✅     │      ❌     │       ❌         │
│ View Analytics     │     ✅     │      ❌     │       ❌         │
│ View Notifications │     ✅     │      ✅     │       ✅         │
├────────────────────┼────────────┼─────────────┼──────────────────┤
│ Sidebar Nav Items  │     8      │      5      │        5         │
└────────────────────┴────────────┴─────────────┴──────────────────┘
```

### Auth Decision Flow

```
                    ┌─────────────────┐
                    │  User visits /  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ isAuthenticated?│
                    └────────┬────────┘
              ┌──────────────┴──────────────┐
              ▼ No                          ▼ Yes
       ┌──────────────┐             ┌──────────────┐
       │  Show Auth   │             │ Redirect to  │
       │  Page        │             │ /dashboard   │
       └──────┬───────┘             └──────────────┘
              │
       ┌──────▼───────┐
       │ Select Role  │
       │ admin /      │
       │ participant /│
       │ coordinator  │
       └──────┬───────┘
              │
       ┌──────▼───────┐
       │ Set Mock User│
       │ & Redirect   │
       └──────────────┘
```

---

## 🧩 Component Architecture

```
App.tsx
└── QueryClientProvider
    └── ThemeProvider
        └── AuthProvider
            └── TooltipProvider
                ├── Toaster (shadcn)
                ├── Sonner  (toast notifications)
                └── BrowserRouter
                    └── AppRoutes
                        ├── Route "/" → AuthPage
                        │   ├── ThemeToggle
                        │   └── Login/Signup Form
                        │
                        └── ProtectedRoute → DashboardLayout
                            ├── SidebarProvider
                            │   ├── AppSidebar (role-based nav)
                            │   └── Main Content Area
                            │       ├── Header
                            │       │   ├── SidebarTrigger
                            │       │   ├── Search Input
                            │       │   ├── ThemeToggle
                            │       │   ├── NotificationBell
                            │       │   └── UserAvatar + Logout
                            │       └── <Page Content>
                            │
                            └── Pages
                                ├── DashboardPage
                                │   ├── AdminDashboard
                                │   │   ├── StatCard × 4
                                │   │   ├── BarChart (registrations)
                                │   │   ├── PieChart (categories)
                                │   │   ├── AI Insights Panel
                                │   │   └── Activity Log
                                │   ├── ParticipantDashboard
                                │   └── CoordinatorDashboard
                                │
                                ├── EventsPage
                                │   ├── Tabs: Cards | Calendar | Timeline | Venues
                                │   ├── EventCard × N
                                │   └── AddEventDialog
                                │
                                ├── RegistrationsPage
                                │   ├── Step Tracker (participant)
                                │   ├── Search + Filter bar
                                │   ├── Bulk Actions (admin)
                                │   ├── DataTable
                                │   └── RegistrationFormDialog
                                │
                                ├── ScrutinyPage
                                │   ├── Filter bar
                                │   ├── DataTable
                                │   └── DetailModal
                                │       ├── Info Grid
                                │       ├── Doc Preview placeholders
                                │       ├── Remarks Textarea
                                │       └── Approve/Reject buttons
                                │
                                ├── AttendancePage
                                │   ├── Tabs: QR Scanner | Manual | Stats
                                │   ├── QR Scan Simulator
                                │   ├── Checkbox Table
                                │   └── BarChart + PieChart
                                │
                                ├── PassesPage
                                │   └── PassCard × N (QRCodeSVG)
                                │
                                ├── CertificatesPage
                                │   ├── Config Panel
                                │   └── Live Certificate Preview
                                │
                                └── AnalyticsPage
                                    ├── StatCard × 4
                                    ├── AreaChart (daily regs)
                                    ├── LineChart (revenue)
                                    ├── PieChart (categories)
                                    └── BarChart (attendance)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** / **bun** / **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/festflow.git
cd festflow

# 2. Install dependencies
npm install
# or
bun install

# 3. Start development server
npm run dev
# or
bun dev
```

The app will be available at **`http://localhost:8080`**

### Available Scripts

```bash
npm run dev          # Start development server (port 8080)
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run test:watch   # Run tests in watch mode
```

### Quick Login Guide

Once running, use any of these credentials on the login page:

| Role | Email | Select Role |
|------|-------|-------------|
| **Admin** | admin@fest.edu | `Admin` |
| **Participant** | arjun@mail.com | `Participant` |
| **Coordinator** | sharma@fest.edu | `Coordinator` |

> **Note:** Any email/password works — just select the correct role button.

---

## ⚙️ Tech Stack

### Core

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **TypeScript** | 5.8.3 | Type safety |
| **Vite** | 5.4.19 | Build tool & dev server |
| **React Router DOM** | 6.30.1 | Client-side routing |
| **TanStack Query** | 5.83.0 | Data fetching & caching |

### UI & Styling

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS |
| **shadcn/ui** | Latest | Accessible UI primitives |
| **Framer Motion** | 12.38.0 | Animations & transitions |
| **Lucide React** | 0.462.0 | Icon library |
| **Sonner** | 1.7.4 | Toast notifications |
| **next-themes** | 0.3.0 | Theme management |

### Data Visualization

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Recharts** | 2.15.4 | Charts & graphs |
| **qrcode.react** | 4.2.0 | QR code generation |

### Forms & Validation

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React Hook Form** | 7.61.1 | Form state management |
| **@hookform/resolvers** | 3.10.0 | Validation resolvers |
| **Zod** | 3.25.76 | Schema validation |

### Development

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Vitest** | 3.2.4 | Unit testing |
| **Playwright** | 1.57.0 | E2E testing |
| **ESLint** | 9.32.0 | Linting |
| **TypeScript ESLint** | 8.38.0 | TS-aware linting |

---

## 🎨 Design System

### Color Palette

```
Primary (Purple)    ████  hsl(262, 83%, 58%)   #7C3AED
Accent  (Cyan)      ████  hsl(199, 89%, 48%)   #0EA5E9
Success (Green)     ████  hsl(142, 76%, 36%)   #16A34A
Warning (Amber)     ████  hsl(38,  92%, 50%)   #F59E0B
Error   (Red)       ████  hsl(0,   84%, 60%)   #EF4444
```

### Theme Modes

```
┌────────────────────────────────────┐
│         DARK MODE (default)        │
│  Background:  hsl(224, 71%, 4%)    │
│  Card:        hsl(225, 50%, 8%)    │
│  Muted:       hsl(223, 47%, 11%)   │
│  Border:      hsl(223, 47%, 15%)   │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│           LIGHT MODE               │
│  Background:  hsl(220, 20%, 97%)   │
│  Card:        hsl(0,   0%,  100%)  │
│  Muted:       hsl(220, 14%, 96%)   │
│  Border:      hsl(220, 13%, 91%)   │
└────────────────────────────────────┘
```

### Glassmorphism Utilities

```css
.glass-card        /* backdrop-blur + semi-transparent bg + border */
.glass-card-hover  /* glass-card + hover scale + border glow */
.gradient-text     /* purple → cyan → purple gradient text */
.gradient-bg       /* subtle gradient background */
```

### Custom Animations

| Animation | Duration | Use Case |
|-----------|----------|----------|
| `fade-in` | 0.5s | Page load elements |
| `scale-in` | 0.3s | Modals, dialogs |
| `shimmer` | 2s infinite | QR scanner beam |
| `pulse-glow` | 2s infinite | Active scan indicator |
| `accordion-down/up` | 0.2s | Collapsible content |

---

## 📡 Module Overview

### Registration Flow State Machine

```
                    ┌─────────┐
               ┌───▶│ PENDING │────────────────────┐
               │    └────┬────┘                    │
               │         │ Admin reviews           │
               │    ┌────▼──────────┐              │
               │    │ UNDER_SCRUTINY│              │
               │    └────┬──────────┘              │
               │         │                         │
               │   ┌─────┴──────┐                  │
               │   ▼            ▼                  ▼
               │ ┌──────────┐ ┌──────────┐   ┌──────────┐
               └─│ APPROVED │ │ REJECTED │   │  (abort) │
                 └────┬─────┘ └──────────┘   └──────────┘
                      │
                      ▼
               ┌──────────────┐
               │  Pass Issued │
               └──────┬───────┘
                      │
                      ▼
               ┌──────────────┐
               │  Attended /  │
               │ Checked In   │
               └──────┬───────┘
                      │
                      ▼
               ┌──────────────┐
               │  Certificate │
               │  Generated   │
               └──────────────┘
```

### Event Category Distribution

```
Technical  ██████████████████████ 35%  (120 registrations)
Cultural   █████████████████      27%  ( 95 registrations)
Sports     ████████████           19%  ( 65 registrations)
Workshop   ████████               13%  ( 45 registrations)
Gaming     ████                    6%  ( 22 registrations)
```

---

## 🗓️ Event Lifecycle

```
Event Creation (Admin)
        │
        ▼
┌───────────────────────────────────────────────────────┐
│                  Event Phases                          │
│                                                        │
│  1. SETUP      2. OPEN         3. SCRUTINY  4. ACTIVE │
│  ┌─────────┐   ┌─────────┐    ┌─────────┐  ┌───────┐ │
│  │ Create  │──▶│ Accept  │───▶│ Verify  │─▶│ Run   │ │
│  │ Event   │   │ Reg.    │    │ Docs    │  │ Event │ │
│  └─────────┘   └─────────┘    └─────────┘  └───┬───┘ │
│                                                 │      │
│                               5. POST-EVENT     │      │
│                               ┌─────────┐       │      │
│                               │ Issue   │◀──────┘      │
│                               │ Certs   │              │
│                               └─────────┘              │
└───────────────────────────────────────────────────────┘
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes and commit
git commit -m "feat: add amazing feature"

# 4. Push to your branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

### Commit Convention

```
feat:     ✨ New feature
fix:      🐛 Bug fix
docs:     📝 Documentation
style:    💄 UI/styling
refactor: ♻️  Code refactor
test:     🧪 Tests
chore:    🔧 Tooling/config
```

---

## 📄 License

```
MIT License — Copyright (c) 2026 FestFlow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.
```

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer&animation=twinkling" />

**Built with ❤️ for college fests everywhere**

⭐ Star this repo if FestFlow helped you!

[![GitHub stars](https://img.shields.io/github/stars/your-username/festflow?style=social)](https://github.com/your-username/festflow)
[![GitHub forks](https://img.shields.io/github/forks/your-username/festflow?style=social)](https://github.com/your-username/festflow)

</div>
