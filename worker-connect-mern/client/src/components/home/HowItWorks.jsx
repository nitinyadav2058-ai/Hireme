import React from 'react';

import {
    CalendarDays,
    Search,
    ShieldCheck
} from 'lucide-react';

import Step from '../common/Step';

export default function HowItWorks() {
    return (
        <section
            className="section howSection"
            id="how"
        >
            <div className="container">

                <div className="center">
                    <span className="eyebrow">
                        HOW IT WORKS
                    </span>

                    <h2>
                        From need to done, simply.
                    </h2>

                    <p>
                        Everything you need to hire local help — in three clear steps.
                    </p>
                </div>

                <div className="steps">
                    <Step
                        n="01"
                        icon={<Search />}
                        title="Tell us what you need"
                        text="Search by service, type your requirement or simply speak."
                    />

                    <Step
                        n="02"
                        icon={<ShieldCheck />}
                        title="Choose with confidence"
                        text="Compare verified profiles, ratings, distance and transparent starting prices."
                    />

                    <Step
                        n="03"
                        icon={<CalendarDays />}
                        title="Book & keep track"
                        text="Pick a date, time and address. Your booking stays in your dashboard."
                    />
                </div>

            </div>
        </section>
    );
}