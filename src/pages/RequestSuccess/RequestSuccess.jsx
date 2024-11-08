import { useTranslation } from 'react-i18next';
import Success from '../../components/Success/Success';
import './RequestSuccess.scss';

const RequestSuccess = () => {
  const {t} = useTranslation();

  return (
    <div className='requestSuccess'>
        <Success 
            text={t('applicationSent')}
        />
    </div>
  )
}

export default RequestSuccess