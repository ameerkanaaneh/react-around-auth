export default function Card(props) {
  const { card } = props;
  function handleClick() {
    props.onCardClick(card);
  }
  return (
    <div key={card._id} className="element">
      <button type="button" className="element__delete-button"></button>
      <img
        className="element__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <div className="element__box">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__likes-wrapper">
          <button type="button" className="element__like"></button>
          <p className="element__count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
