import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
    const scrollToWorkers = () =>
        document
            .getElementById('workers')
            ?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="ctaSection">
            <div className="container cta">
                <div>
                    <span className="eyebrow">
                        READY WHEN YOU ARE
                    </span>

                    <h2>
                        Need a helping hand?
                    </h2>

                    <p>
                        Find a verified local worker in a few clicks.
                    </p>
                </div>

                <button
                    className="primary"
                    onClick={scrollToWorkers}
                >
                    Find a worker
                    <ArrowRight size={18} />
                </button>
            </div>
        </section>
    );
}