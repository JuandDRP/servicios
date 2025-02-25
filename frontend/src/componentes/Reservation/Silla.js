import React from 'react';
import './Silla.css';

const Silla = ({ seat, onSeatClick }) => {
    const handleClick = () => {
        if (!seat.reserved) {
            onSeatClick(seat.id);
        }
    };

    return (
        <div 
            className={`seat ${seat.reserved ? 'reserved' : seat.selected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            {seat.label}
        </div>
    );
};

export default Silla;
