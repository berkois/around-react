import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? 'photos-grid__trash'
    : 'photos-grid__trash_disabled';
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = isLiked
    ? 'photos-grid__like heart heart_active'
    : 'photos-grid__like heart';
  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleCardLike = () => {
    onCardLike(card, isLiked);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className='photos-grid__card'>
      <img
        className='photos-grid__photo'
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <button
        className={`${cardDeleteButtonClassName} button`}
        type='button'
        aria-label='delete-button'
        onClick={handleDeleteClick}></button>
      <div className='photos-grid__label'>
        <p className='photos-grid__location'>{card.name}</p>
        <div className='photos-grid__like-wrapper'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='like-button'
            onClick={handleCardLike}></button>
          <p className='photos-grid__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
