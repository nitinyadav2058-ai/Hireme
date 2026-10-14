import { useEffect, useMemo, useState } from 'react';

import { apiJSON, API } from '../utils/api';
import { EMPTY_BOOKING } from '../constants/services';

export default function useWorkerConnect() {
  const [user, setUser] = useState(null);

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [auth, setAuth] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });

  const [authError, setAuthError] = useState('');
  const [busy, setBusy] = useState(false);

  const [service, setService] = useState('All');
  const [query, setQuery] = useState('');
  const [workers, setWorkers] = useState([]);

  const [location, setLocation] = useState('');
  const [locationLabel, setLocationLabel] = useState('Use my location');

  const [voice, setVoice] = useState(false);
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState('');

  const [booking, setBooking] = useState(EMPTY_BOOKING);
  const [dashboard, setDashboard] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [profile, setProfile] = useState({
    service: 'Plumbing',
    location: '',
    priceFrom: 299,
    available: true
  });

  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('wc-favorites') || '[]')
  );

  const [showFavorites, setShowFavorites] = useState(false);

  const isWorker = user?.role === 'worker';

  const flash = (message) => {
    setNotice(message);

    window.clearTimeout(window.__wcToast);

    window.__wcToast = window.setTimeout(
      () => setNotice(''),
      3500
    );
  };

  const checkSession = async () => {
    try {
      const data = await apiJSON(`${API}/auth/me`);
      setUser(data.user);
    } catch {}
  };

  const loadWorkers = async (overrideQuery = query) => {
    try {
      const params = new URLSearchParams({
        service,
        q: overrideQuery,
        location:
          location && !location.includes(',')
            ? location
            : ''
      });

      const data = await apiJSON(
        `${API}/workers?${params.toString()}`
      );

      setWorkers(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      flash(
        error.message.includes('fetch')
          ? 'Backend is not reachable. Start the server on port 5000.'
          : error.message
      );
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    loadWorkers('');
  }, [service, location]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBookings = async () => {
    if (!user) {
      return setBookings([]);
    }

    try {
      const data = await apiJSON(`${API}/bookings`);

      setBookings(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      flash(error.message);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [user, dashboard]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isWorker) return;

    apiJSON(`${API}/workers/me`)
      .then((data) => {
        if (data) {
          setProfile({
            service: data.service || 'Plumbing',
            location: data.location || '',
            priceFrom: data.priceFrom ?? 299,
            available: data.available ?? true
          });
        }
      })
      .catch(() => {});
  }, [isWorker]);

  const submitAuth = async (event) => {
    event.preventDefault();

    setBusy(true);
    setAuthError('');

    try {
      const endpoint =
        authMode === 'login'
          ? 'login'
          : 'register';

      const body =
        authMode === 'login'
          ? {
              email: auth.email,
              password: auth.password
            }
          : auth;

      const data = await apiJSON(
        `${API}/auth/${endpoint}`,
        {
          method: 'POST',
          body
        }
      );

      setUser(data.user);
      setAuthOpen(false);

      setAuth({
        name: '',
        email: auth.email,
        password: '',
        role: 'customer'
      });

      flash(
        authMode === 'login'
          ? 'Welcome back!'
          : 'Account created successfully!'
      );

      if (data.user.role === 'worker') {
        setDashboard(true);
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    try {
      await apiJSON(
        `${API}/auth/logout`,
        {
          method: 'POST'
        }
      );
    } catch {}

    setUser(null);
    setDashboard(false);
    setBookings([]);

    flash('You have been logged out.');
  };

  const speak = () => {
    const Recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!Recognition) {
      return flash(
        'Voice search is not supported in this browser. Try Chrome or Edge.'
      );
    }

    const recognition = new Recognition();

    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setVoice(true);

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript;

      setQuery(text);
      setVoice(false);

      loadWorkers(text);
    };

    recognition.onerror = () => {
      setVoice(false);

      flash(
        'I could not hear that. Please try again.'
      );
    };

    recognition.onend = () => {
      setVoice(false);
    };

    recognition.start();
  };

  const useLocation = () => {
    if (!navigator.geolocation) {
      return flash(
        'Location is not supported by this browser.'
      );
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const text = `${position.coords.latitude.toFixed(
          3
        )},${position.coords.longitude.toFixed(3)}`;

        setLocation(text);
        setLocationLabel('Current location');

        flash(
          'Current location selected for matching.'
        );
      },
      () =>
        flash(
          'Location permission was denied. You can still search by service area.'
        )
    );
  };

  const openBooking = (worker) => {
    if (!user) {
      setAuthMode('login');
      setAuthOpen(true);

      flash('Login first to book a worker.');

      return;
    }

    if (isWorker) {
      return flash(
        'Worker accounts cannot book services. Use a customer account.'
      );
    }

    setBooking({
      ...EMPTY_BOOKING,
      worker,
      date: new Date(
        Date.now() + 86400000
      )
        .toISOString()
        .slice(0, 10)
    });
  };

  const confirmBooking = async (event) => {
    event.preventDefault();

    setBusy(true);

    try {
      await apiJSON(
        `${API}/bookings`,
        {
          method: 'POST',
          body: {
            workerId: booking.worker._id,
            date: booking.date,
            time: booking.time,
            address: booking.address,
            paymentMethod: booking.paymentMethod
          }
        }
      );

      setBooking(EMPTY_BOOKING);

      await loadBookings();

      flash('Booking confirmed successfully!');

      setDashboard(true);
    } catch (error) {
      flash(error.message);
    } finally {
      setBusy(false);
    }
  };

  const updateBooking = async (id, payload) => {
    try {
      const data = await apiJSON(
        `${API}/bookings/${id}`,
        {
          method: 'PATCH',
          body: payload
        }
      );

      setBookings((current) =>
        current.map((item) =>
          item._id === id
            ? data
            : item
        )
      );

      flash('Booking updated.');
    } catch (error) {
      flash(error.message);
    }
  };

  const saveProfile = async (event) => {
    event.preventDefault();

    try {
      const data = await apiJSON(
        `${API}/workers/profile`,
        {
          method: 'POST',
          body: profile
        }
      );

      setProfile((current) => ({
        ...current,
        ...data
      }));

      flash('Your worker profile is live.');

      await loadWorkers();
    } catch (error) {
      flash(error.message);
    }
  };

  const toggleAvailability = async () => {
    try {
      const data = await apiJSON(
        `${API}/workers/availability`,
        {
          method: 'PATCH'
        }
      );

      setProfile((current) => ({
        ...current,
        available: data.available
      }));

      flash(
        data.available
          ? 'You are available for new jobs.'
          : 'You are now offline.'
      );
    } catch (error) {
      flash(error.message);
    }
  };

  const toggleFavorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter(
          (item) => item !== id
        )
      : [...favorites, id];

    setFavorites(next);

    localStorage.setItem(
      'wc-favorites',
      JSON.stringify(next)
    );
  };

  const stats = useMemo(
    () => ({
      active: bookings.filter(
        (b) => b.status === 'confirmed'
      ).length,

      completed: bookings.filter(
        (b) => b.status === 'completed'
      ).length,

      cancelled: bookings.filter(
        (b) => b.status === 'cancelled'
      ).length,

      total: bookings.reduce(
        (sum, b) =>
          sum + (Number(b.amount) || 0),
        0
      ),

      paid: bookings
        .filter(
          (b) => b.paymentStatus === 'paid'
        )
        .reduce(
          (sum, b) =>
            sum + (Number(b.amount) || 0),
          0
        )
    }),
    [bookings]
  );

  const changeService = (value) => {
    setService(value);
    setShowFavorites(false);
  };

  const resetFilters = () => {
    setService('All');
    setQuery('');
    setShowFavorites(false);
  };

  const openLogin = () => {
    setAuthMode('login');
    setAuthOpen(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setAuthOpen(true);
  };

  return {
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
    submitAuth,

    saveProfile,
    toggleAvailability,
    toggleFavorite,

    changeService,
    resetFilters,

    openLogin,
    openRegister,
    logout
  };
}