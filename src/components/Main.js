import React, { useContext } from 'react';
import avatarIcon from '../images/edit_icon.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
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
              onClick={props.onEditAvatarClick}
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
              onClick={props.onEditProfileClick}></button>
          </div>
          <p className='profile__title'>{currentUser.about}</p>
        </div>
        <button
          className='button profile__add-button'
          type='button'
          aria-label='add-button'
          onClick={props.onAddPlaceClick}></button>
      </section>
      <section className='photos-grid'>
        <ul className='photos-grid__list'>
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
