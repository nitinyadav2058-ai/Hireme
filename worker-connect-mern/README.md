# WorkerConnect — Functional MERN MVP

A local-services marketplace connecting customers with workers. This version includes Passport.js authentication, role authorization, local MongoDB, worker profiles, search/filtering, voice search, location permission, favorites, booking creation, customer/worker dashboards, booking status updates, availability, and demo online payment state.

## Stack
- React + Vite
- Express 5
- MongoDB Community Server + Mongoose
- Passport.js LocalStrategy + bcryptjs
- express-session + connect-mongo

## 1. Local MongoDB
Install/start MongoDB Community Server locally. The app uses:
`mongodb://127.0.0.1:27017/workerconnect`

On Windows, if MongoDB is installed as a service:
```powershell
net start MongoDB
```

## 2. Backend
```powershell
cd server
npm install
npm run dev
```
API: http://localhost:5000

## 3. Seed demo workers
After the API is running, in another terminal:
```powershell
Invoke-RestMethod -Method Post http://localhost:5000/api/workers/seed
```
Or use Postman: POST `http://localhost:5000/api/workers/seed`.

## 4. Frontend
```powershell
cd client
npm install
npm run dev
```
Open http://localhost:5173

## Functional flows
### Customer
1. Register as Customer.
2. Search/filter workers.
3. Allow location access or search by area.
4. Favorite workers.
5. Book a worker with date/time/address/payment method.
6. Open Dashboard to view/cancel bookings.

### Worker
1. Register as Worker.
2. Open Dashboard.
3. Create/update service profile.
4. Toggle availability.
5. View incoming bookings.
6. Mark jobs completed or cancelled.

## Notes
- `demo-online` is intentionally a demo payment state; it does not charge a real card. Real payments require a payment provider account and server-side secrets.
- Voice search uses the browser Web Speech API and may not be available in every browser.
- Location uses browser geolocation permission; coordinates are used only for the current search session in this MVP.

## Frontend component structure

The React frontend is intentionally split into reusable components instead of keeping the entire UI in one `App.jsx` file:

```text
client/src/
├── App.jsx
├── components/
│   ├── auth/
│   │   └── AuthModal.jsx
│   ├── booking/
│   │   └── BookingModal.jsx
│   ├── common/
│   │   ├── Info.jsx
│   │   ├── Modal.jsx
│   │   ├── Step.jsx
│   │   └── Toast.jsx
│   ├── dashboard/
│   │   ├── BookingRow.jsx
│   │   ├── Dashboard.jsx
│   │   └── Stat.jsx
│   ├── home/
│   │   ├── CtaSection.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── SafetySection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── VoiceSection.jsx
│   │   └── WorkersSection.jsx
│   ├── layout/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   └── workers/
│       └── WorkerCard.jsx
├── constants/
│   └── services.js
├── hooks/
│   └── useWorkerConnect.js
├── utils/
│   └── api.js
└── styles.css
```

`App.jsx` now acts as the page composition layer, while `useWorkerConnect.js` contains the marketplace state/API logic. The visual sections, cards, modals, dashboard and layout are independently editable.
