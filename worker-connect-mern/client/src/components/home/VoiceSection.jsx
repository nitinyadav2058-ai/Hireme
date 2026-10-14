import React from 'react';

import {
  ArrowRight,
  CheckCircle2,
  Mic
} from 'lucide-react';

export default function VoiceSection({ voice, onVoice }) {
  return (
    <section className="voiceSection">
      <div className="container voiceGrid">

        <div>
          <span className="eyebrow lightEyebrow">
            DESIGNED FOR EVERYONE
          </span>

          <h2>
            Just speak.
            <br />
            We'll do the rest.
          </h2>

          <p>
            Voice-first search helps people who are more comfortable
            speaking than typing, while keeping the same simple
            marketplace experience.
          </p>

          <button
            className="lightButton"
            onClick={onVoice}
          >
            <Mic />
            {voice ? 'Listening…' : 'Try voice search'}
          </button>
        </div>

        <div className="voiceDemo">

          <div className="voiceTop">
            <span>
              <span className="liveDot" />
              Voice search
            </span>

            <span>
              en-IN
            </span>
          </div>

          <div className="wave">
            {Array.from({ length: 24 }).map((_, i) => (
              <i
                key={i}
                style={{
                  height: `${18 + Math.abs(Math.sin(i * 0.7)) * 60}px`
                }}
              />
            ))}
          </div>

          <div className="spoken">
            “I need a plumber tomorrow morning.”
          </div>

          <div className="voiceMatch">
            <span>
              <CheckCircle2 />
              <b>
                Verified plumbers
              </b>
            </span>

            <ArrowRight />
          </div>

        </div>

      </div>
    </section>
  );
}