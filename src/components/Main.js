import image from "../images/image.jpg";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

export default function Main(props) {
  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__overlay-container"
            onClick={props.onEditAvatarClick}
          >
            <img src={image} alt="profile picture" className="profile__image" />
            <div className="profile__overlay"></div>
          </div>

          <div className="profile__info">
            <div className="profile__head">
              <h1 className="profile__name">Jacques Cousteau</h1>
              <button
                onClick={props.onEditProfileClick}
                type="button"
                className="profile__edit-button"
                src="./images/EditButton.png"
              ></button>
            </div>

            <p className="profile__interest">Explorer</p>
          </div>
        </div>

        <button
          onClick={props.onAddPlaceClick}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements"></section>

      <template id="element">
        <div className="element" onClick={props.onCardClick}>
          <button type="button" className="element__delete-button"></button>
          <img className="element__image" src=" " alt="" />
          <div className="element__box">
            <h2 className="element__name"></h2>
            <div className="element__likes-wrapper">
              <button type="button" className="element__like"></button>
              <p className="element__count">0</p>
            </div>
          </div>
        </div>
      </template>

      <PopupWithForm
        isOpen={props.isEditProfilePopupOpen}
        handleCloseClick={props.onClose}
        title="Edit profile"
        name="profile"
      >
        <input
          className="popup__input popup__input_type_name"
          type="text"
          id="name-input"
          name="name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="name-input-error popup__input-error"></span>

        <input
          className="popup__input popup__input_type_hobby"
          type="text"
          id="hobby-input"
          name="hobby"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="hobby-input-error popup__input-error"></span>

        <input className="popup__button" type="submit" value="Save" />
      </PopupWithForm>

      <PopupWithForm
        isOpen={props.isAddPlacePopupOpen}
        handleCloseClick={props.onClose}
        title="New place"
        name="card"
      >
        <input
          className="popup__input popup__input_type_title"
          placeholder="Title"
          type="text"
          id="title-input"
          required
          name="title"
          minLength="1"
          maxLength="30"
        />
        <span className="title-input-error popup__input-error"></span>

        <input
          placeholder="Image link"
          className="popup__input popup__input_type_link"
          type="url"
          id="image-link-input"
          required
          name="image_link"
        />
        <span className="image-link-input-error popup__input-error"></span>

        <input className="popup__button" type="submit" value="Create" />
      </PopupWithForm>

      <PopupWithForm title="Are you sure?" name="confirm" modifier="confirm">
        <input
          className="popup__button popup__button_confirm"
          type="submit"
          value="Yes"
        />
      </PopupWithForm>

      <PopupWithForm
        isOpen={props.isEditAvatarPopupOpen}
        handleCloseClick={props.onClose}
        title="Change profile picture"
        name="avatar"
      >
        <input
          className="popup__input popup__input_type_url"
          placeholder="profile image link"
          type="url"
          id="url-input"
          required
          name="url"
        />
        <span className="url-input-error popup__input-error"></span>
        <input className="popup__button" type="submit" value="Save" />
      </PopupWithForm>
      <ImagePopup isOpen={props.isCardPopupOpen} />
    </main>
  );
}
