import React, { useContext } from 'react';
import avatarIcon from '../images/edit_icon.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const {
    onEditAvatarClick,
    onEditProfileClick,
    onAddPlaceClick,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props;
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className='content'>
      <section className='profile'>
        <div
          id='profile-avatar'
          className='profile__avatar'
          style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <div className='profile__avatar-cover'>
            <img
              id='edit-avatar-icon'
              className='profile__avatar-edit'
              src={avatarIcon}
              alt="Edit icon that covers the user's profile avatar"
              onClick={onEditAvatarClick}
            />
          </div>
        </div>
        <div className='profile__info'>
          <div className='profile__name-line'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='button profile__edit-button'
              type='button'
              aria-label='edit-button'
              onClick={onEditProfileClick}></button>
          </div>
          <p className='profile__title'>{currentUser.about}</p>
        </div>
        <button
          className='button profile__add-button'
          type='button'
          aria-label='add-button'
          onClick={onAddPlaceClick}></button>
      </section>
      <section className='photos-grid'>
        <ul className='photos-grid__list'>
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
