import './Success.scss';
import Button from '../Button/Button';
import SuccessIcon from '../../assets/images/success.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Success = ({text}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();  

    return (
        <div className='success'>
            <div className="success__image">
                <img src={SuccessIcon} alt="" />
            </div>
            <div className="success__title">
                { text }
            </div>
            <div className="success__button">
                <Button 
                    text={t('back')}
                    paddingY={23}
                    onClick={() => navigate(`/tech-help`)}
                />
            </div>
        </div>
    )
}

export default Success