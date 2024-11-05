import { Link } from 'react-router-dom';
import './Account.scss';
import { getUserInfo } from '../../api/account.api';
import { useEffect, useState } from 'react';
import { Roles } from '../../enums/Roles';
import Loading from '../../components/Loading/Loading';

const Account = ({ id, chatId }) => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserInfo(id, chatId).then((res) => {
            if (res.data){
                setAccount({...res.data, role: res.data?.roles[0].name })
            }
            setLoading(false);
        })
    }, [])

    return (
        <>
        { loading && <Loading /> }
        { account && <div className='account'>
            <div className="account__header">
                    <div className="account__avatar">
                        ОА
                    </div>
                    <div className="account__info">
                        <div className="account__name">
                            { account?.fio }
                        </div>
                        {
                            account?.role !== Roles.admin && (
                                <>
                                    <div className="account__info-text">
                                        ИИН: { account?.iin }
                                    </div>
                                    <div className="account__info-text">
                                        Тел: { account?.phoneNumber }
                                    </div>
                                </>        
                            )
                        }
                        {
                            account?.role == Roles.admin && (
                                <div className="account__info-text">
                                    АДМИН
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="account__notification">
                    <div className="account__notification-title">
                        Хабарламалар
                    </div>
                    {/* <div className="account__notification-count">
                        1
                    </div> */}
                </div>
                <div className="account__items">
                    {
                        account?.role == Roles.mentor && (
                            <div className="account__item">
                                <div className="account__item-text">
                                    Қатысушылар
                                </div>
                                <Link to='/candidates' className="account__item-title">
                                    Қатысушылар тізімі
                                </Link>
                            </div>
                        )
                    }
                    {
                        account?.role == Roles.participant && (
                            <>
                                <a href={`/files/kz.pdf`} className="account__item-title" download>
                                    Тапсырмалар үлгісін жүктеп алу
                                </a>
                                <div className="account__item-title">
                                    Тапсырмаларды жіберу
                                </div>
                            </>
                        )
                    }
                    <div className="account__item">
                        <div className="account__item-text">
                            Баптаулар
                        </div>
                        <div className="account__item-title">
                            Тілді ауысытыру
                        </div>
                    </div>
                </div>
            </div>}
            </>
        )
}

export default Account