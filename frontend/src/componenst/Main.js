import React, {useContext} from 'react';
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile content">
        <div className="profile__edit-avatar" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile} />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace} />
      </section>

      <div className="elements">
        {props.cards.map((card) => {
          return (<Card key={card._id} data={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
        })}
      </div>
    </main>)
}

export default Main;