import React from "react";

export default function Card(props) {
  const handleCardClick = () => {
    props.onCardClick(props.card);
  };
  return (
    <li className="photos-grid__card">
      <img className="photos-grid__photo" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <button className="photos-grid__trash button" type="button" aria-label="delete-button" onClick={props.onDeleteClick}></button>
      <div className="photos-grid__label">
        <p className="photos-grid__location">{props.card.name}</p>
        <div className="photos-grid__like-wrapper">
          <button className="photos-grid__like heart" type="button" aria-label="like-button"></button>
          <p className="photos-grid__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
