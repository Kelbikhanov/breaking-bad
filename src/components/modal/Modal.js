import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './modal.css';

import Loading from '../loading/Loading';

const Modal = ({ isModal, src, onClose }) => {
  const loading = useSelector(state => state.seasons.loading);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          event.preventDefault();
          onClose();
        }
      }
      document.addEventListener('mouseup', handleClickOutside);
      return () => {
        document.removeEventListener('mouseup', handleClickOutside);
      };
    }, [ref]);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      {isModal ? loading ? (
        <div className="modal">
          <div className="modal__loading" ref={wrapperRef}>
            <Loading />
          </div>
        </div>
      ) : (
        <div className="modal">
          <div className="modal__inner" ref={wrapperRef}>
            <img
              src={src}
              alt=""
              className="modal__img"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
