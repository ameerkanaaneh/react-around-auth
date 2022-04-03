export default function ImagePopup() {
  return (
    <section className="popup popup_type_image">
      <div className="popup__container-card">
        <button type="button" className="popup__close"></button>
        <img src=" " alt=" " className="popup__card-image" />
        <p className="popup__name"></p>
      </div>
    </section>
  );
}
