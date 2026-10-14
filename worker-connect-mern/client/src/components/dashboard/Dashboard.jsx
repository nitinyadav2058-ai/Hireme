import React from 'react';
import {
    BadgeCheck,
    CalendarDays,
    CheckCircle2,
    Clock3,
    LogOut,
    Wallet
} from 'lucide-react';

import { SERVICES } from '../../constants/services';

import Modal from '../common/Modal';
import Stat from './Stat';
import BookingRow from './BookingRow';

export default function Dashboard({
    user,
    isWorker,
    bookings,
    stats,
    profile,
    setProfile,
    onProfile,
    onToggle,
    onCancel,
    onComplete,
    onClose,
    onLogout
}) {
    return (
        <Modal wide onClose={onClose}>
            <div className="dashboardHead">
                <div>
                    <span className="eyebrow">
                        {isWorker
                            ? 'WORKER DASHBOARD'
                            : 'CUSTOMER DASHBOARD'}
                    </span>

                    <h2>
                        Hi, {user.name}
                    </h2>

                    <p>
                        {isWorker
                            ? 'Manage your service profile and incoming jobs.'
                            : 'Track your bookings and service history.'}
                    </p>
                </div>

                <div className="dashHeadActions">
                    {isWorker && (
                        <button
                            className={
                                profile.available
                                    ? 'availabilitySwitch on'
                                    : 'availabilitySwitch'
                            }
                            onClick={onToggle}
                        >
                            <span />

                            {profile.available
                                ? 'Available'
                                : 'Offline'}
                        </button>
                    )}

                    <button
                        className="outlineBtn"
                        onClick={onLogout}
                    >
                        <LogOut size={15} />
                        Log out
                    </button>
                </div>
            </div>

            <div className="dashStats">
                <Stat
                    icon={<Clock3 />}
                    value={stats.active}
                    label="Active"
                />

                <Stat
                    icon={<CheckCircle2 />}
                    value={stats.completed}
                    label="Completed"
                />

                <Stat
                    icon={<Wallet />}
                    value={`₹${isWorker ? stats.total : stats.paid}`}
                    label={isWorker ? 'Job value' : 'Paid spend'}
                />

                <Stat
                    icon={<CalendarDays />}
                    value={bookings.length}
                    label="Total bookings"
                />
            </div>

            {isWorker && (
                <form
                    className="profileBox"
                    onSubmit={onProfile}
                >
                    <div className="profileTitle">
                        <div>
                            <h3>
                                Your service profile
                            </h3>

                            <p>
                                This is what customers see when they search.
                            </p>
                        </div>

                        <BadgeCheck />
                    </div>

                    <div className="formGrid">
                        <label>
                            Service

                            <select
                                value={profile.service}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        service: e.target.value
                                    })
                                }
                            >
                                {SERVICES.slice(1).map((item) => (
                                    <option key={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Area

                            <input
                                value={profile.location}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        location: e.target.value
                                    })
                                }
                                placeholder="Sector / locality"
                                required
                            />
                        </label>

                        <label>
                            Starting price

                            <input
                                type="number"
                                min="1"
                                value={profile.priceFrom}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        priceFrom: e.target.value
                                    })
                                }
                                required
                            />
                        </label>

                        <button className="primary">
                            Save profile
                        </button>
                    </div>
                </form>
            )}

            <div className="bookingList">
                <div className="listTitle">
                    <h3>
                        {isWorker
                            ? 'Incoming jobs'
                            : 'Your bookings'}
                    </h3>

                    <span>
                        {bookings.length} record
                        {bookings.length === 1 ? '' : 's'}
                    </span>
                </div>

                {bookings.length ? (
                    bookings.map((booking) => (
                        <BookingRow
                            key={booking._id}
                            booking={booking}
                            isWorker={isWorker}
                            onCancel={onCancel}
                            onComplete={onComplete}
                        />
                    ))
                ) : (
                    <div className="emptyState">
                        <CalendarDays size={28} />

                        <h3>
                            No bookings yet
                        </h3>

                        <p>
                            {isWorker
                                ? 'Save your profile and wait for your first customer.'
                                : 'Book a verified worker and your booking will appear here.'}
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
}