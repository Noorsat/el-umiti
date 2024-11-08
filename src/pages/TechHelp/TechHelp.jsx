import './TechHelp.scss';
import Button from '../../components/Button/Button';
import MessageIcon from '../../assets/images/message.svg';
import { useTranslation } from 'react-i18next';

const TechHelp = () => {
    const { t } = useTranslation();

  return (
    <div className='techHelp'>
        <div className="techHelp__card">
            <div className="techHelp__message-icon">
                <img src={MessageIcon} alt="" />
            </div>
            <div className="techHelp__content">
                <div className="techHelp__title">
                    {t('application')}
                </div>
                <div className="techHelp__text">
                    11.09.2024
                </div>
            </div>
            <div className="techHelp__stats">
                <div className="techHelp__count">
                    1
                </div>
                <div className="techHelp__time">
                    12:02   
                </div>
            </div>
        </div>
        <Button 
            text="Жаңа өтінім беру"
        />
    </div>
  )
}

export default TechHelp