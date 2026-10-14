import React from 'react';

import {
  Heart,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

import WorkerCard from '../workers/WorkerCard';

export default function WorkersSection({
  workers,
  query,
  favorites,
  showFavorites,
  onToggleFavorites,
  onRefresh,
  onFavorite,
  onBook,
  onReset
}) {
  const visibleWorkers = showFavorites
    ? workers.filter((worker) => favorites.includes(worker._id))
    : workers;

  return (
    <section
      className="section workersSection"
      id="workers"
    >
      <div className="container">

        <div className="sectionHead workersHead">

          <div>
            <span className="eyebrow">
              NEARBY & VERIFIED
            </span>

            <h2>
              {showFavorites
                ? 'Your saved workers'
                : query
                  ? `Results for “${query}”`
                  : 'Trusted workers near you'}
            </h2>

            <p className="sectionSub">
              Compare ratings, distance and starting prices before you book.
            </p>
          </div>

          <div className="workerTools">

            <button
              className={
                showFavorites
                  ? 'filterBtn active'
                  : 'filterBtn'
              }
              onClick={onToggleFavorites}
            >
              <Heart
                size={15}
                fill={showFavorites ? 'currentColor' : 'none'}
              />

              Saved {favorites.length}
            </button>

            <button
              className="filterBtn"
              onClick={onRefresh}
            >
              <RefreshCw size={15} />
              Refresh
            </button>

          </div>

        </div>

        <div className="workerGrid">

          {visibleWorkers.length ? (
            visibleWorkers
              .slice(0, 12)
              .map((worker) => (
                <WorkerCard
                  key={worker._id}
                  worker={worker}
                  favorite={favorites.includes(worker._id)}
                  onFavorite={() => onFavorite(worker._id)}
                  onBook={() => onBook(worker)}
                />
              ))
          ) : (
            <div className="emptyState">

              <SlidersHorizontal size={30} />

              <h3>
                {showFavorites
                  ? 'No saved workers yet'
                  : 'No workers found'}
              </h3>

              <p>
                {showFavorites
                  ? 'Tap the heart on a worker card to save it.'
                  : 'Try another service, search term or area.'}
              </p>

              <button
                className="secondaryBtn"
                onClick={onReset}
              >
                Reset filters
              </button>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}