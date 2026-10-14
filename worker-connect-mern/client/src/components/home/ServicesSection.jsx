import React from 'react';
import { ChevronRight } from 'lucide-react';

import { SERVICES } from '../../constants/services';

export default function ServicesSection({ service, onServiceChange }) {
  return (
    <section className="section servicesSection" id="services">
      <div className="container">

        <div className="sectionHead">
          <div>
            <span className="eyebrow">
              EXPLORE SERVICES
            </span>

            <h2>
              What do you need help with?
            </h2>
          </div>

          <span className="muted">
            Simple services. Clear prices.
          </span>
        </div>

        <div className="categories">
          {SERVICES.map((item) => (
            <button
              key={item.name}
              className={
                service === item.name
                  ? 'category active'
                  : 'category'
              }
              onClick={() => onServiceChange(item.name)}
            >
              <span>
                {item.icon}
              </span>

              <b>
                {item.name}
              </b>

              <ChevronRight size={15} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}