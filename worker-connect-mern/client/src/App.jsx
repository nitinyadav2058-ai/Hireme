import React from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';

import Hero from './components/home/Hero';
import ServicesSection from './components/home/ServicesSection';
import WorkersSection from './components/home/WorkersSection';
import HowItWorks from './components/home/HowItWorks';
import VoiceSection from './components/home/VoiceSection';
import SafetySection from './components/home/SafetySection';
import CtaSection from './components/home/CtaSection';

import AuthModal from './components/auth/AuthModal';
import BookingModal from './components/booking/BookingModal';
import Dashboard from './components/dashboard/Dashboard';

import useWorkerConnect from './hooks/useWorkerConnect';

export default function App() {
  const app = useWorkerConnect();

  const {
    user,
    authOpen,
    setAuthOpen,
    authMode,
    setAuthMode,
    auth,
    setAuth,
    authError,
    busy,

    service,
    query,
    setQuery,
    workers,
    locationLabel,
    voice,
    menu,
    setMenu,

    notice,
    booking,
    setBooking,
    dashboard,
    setDashboard,
    bookings,
    profile,
    setProfile,

    favorites,
    showFavorites,
    setShowFavorites,

    isWorker,
    stats,

    loadWorkers,
    speak,
    useLocation,
    openBooking,
    confirmBooking,
    updateBooking,
    saveProfile,
    toggleAvailability,
    toggleFavorite,
    changeService,
    resetFilters,
    openLogin,
    openRegister,
    logout,
    submitAuth
  } = app;

  return (
    <div className="app">
      <Toast message={notice} />

      <Navbar
        user={user}
        isWorker={isWorker}
        menu={menu}
        setMenu={setMenu}
        onDashboard={() => setDashboard(true)}
        onRoleAction={() =>
          user
            ? setDashboard(true)
            : openRegister()
        }
        onGetStarted={openLogin}
      />

      <main id="top">
        <Hero
          query={query}
          setQuery={setQuery}
          voice={voice}
          onVoice={speak}
          locationLabel={locationLabel}
          onLocation={useLocation}
          onSearch={() => loadWorkers()}
        />

        <ServicesSection
          service={service}
          onServiceChange={changeService}
        />

        <WorkersSection
          workers={workers}
          query={query}
          favorites={favorites}
          showFavorites={showFavorites}
          onToggleFavorites={() =>
            setShowFavorites((v) => !v)
          }
          onRefresh={() => loadWorkers()}
          onFavorite={toggleFavorite}
          onBook={openBooking}
          onReset={resetFilters}
        />

        <HowItWorks />

        <VoiceSection
          voice={voice}
          onVoice={speak}
        />

        <SafetySection />

        <CtaSection />
      </main>

      <Footer
        user={user}
        onDashboard={() => setDashboard(true)}
        onLogout={logout}
        onLogin={openLogin}
        onRegister={openRegister}
      />

      {authOpen && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          auth={auth}
          setAuth={setAuth}
          error={authError}
          busy={busy}
          onSubmit={submitAuth}
          onClose={() => setAuthOpen(false)}
        />
      )}

      {booking.worker && (
        <BookingModal
          booking={booking}
          setBooking={setBooking}
          busy={busy}
          onSubmit={confirmBooking}
          onClose={() =>
            setBooking({
              worker: null,
              date: '',
              time: '',
              address: '',
              paymentMethod: 'cash'
            })
          }
        />
      )}

      {dashboard && user && (
        <Dashboard
          user={user}
          isWorker={isWorker}
          bookings={bookings}
          stats={stats}
          profile={profile}
          setProfile={setProfile}
          onProfile={saveProfile}
          onToggle={toggleAvailability}
          onCancel={(id) =>
            updateBooking(id, {
              status: 'cancelled'
            })
          }
          onComplete={(id) =>
            updateBooking(id, {
              status: 'completed'
            })
          }
          onClose={() => setDashboard(false)}
          onLogout={logout}
        />
      )}
    </div>
  );
}