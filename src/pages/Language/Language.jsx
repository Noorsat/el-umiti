import './Language.scss';
import KzIcon from '../../assets/images/kz.svg';
import RuIcon from '../../assets/images/ru.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateUserInfo } from '../../api/account.api';
import Loading from '../../components/Loading/Loading';

const Language = ({ setChatId, setRole, setId, id, chatId, setUser }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState();

    const location = useLocation().search;

    const params = location && location.split("&");

    const chatIdd = params && params[0].split("=")[1];
    const role = params && params[1].split("=")[1];
    const idd = params && params[2].split("=")[1];

    useEffect(() => {
        setChatId(chatIdd);
        localStorage.setItem('chatId', chatIdd);
        setRole(role);
        setId(idd);
    }, [])

    const selectLanguageHandler = (lang) => {
        setLoading(true);

        updateUserInfo(id, chatId, { lang: lang }).then((res) => {
            if (res.status == 200){
                navigate('/main');
                setUser(res.data.data)
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
                <div className="language__lang" onClick={() => selectLanguageHandler('kz')}>
                    <div className="language__lang-icon">
                        <img src={KzIcon} alt="" />
                    </div>
                    <div className="language__lang-text">
                        Қазақ тілі
                    </div>
                </div>
                <div className="language__lang" onClick={() => selectLanguageHandler('ru')}> 
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