import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn ? "photos-grid__trash" : "photos-grid__trash_disabled";
  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? "photos-grid__like heart heart_active" : "photos-grid__like heart";
  const handleCardClick = () => {
    props.onCardClick(props.card);
  };
  const handleCardLike = () => {
    props.onCardLike(props.card, isLiked);
  };
  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  return (
    <li className="photos-grid__card">
      <img className="photos-grid__photo" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <button className={`${cardDeleteButtonClassName} button`} type="button" aria-label="delete-button" onClick={handleDeleteClick}></button>
      <div className="photos-grid__label">
        <p className="photos-grid__location">{props.card.name}</p>
        <div className="photos-grid__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" aria-label="like-button" onClick={handleCardLike}></button>
          <p className="photos-grid__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
