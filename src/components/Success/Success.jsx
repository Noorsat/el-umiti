import './Success.scss';
import Button from '../Button/Button';
import SuccessIcon from '../../assets/images/success.svg';
import { useTranslation } from 'react-i18next';

const Success = ({text}) => {
    const { t } = useTranslation();

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
            />
        </div>
    </div>
  )
}

export default Success