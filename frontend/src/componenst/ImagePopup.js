import React from 'react';


function ImagePopup({ card, onClose, isOpen }) {

  return (
    <div className={`popup popup-figure ${isOpen && 'popup_opened'}`}>
      <div className="figure">
        <figure className="figure__container">
          <img className="figure__photo" src={card.link} alt={card.name}/>
            <figcaption className="figure__title">{card.name}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick = {onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;