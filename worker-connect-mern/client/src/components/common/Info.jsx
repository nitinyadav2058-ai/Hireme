import React from 'react';

export default function Info({ icon, title, text }) {
  return <div className="infoCard">
    <div className="infoIcon">{icon}</div>
    <div><h3>{title}</h3><p>{text}</p></div>
  </div>;
}
