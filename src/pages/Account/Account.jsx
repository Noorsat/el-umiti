import { Link } from 'react-router-dom';
import './Account.scss';
import { getUserInfo } from '../../api/account.api';
import { useEffect, useState } from 'react';
import { Roles } from '../../enums/Roles';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

const Account = ({ id, chatId }) => {
    const { t } = useTranslation();

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
                        {/* ОА   */}
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
                        { t('notifications') }
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
                                    { t('participant') }
                                </div>
                                <Link to='/candidates' className="account__item-title">
                                    { t('participantList') }
                                </Link>
                            </div>
                        )
                    }
                    {
                        account?.role == Roles.participant && (
                            <>
                                <a href={`/files/kz.pdf`} className="account__item-title" download>
                                    {t('downloadTaskTemplate')}
                                </a>
                                <div className="account__item-title">
                                    {t('submitTasks')}
                                </div>
                            </>
                        )
                    }
                    <div className="account__item">
                        <div className="account__item-text">
                            { t('settings') }
                        </div>
                        <div className="account__item-title">
                            { t('changeLanguage') } 
                        </div>
                    </div>
                </div>
            </div>}
            </>
        )
}

export default Account