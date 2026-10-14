import React from 'react';
import {
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Wallet
} from 'lucide-react';

import Info from '../common/Info';

export default function SafetySection() {
  return (
    <section className="section safetySection" id="safety">
      <div className="container safetyGridWrap">

        <div className="safetyCopy">
          <span className="eyebrow">
            TRUST & SAFETY
          </span>

          <h2>
            A safer way to hire local help.
          </h2>

          <p>
            WorkerConnect is designed around verification, clear pricing,
            accountable bookings and role-based access.
          </p>

          <div className="safetyChecks">
            <span>
              <Check />
              Verified profiles
            </span>

            <span>
              <Check />
              Booking history
            </span>

            <span>
              <Check />
              Clear starting price
            </span>
          </div>
        </div>

        <div className="safetyCards">
          <Info
            icon={<ShieldCheck />}
            title="Identity verification"
            text="Verified profiles help customers choose with confidence."
          />

          <Info
            icon={<Wallet />}
            title="Transparent pricing"
            text="See a worker's starting price before you confirm."
          />

          <Info
            icon={<MapPin />}
            title="Location matching"
            text="Find services by nearby area and current location."
          />

          <Info
            icon={<MessageCircle />}
            title="Digital records"
            text="Customers and workers can manage their own bookings."
          />
        </div>

      </div>
    </section>
  );
}