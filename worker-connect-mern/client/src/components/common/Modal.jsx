import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ children, onClose, wide = false }) {
  return (
    <div className="modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={wide ? 'modalCard dashboardModal' : 'modalCard'}>
        <button className="closeBtn" onClick={onClose}><X /></button>
        {children}
      </div>
    </div>
  );
}
