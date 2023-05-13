import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.data.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`element__delete-button ${isOwn && "element__delete-button_visible"}`);

  const isLiked = props.data.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-button ${isLiked && "element__like-button_active"}`);

  function handleClick() {
    props.onCardClick(props.data);
  }

  function handleLikeClick() {
    props.onCardLike(props.data);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.data);
  }

  return (
    <div className="element">
      <img className="element__image" src={props.data.link} alt={props.data.name} onClick={handleClick} />
      <div className="element__title-like">
        <h2 className="element__title">{props.data.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick} />
          <p className="element__like-counter">{props.data.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick} />
    </div>
  )
}

export default Card;