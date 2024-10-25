import './CardItem.scss';

const CardItem = ({ icon, title, type, onClick }) => {
  return (
    <div className='card' onClick={onClick}>
        <div className="card__wrapper">
            <div className="card__icon">
                <img src={icon} alt="" />
            </div>
            <div className="card__title">
                {title}
            </div>
            <div className={`card__dot ${type}`}>
            </div>
        </div>
    </div>
  )
}

export default CardItem