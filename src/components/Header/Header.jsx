import './Header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { headerTitle } from '../../utils/headerTitle';
import BackIcon from '../../assets/images/back-arrow.svg';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const greyHeaders = ['tech-help', 'chat', 'new-request', 'news']

  return (
    <div className='header'>
        {
          location.pathname.substring(1) != 'main' && (
            <div className="header__icon" onClick={() => navigate(-1)}>
              <img src={BackIcon} />
            </div>
          )
        }
        <div 
          className="header__title" 
          style={{ 
            color: greyHeaders.includes(location.pathname.split("/")[1]) ? '#516C7C' : '#0368ff', 
            textTransform: greyHeaders.includes(location.pathname.split("/")[1]) ? 'none' : 'uppercase', 
            fontWeight: greyHeaders.includes(location.pathname.split("/")[1]) ? '400' : '600', 
            fontSize:  greyHeaders.includes(location.pathname.split("/")[1]) ? '16px' : '14px'
          }}
        >
          { location.pathname.split("/")[1] === 'exam' ? headerTitle[`exam-${location.pathname.split("/")[2]}`] : headerTitle[location.pathname.split("/")[1]]}
        </div>
    </div>
  )
}

export default Header