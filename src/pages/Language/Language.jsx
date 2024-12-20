import './Language.scss';
import KzIcon from '../../assets/images/kz.svg';
import RuIcon from '../../assets/images/ru.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { changeLanguage, getUserById, updateUserInfo } from '../../api/account.api';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

const Language = ({ setChatId, setRole, setId, id, chatId, setUser }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState();

    const location = useLocation().search;

    const userId = location && location.split("=")[1] || localStorage.getItem("userId");

    useEffect(() => {
        getUserById(userId).then((res) => {
            setUser(res.data);
            setRole(res.data?.roles[0]?.name);
        })

        localStorage.setItem("userId", userId);
        setId(userId);
    }, [])

    const selectLanguageHandler = (lang) => {
        setLoading(true);
        i18n.changeLanguage(lang == "KAZ" ? 'kz' : 'ru')

        changeLanguage(id, lang).then((res) => {
            if (res.status == 200){
                navigate('/main');
            }

            setLoading(false)
        })
    }
 
    return (
        <div className='language'>
            { loading && <Loading /> }
            <div className="language__title">
                Тілді таңдаңыз
            </div>
            <div className="language__text">
                Выберите язык
            </div>
            <div className="language__langs">
                <div className="language__lang" onClick={() => selectLanguageHandler('KAZ')}>
                    <div className="language__lang-icon">
                        <img src={KzIcon} alt="" />
                    </div>
                    <div className="language__lang-text">
                        Қазақ тілі
                    </div>
                </div>
                <div className="language__lang" onClick={() => selectLanguageHandler('RUS')}> 
                    <div className="language__lang-icon">
                        <img src={RuIcon} alt="" />
                    </div>
                    <div className="language__lang-text">
                        Русский язык
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Language