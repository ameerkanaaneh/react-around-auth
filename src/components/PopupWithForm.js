export default function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name}`}>
      <div
        className={`popup__container ${
          props.modifier && `popup__container_${props.modifier}`
        }`}
      >
        <button type="button" className="popup__close"></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          noValidate
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
        >
          <fieldset className="popup__fields">{props.children}</fieldset>
        </form>
      </div>
    </section>
  );
}
