import './BoxItem.scss';

const BoxItem = ({ icon, title }) => {
  return (
    <div className='box'>
        <div className="box__icon">
            <img src={icon} alt="" />
        </div>
        <div className="box__title">
            { title }
        </div>
    </div>
  )
}

export default BoxItem