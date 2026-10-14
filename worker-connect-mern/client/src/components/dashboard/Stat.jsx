import React from 'react';

export default function Stat({ icon, value, label }) {
  return <div className="statCard">
    <span>{icon}</span>
    <div><strong>{value}</strong><small>{label}</small></div>
  </div>;
}
