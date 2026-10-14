import React from 'react';
import { CalendarDays, Clock3, MapPin } from 'lucide-react';
import { SERVICES } from '../../constants/services';

export default function BookingRow({
    booking,
    isWorker,
    onCancel,
    onComplete
}) {
    const workerName = booking.worker?.name || 'Worker';

    return (
        <div className="bookingRow">
            <div className="bookingMain">
                <div className="bookingService">
                    <span className="bookingIcon">
                        {SERVICES.find(
                            (x) => x.name === booking.service
                        )?.icon || '🛠️'}
                    </span>

                    <div>
                        <b>{booking.service}</b>

                        <span>
                            {isWorker
                                ? `Customer: ${booking.customerName}`
                                : workerName}
                        </span>
                    </div>
                </div>

                <div className="bookingDetails">
                    <span>
                        <CalendarDays size={13} />
                        {booking.date}
                    </span>

                    <span>
                        <Clock3 size={13} />
                        {booking.time}
                    </span>

                    <span>
                        <MapPin size={13} />
                        {booking.address}
                    </span>
                </div>
            </div>

            <div className="bookingRight">
                <strong>
                    ₹{booking.amount}
                </strong>

                <span className={`status ${booking.status}`}>
                    {booking.status}
                </span>

                <small>
                    {booking.paymentStatus === 'paid'
                        ? 'Paid'
                        : 'Pay after service'}
                </small>

                {booking.status === 'confirmed' &&
                    (isWorker ? (
                        <>
                            <button
                                onClick={() =>
                                    onComplete(booking._id)
                                }
                            >
                                Complete
                            </button>

                            <button
                                onClick={() =>
                                    onCancel(booking._id)
                                }
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() =>
                                onCancel(booking._id)
                            }
                        >
                            Cancel booking
                        </button>
                    ))}
            </div>
        </div>
    );
}