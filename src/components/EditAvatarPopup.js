import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { onUpdateAvatar, isOpen, onClose, isLoading } = props;
  const avatarUrl = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatarUrl.current.value);
    avatarUrl.current.value = '';
  };

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Change profile picture'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textOnButton={isLoading ? 'Loading...' : 'Save'}>
      <label className='popup__field'>
        <input
          type='url'
          className='popup__input popup__input_type_avatar-src'
          ref={avatarUrl}
          id='avatar-url-input'
          placeholder='Image link'
          name='avatar'
          required
        />
        <span className='popup__input-error avatar-url-input-error'></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
