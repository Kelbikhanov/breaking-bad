import './loading.css';

const Loading = ({ black }) => (
  <div className={`lds-roller${black ? ' lds-roller--black' : ''}`}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loading;
