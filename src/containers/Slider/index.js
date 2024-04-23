import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // Modification sens de sort Avant : evtA < evtB Après :
    new Date(evtB.date) < new Date(evtA.date) ? 1 : -1
  );

  const nextCard = () => {
    // Ajout d'une verification
    if (byDateDesc !== undefined) {
      setTimeout(
        // Ajout d'un -1 à la methode byDateDesc.length
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                key={`${event.id}`}
                type="radio"
                name="radio-button"
                defaultChecked={idx === radioIdx} // Utilisation de defaultChecked
                onChange={() => null} // Ajout d'une fonction onChange vide pour éviter le warning
              />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
