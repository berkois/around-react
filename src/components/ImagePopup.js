import React from 'react';

function ImagePopup(props) {
  const { card, onClose } = props;
  return (
    <section className={`picture-popup popup ${card ? 'popup_opened' : ''}`}>
      <div className='picture-popup__popup-container'>
        <img
          className='picture-popup__popup-image'
          src={card ? card.link : ''}
          alt={card?.name}
        />
        <button
          className='popup__close-button button'
          type='button'
          aria-label='close-button'
          onClick={onClose}></button>
        <p className='picture-popup__popup-text'>{card ? card.name : ''}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
