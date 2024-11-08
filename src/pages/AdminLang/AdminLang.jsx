import './AdminLang.scss';
import Logo from '../../assets/images/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { changeLanguage, getUserById, updateUserInfo } from '../../api/account.api';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

const AdminLang = ({ id, setId, setUser, setRole }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState();

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
        <div className='adminLang'>
            { loading && <Loading /> }
            <div className="adminLang__title">
                Ел үміті
            </div>
            <div className="adminLang__buttons">
                <div className="adminLang__button" onClick={() => selectLanguageHandler('KAZ')}>
                    Қазақ
                </div>
                <div className="adminLang__button" onClick={() => selectLanguageHandler('RUS')}>
                    Русский
                </div>
            </div>
            <div className="adminLang__logo">
                Разработано командой <img src={Logo} alt='logo' />
            </div>
        </div>
  )
}

export default AdminLang;