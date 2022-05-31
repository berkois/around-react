import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { onUpdateUser, onClose, isOpen, isLoading } = props;
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
    onClose();
  };

  return (
    <PopupWithForm
      name='edit-profile'
      title='Edit profile'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textOnButton={isLoading ? 'Loading...' : 'Save'}>
      <label className='popup__field'>
        <input
          type='text'
          className='popup__input popup__input_type_name'
          value={name}
          onChange={handleNameChange}
          id='name-input'
          name='name'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='popup__input-error name-input-error'></span>
      </label>
      <label className='popup__field'>
        <input
          type='text'
          className='popup__input popup__input_type_job'
          value={description}
          onChange={handleDescriptionChange}
          id='title-input'
          name='about'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='popup__input-error title-input-error'></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
