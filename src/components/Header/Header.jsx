import './Header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { headerTitle, headerTitleKz } from '../../utils/headerTitleKz';
import BackIcon from '../../assets/images/back-arrow.svg';
import { useTranslation } from 'react-i18next';
import { headerTitleRu } from '../../utils/headerTitleRu';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLanguage = i18n.language;

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
          { location.pathname.split("/")[1] === 'exam' ? (currentLanguage == 'kz' ? headerTitleKz[`exam-${location.pathname.split("/")[2]}`] : headerTitleRu[`exam-${location.pathname.split("/")[2]}`]) : (currentLanguage == 'kz' ? headerTitleKz[location.pathname.split("/")[1]] : headerTitleRu[location.pathname.split("/")[1]]) }
        </div>
    </div>
  )
}

export default Header