import React, { useEffect, useState } from 'react';

import './App.css';

import { getCharacterImg, getSeasons } from './store/actions/seasons';
import { useDispatch, useSelector } from 'react-redux';
import Card from './components/card/Card';
import Header from './components/header/Header';
import Modal from './components/modal/Modal';
import Loading from './components/loading/Loading';

const App = () => {
  const dispatch = useDispatch();
  const seasons = useSelector(state => state.seasons.seasons);
  const src = useSelector(state => state.seasons.characterImgSrc);
  const loading = useSelector(state => state.seasons.seasonsLoading);
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const seasonsArr = [7, 13, 13, 13, 16, 10, 10, 10, 10];

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);

    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    }
  }, []);

  // let i = page === 1 ? 0 : seasonsArr.reduce((prev, current, i) => i !== page ? prev + current : prev);

  useEffect(() => {
    let currentEpisodes = 0;

    seasonsArr.forEach((item, i) => {
      if (page - 1 === i || page - 1 < i) return;

      currentEpisodes += item;
    });

    for (let i = currentEpisodes; i < seasonsArr[page - 1] + currentEpisodes; i++) {
      dispatch(getSeasons(i + 1));
    }
  }, [page]);

  const modalHandler = (character) => {
    setIsModal(true);

    if (character.split('').find((item) => item === '-')) {
      dispatch(getCharacterImg(character.split('-').join('+'), page === 1));
    } else {
      dispatch(getCharacterImg(character.split(' ').join('+'), page === 1));
    }
  };

  const infiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {
      setPage((prevState) => {
        if (prevState + 1 <= seasonsArr.length) return prevState += 1
      });
    }
  };

  const renderCards = () => seasons.length > 0 && seasons.map((item) => (
    <React.Fragment key={`${Math.random()}--main-cards`}>
      <div className="cards__season">
        Сезон {item.season}
      </div>
      <div className="cards">
        {item.list.map((listItem, i) => (
          <Card index={i + 1} title={listItem.title} key={`${Math.random()}--main-card`}>
            {listItem.characters.map((character, index) => index + 1 !== listItem.characters.length ? (
              <div
                onClick={() => modalHandler(character)}
                className="card__character"
                key={`${Math.random()}--main-card-character`}
              >
                {character}
                ,
              </div>
            ) : (
              <div
                onClick={() => modalHandler(character)}
                className="card__character"
                key={`${Math.random()}--main-card-character`}
              >
                {character}
              </div>
            ))}
          </Card>
        ))}
      </div>
    </React.Fragment>
  ));

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="main-wrapper">
          {loading ? (
            <div className="cards__loading">
              <Loading black />
            </div>
          ) : renderCards()}
        </div>
      </main>

      <Modal
        isModal={isModal}
        src={src}
        onClose={() => setIsModal(false)}
      />
    </div>
  );
}

export default App;
