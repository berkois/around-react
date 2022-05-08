// import logo from "./images/logo.svg";

function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="logo header__logo"></div>
      </header>
      <main className="content">
        <section className="profile">
          <div id="profile-avatar" className="profile__avatar">
            <div className="profile__avatar-cover">
              <img id="edit-avatar-icon" className="profile__avatar-edit" src=" " alt="Edit icon that covers the user's profile avatar" />
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__name-line">
              <h1 className="profile__name">Cousteau</h1>
              <button className="button profile__edit-button" type="button" aria-label="edit-button"></button>
            </div>
            <p className="profile__title">Explorer</p>
          </div>
          <button className="button profile__add-button" type="button" aria-label="add-button"></button>
        </section>
        <section className="photos-grid">
          <ul className="photos-grid__list"></ul>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copyright">&copy; 2021 Around The U.S.</p>
      </footer>
      <section className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="close-button"></button>
          <h2 className="popup__header">Edit profile</h2>
          <form className="popup__form popup__form_type_edit-profile" name="edit" novalidate>
            <label className="popup__field">
              <input type="text" className="popup__input popup__input_type_name" id="name-input" name="name" minlength="2" maxlength="40" required />
              <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__field">
              <input type="text" className="popup__input popup__input_type_job" id="title-input" name="about" minlength="2" maxlength="200" required />
              <span className="popup__input-error title-input-error"></span>
            </label>
            <button type="submit" className="button popup__save-button" value="Save">
              Save
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_edit-avatar">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="close-button"></button>
          <h2 className="popup__header">Change profile picture</h2>
          <form className="popup__form popup__form_type_edit-avatar" name="edit-avatar" novalidate>
            <label className="popup__field">
              <input type="url" className="popup__input popup__input_type_avatar-src" id="avatar-url-input" placeholder="Image link" name="avatar" required />
              <span className="popup__input-error avatar-url-input-error"></span>
            </label>
            <button type="submit" className="button popup__save-button" value="Save">
              Save
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_add-card">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="close-button"></button>
          <h2 className="popup__header">New place</h2>
          <form className="popup__form popup__form_type_add-card" name="add-card" novalidate>
            <label className="popup__field">
              <input type="text" className="popup__input popup__input_type_place" id="place-input" value="" placeholder="Title" name="name" minlength="1" maxlength="30" required />
              <span className="popup__input-error place-input-error"></span>
            </label>
            <label className="popup__field">
              <input type="url" className="popup__input popup__input_type_img-src" id="image-url-input" value="" placeholder="Image link" name="link" required />
              <span className="popup__input-error image-url-input-error"></span>
            </label>
            <button type="submit" className="button popup__save-button" value="Create">
              Create
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_delete-card">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="close-button"></button>
          <h2 className="popup__header">Are you sure?</h2>
          <form className="popup__form popup__form_type_delete-card" name="delete" novalidate>
            <button type="submit" className="button popup__save-button" value="Yes">
              Yes
            </button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_error">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="close-button"></button>
          <h2 className="popup__header">An error occurred.</h2>
          <p className="popup__text">test</p>
          <form className="popup__form popup__form_type_error" name="delete" novalidate>
            <button type="submit" className="button popup__save-button" value="OK">
              OK
            </button>
          </form>
        </div>
      </section>
      <section className="picture-popup popup">
        <div className="picture-popup__popup-container">
          <img className="picture-popup__popup-image" src=" " alt=" " />
          <button className="popup__close-button button" type="button" aria-label="close-button"></button>
          <p className="picture-popup__popup-text"></p>
        </div>
      </section>
    </div>
  );
}

export default App;
