import React from 'react';

import {
    ArrowRight,
    BadgeCheck,
    CheckCircle2,
    LocateFixed,
    MapPin,
    Mic,
    Search,
    ShieldCheck,
    Wallet,
    Wrench
} from 'lucide-react';

export default function Hero({
    query,
    setQuery,
    voice,
    onVoice,
    locationLabel,
    onLocation,
    onSearch
}) {
    return (
        <section className="hero">
            <div className="container heroGrid">

                <div className="heroCopy">
                    <div className="eyebrow">
                        <BadgeCheck size={16} />
                        VERIFIED LOCAL SERVICES
                    </div>

                    <h1>
                        Trusted help.
                        <br />
                        <span>Right near you.</span>
                    </h1>

                    <p className="lead">
                        Find verified local workers for plumbing, electrical,
                        cleaning, carpentry and everyday home services — with
                        clear prices and safer bookings.
                    </p>

                    <div className="searchPanel">

                        <div className="searchMain">
                            <Search size={20} />

                            <input
                                value={query}
                                onChange={(e) =>
                                    setQuery(e.target.value)
                                }
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && onSearch()
                                }
                                placeholder="What service do you need?"
                                aria-label="Search for a service"
                            />

                            <button
                                className={voice ? 'mic listening' : 'mic'}
                                onClick={onVoice}
                                title="Voice search"
                            >
                                <Mic size={19} />
                            </button>
                        </div>

                        <button
                            className="locationBox"
                            onClick={onLocation}
                        >
                            <MapPin size={18} />

                            <span>
                                {locationLabel}
                            </span>

                            <LocateFixed size={15} />
                        </button>

                        <button
                            className="primary searchButton"
                            onClick={onSearch}
                        >
                            Find a worker
                            <ArrowRight size={18} />
                        </button>

                    </div>

                    <div className="trustRow">
                        <span>
                            <ShieldCheck />
                            ID verified
                        </span>

                        <span>
                            <Wallet />
                            Transparent pricing
                        </span>

                        <span>
                            <CheckCircle2 />
                            Secure bookings
                        </span>
                    </div>
                </div>

                <div
                    className="heroVisual"
                    aria-hidden="true"
                >
                    <div className="heroGlow" />

                    <div className="heroMiniCard topCard">
                        <span className="miniIcon">
                            <ShieldCheck />
                        </span>

                        <div>
                            <b>Verified worker</b>
                            <small>Background checked</small>
                        </div>

                        <CheckCircle2 className="green" />
                    </div>

                    <div className="illustration">
                        <div className="blob" />

                        <div className="workerFigure">
                            <div className="head" />
                            <div className="hair" />
                            <div className="body" />
                            <div className="arm left" />
                            <div className="arm right" />

                            <div className="toolbox">
                                <Wrench />
                            </div>
                        </div>

                        <div className="floatService plumbing">
                            🔧
                            <small>Plumbing</small>
                        </div>

                        <div className="floatService electrical">
                            ⚡
                            <small>Electrical</small>
                        </div>

                        <div className="floatService cleaning">
                            🧹
                            <small>Cleaning</small>
                        </div>
                    </div>

                    <div className="heroMetrics">
                        <div>
                            <b>12k+</b>
                            <span>workers</span>
                        </div>

                        <div>
                            <b>4.8/5</b>
                            <span>average rating</span>
                        </div>

                        <div>
                            <b>50k+</b>
                            <span>jobs completed</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}