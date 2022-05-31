import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { onAddCard, isOpen, onClose, isLoading } = props;
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleCardLinkChange = (e) => {
    setCardLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard({ name: cardName, link: cardLink });
    setCardName('');
    setCardLink('');
  };

  return (
    <PopupWithForm
      name='add-card'
      title='New place'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textOnButton={isLoading ? 'Loading...' : 'Create'}>
      <label className='popup__field'>
        <input
          type='text'
          className='popup__input popup__input_type_place'
          onChange={handleCardNameChange}
          id='place-input'
          value={cardName}
          placeholder='Title'
          name='name'
          minLength='1'
          maxLength='30'
          required
        />
        <span className='popup__input-error place-input-error'></span>
      </label>
      <label className='popup__field'>
        <input
          type='url'
          className='popup__input popup__input_type_img-src'
          onChange={handleCardLinkChange}
          id='image-url-input'
          value={cardLink}
          placeholder='Image link'
          name='link'
          required
        />
        <span className='popup__input-error image-url-input-error'></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
