import './BoxItem.scss';

const BoxItem = ({ icon, title, titleColor }) => {
  return (
    <div className='box'>
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