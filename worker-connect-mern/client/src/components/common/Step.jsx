import React from 'react';

export default function Step({ n, icon, title, text }) {
  return <div className="step">
    <span className="stepNumber">{n}</span>
    <div className="stepIcon">{icon}</div>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>;
}
