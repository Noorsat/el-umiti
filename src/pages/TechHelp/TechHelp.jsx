import './TechHelp.scss';
import Button from '../../components/Button/Button';
import MessageIcon from '../../assets/images/message.svg';
import MessageReadIcon from '../../assets/images/message-read.svg';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getTechSupports, getTechSupportsByMentorId } from '../../api/techHelp.api';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';
import { Roles } from '../../enums/Roles';

const TechHelp = ({ id, role }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        if (role == Roles.mentor){
            getTechSupportsByMentorId(id).then((res) => {
                if (res.status == 200){
                    setRequests(res.data);
                }
            }).finally(() => {
                setLoading(false);
            })
        }else if (role == Roles.admin){
            getTechSupports().then((res) => {
                if (res.status == 200){
                    setRequests(res.data)
                }
            }).finally(() => {
                setLoading(false);
            })
        }
       
    }, [])

    return (
        <div className='techHelp'>
            {loading && <Loading />}
            <div className="techHelp__cards">
                {
                    requests.length > 0 && requests.map(request => (
                        <Link className="techHelp__card" to={`/tech-support/${request.id}`}>
                        <div className="techHelp__message-icon">
                                <img src={MessageIcon} alt="" />
                            </div>
                            <div className="techHelp__content">
                                <div className="techHelp__title">
                                    {t('application')}
                                </div>
                                <div className="techHelp__text">
                                    { moment(request?.created).format("DD.MM.YYYY") }
                                </div>
                            </div>
                            <div className="techHelp__stats">
                                {
                                    (request.accepted != null) && (
                                        <div className="techHelp__count">
                                            1
                                        </div>
                                    )
                                }
                                <div className="techHelp__time">
                                    { moment(request?.created).format("HH:mm") }
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <Button 
                text={t('newRequest')}
                onClick={() => navigate(`/new-request`)}
            />
        </div>
    )
}

export default TechHelp