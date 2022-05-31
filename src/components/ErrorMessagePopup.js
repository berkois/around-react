import React from 'react';
import PopupWithForm from './PopupWithForm';

function ErrorMessagePopup(props) {
  const { isOpen, onClose } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <PopupWithForm
      name='error'
      title='An error occurred.'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textOnButton={'OK'}
    />
  );
}

export default ErrorMessagePopup;
