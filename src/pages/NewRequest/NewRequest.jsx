import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import './NewRequest.scss';

const NewRequest = () => {
    const { t } = useTranslation();

  return (
    <div className='request'>
        <div className="request__select">
            <div className="request__select-title">
                {t('participants')}
            </div>
            <div className="request__select-input">
                <select name="" id="">
                    <option selected hidden disabled>{t('selectFromUsers')}</option>
                </select>
            </div>
        </div>
        <div className="request__textarea">
            <div className="request__textarea-title">
                {t('question')}
            </div>
            <div className="request__select-textarea">
                <textarea name="" id="" placeholder='Текст'></textarea>
            </div>
        </div>
        <Button 
            text={t('send')}
            paddingY={23}
        />
    </div>
  )
}

export default NewRequest