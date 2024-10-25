import './AdminLang.scss';
import Logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { updateUserInfo } from '../../api/account.api';
import Loading from '../../components/Loading/Loading';

const AdminLang = ({ id, chatId }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState();

    const selectLanguageHandler = (lang) => {
        setLoading(true);

        updateUserInfo(id, chatId, { lang: lang }).then((res) => {
            if (res.status == 200){
                navigate('/main')
            }
            setLoading(false);
        })
    }

    return (
        <div className='adminLang'>
            { loading && <Loading /> }
            <div className="adminLang__title">
                Ел үміті
            </div>
            <div className="adminLang__buttons">
                <div className="adminLang__button" onClick={() => selectLanguageHandler('kz')}>
                    Қазақ
                </div>
                <div className="adminLang__button" onClick={() => selectLanguageHandler('ru')}>
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