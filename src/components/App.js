import React from "react";

import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .loadUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser({ name, about }) {
    api.editProfileData(name, about).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
        >
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            handleCloseClick={closeAllPopups}
            title="New place"
            name="card"
            buttonText="Create"
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
          </PopupWithForm>

          <PopupWithForm
            title="Are you sure?"
            name="confirm"
            modifier="confirm"
            buttonText="Save"
          >
            <input
              className="popup__button popup__button_confirm"
              type="submit"
              value="Yes"
            />
          </PopupWithForm>

          <PopupWithForm
            isOpen={isEditAvatarPopupOpen}
            handleCloseClick={closeAllPopups}
            title="Change profile picture"
            name="avatar"
            buttonText="Save"
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
          </PopupWithForm>
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </Main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
