import './BoxItem.scss';

const BoxItem = ({ icon, title, titleColor, onClick }) => {
  return (
    <div className='box' onClick={onClick}> 
        <div className="box__icon">
            <img src={icon} alt="" />
        </div>
        <div className="box__title" style={{ color: titleColor }}>
            { title }
        </div>
    </div>
  )
}

export default BoxItem