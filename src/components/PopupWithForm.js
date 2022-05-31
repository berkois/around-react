import React from 'react';

function PopupWithForm(props) {
  const { name, isOpen, onClose, title, onSubmit, children, textOnButton } =
    props;
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button button'
          type='button'
          aria-label='close-button'
          onClick={onClose}></button>
        <h2 className='popup__header'>{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          formNoValidate>
          {children}
          <button
            type='submit'
            className='button popup__save-button'
            value='Save'>
            {textOnButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
