import React from 'react';

import {
  BadgeCheck,
  Heart,
  MapPin,
  Star
} from 'lucide-react';

export default function WorkerCard({
  worker,
  favorite,
  onFavorite,
  onBook
}) {
  const initials =
    worker.initials ||
    worker.name
      ?.split(/\s+/)
      .map((x) => x[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <article className="workerCard">

      <div className="cardImage">

        <div className="avatar">
          {initials}
        </div>

        <div className="cardActions">

          <span className="verified">
            <BadgeCheck size={13} />
            {worker.verified ? 'Verified' : 'Profile'}
          </span>

          <button
            className="heartBtn"
            onClick={onFavorite}
            aria-label="Save worker"
          >
            <Heart
              size={18}
              fill={favorite ? 'currentColor' : 'none'}
            />
          </button>

        </div>

      </div>

      <div className="cardBody">

        <div className="workerTitle">

          <div>
            <h3>
              {worker.name}
            </h3>

            <p>
              {worker.service}
            </p>
          </div>

          <span
            className={
              worker.available
                ? 'availabilityTag on'
                : 'availabilityTag'
            }
          >
            {worker.available
              ? 'Available'
              : 'Offline'}
          </span>

        </div>

        <div className="workerMeta">

          <span className="rating">
            <Star
              size={14}
              fill="currentColor"
            />
            {Number(worker.rating || 0).toFixed(1)}
          </span>

          <span>
            {worker.jobs || 0} jobs
          </span>

          <span>
            <MapPin size={13} />
            {worker.location}
          </span>

        </div>

        <div className="cardBottom">

          <div>
            <small>
              Starting from
            </small>

            <strong>
              ₹{worker.priceFrom}
            </strong>
          </div>

          <button
            className="primary bookBtn"
            onClick={onBook}
            disabled={!worker.available}
          >
            {worker.available
              ? 'Book now'
              : 'Unavailable'}
          </button>

        </div>

      </div>

    </article>
  );
}