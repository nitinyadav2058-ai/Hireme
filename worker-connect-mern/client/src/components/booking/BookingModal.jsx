import React from 'react';
import { CalendarDays } from 'lucide-react';
import { TIMES } from '../../constants/services';
import Modal from '../common/Modal';

export default function BookingModal({
    booking,
    setBooking,
    busy,
    onSubmit,
    onClose
}) {
    return (
        <Modal onClose={onClose}>
            <div className="modalIcon">
                <CalendarDays />
            </div>

            <span className="eyebrow">
                NEW BOOKING
            </span>

            <h2>
                Book {booking.worker.name}
            </h2>

            <p className="modalIntro">
                {booking.worker.service} · starting from ₹
                {booking.worker.priceFrom}
            </p>

            <form className="form" onSubmit={onSubmit}>
                <label>
                    Date
                    <input
                        type="date"
                        min={new Date().toISOString().slice(0, 10)}
                        value={booking.date}
                        onChange={(e) =>
                            setBooking({
                                ...booking,
                                date: e.target.value
                            })
                        }
                        required
                    />
                </label>

                <label>
                    Time
                    <select
                        value={booking.time}
                        onChange={(e) =>
                            setBooking({
                                ...booking,
                                time: e.target.value
                            })
                        }
                        required
                    >
                        <option value="">
                            Choose a time
                        </option>

                        {TIMES.map((time) => (
                            <option key={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Service address
                    <textarea
                        value={booking.address}
                        onChange={(e) =>
                            setBooking({
                                ...booking,
                                address: e.target.value
                            })
                        }
                        placeholder="House / office address"
                        rows="3"
                        required
                    />
                </label>

                <label>
                    Payment
                    <select
                        value={booking.paymentMethod}
                        onChange={(e) =>
                            setBooking({
                                ...booking,
                                paymentMethod: e.target.value
                            })
                        }
                    >
                        <option value="cash">
                            Pay after service — cash
                        </option>

                        <option value="demo-online">
                            Demo online payment
                        </option>
                    </select>
                </label>

                <div className="receipt">
                    <span>
                        <small>Estimated total</small>
                        <b>
                            ₹{booking.worker.priceFrom}
                        </b>
                    </span>

                    <span>
                        <small>Payment</small>
                        <b>
                            {booking.paymentMethod === 'cash'
                                ? 'After service'
                                : 'Demo paid'}
                        </b>
                    </span>
                </div>

                <button
                    className="primary full"
                    disabled={busy}
                >
                    {busy
                        ? 'Confirming…'
                        : 'Confirm booking'}
                </button>
            </form>
        </Modal>
    );
}
