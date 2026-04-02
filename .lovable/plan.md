

# Fest Management System — Implementation Plan

## Design System
- **Theme**: Futuristic glassmorphism with soft shadows, dark/light mode toggle
- **Colors**: Vibrant gradient accents (purple-blue-cyan), glass card backgrounds with backdrop-blur
- **Typography**: Inter font, clean hierarchy
- **Animations**: Framer Motion for page transitions, card hovers, modals

## Folder Structure
```
src/
├── components/       # Reusable UI pieces
│   ├── layout/       # Sidebar, Header, ThemeToggle
│   ├── dashboard/    # Stat cards, charts, activity log
│   ├── registration/ # Forms, status badges, tracker
│   ├── certificates/ # Template preview, generator
│   ├── attendance/   # QR scanner, stats charts
│   ├── passes/       # Pass cards, QR display
│   ├── events/       # Event cards, calendar, timeline
│   └── admin/        # Scrutiny panel, bulk actions table
├── contexts/         # AuthContext (role-based), ThemeContext
├── data/             # Mock JSON data for all modules
├── hooks/            # Custom hooks
├── lib/              # Utilities
├── pages/            # All route pages
└── types/            # TypeScript interfaces
```

## Pages & Features

### 1. Auth Pages
- Login & Signup with role selector (Admin / Participant / Coordinator)
- Glassmorphism card design, animated transitions
- Stores role in React context (mock auth, no backend)

### 2. Role-Based Dashboard
- **Admin**: Analytics cards (registrations, revenue, attendance), charts (recharts), activity log, AI insights section
- **Participant**: My registrations, upcoming events, my passes, certificates
- **Coordinator**: Assigned events, attendance stats, participant list
- Sidebar navigation changes per role

### 3. Registration Management
- Individual & team registration forms with event category dropdown
- Payment status badges (Paid/Pending/Failed)
- Registration tracker with step indicators (Pending → Under Scrutiny → Approved → Rejected)
- Admin view: searchable/filterable table with bulk approve/reject, status badges

### 4. Scrutiny & Verification Panel (Admin)
- Table of submissions with filters (status, event, date)
- Modal detail view showing mock document preview & payment proof
- Approve/Reject with remarks textarea
- Color-coded status indicators

### 5. Certificate Generator
- Template selection (3 designs)
- Name input + category toggle (Participation/Winner/Runner-up)
- Live certificate preview card
- Download button (simulated)

### 6. Attendance Management
- QR code scan simulation with animated scanner UI
- Manual attendance table with checkboxes
- Bar & pie charts for attendance stats (recharts)
- Export button (simulated)

### 7. Smart Pass System
- Digital pass cards with QR code (qrcode.react), name, event, date
- Status badges: Active / Checked-In / Expired
- Pass preview with glassmorphism styling
- Download simulation

### 8. Event Management
- Admin CRUD forms for events in modals
- Event cards grid: title, category, description, rules, coordinator
- Monthly calendar view
- Timeline schedule component
- Venue allocation table

### 9. Extra Features
- **Notifications**: Bell icon in header with dropdown, toast notifications via sonner
- **Activity Log**: Timeline-style panel showing recent actions
- **Analytics Dashboard**: Summary stats with animated counters, charts
- **AI Insights**: Mock "smart suggestions" section with insight cards
- **Loading skeletons** on all data pages
- **Empty & error states** with illustrations

## Libraries to Add
- `framer-motion` — animations
- `recharts` — charts
- `qrcode.react` — QR code generation
- `lucide-react` — icons (already available)

## Mock Data
- 20+ mock events across categories (tech, cultural, sports)
- 30+ mock registrations with varied statuses
- Mock participants, coordinators, attendance records
- All data in `src/data/` as typed constants

