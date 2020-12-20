import React from 'react';

import './card.css';

const Card = ({ index, title, children }) => (
  <div className="card">
    <div className="card__title__wrapper">
      <div className="card__title">{index}</div>
      <div className="card__name">{title}</div>
    </div>
    <div className="card__content">
      {children}
    </div>
  </div>
);

export default Card;
