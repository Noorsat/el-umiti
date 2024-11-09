import { useNavigate, useParams } from 'react-router-dom';
import './TechSupport.scss';
import { useEffect, useState } from 'react';
import { getTechSupportById, setAcceptTechSupport } from '../../api/techHelp.api';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import { getUserById } from '../../api/account.api';
import { Roles } from '../../enums/Roles';

const TechSupport = ({ role }) => {
    const { t } = useTranslation();
    const {supportId} = useParams();
    const navigate = useNavigate();

    const [request, setRequest] = useState();
    const [participant, setParticipant] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true);

        getTechSupportById(supportId).then((res) => {
            if (res.status == 200){
                setRequest(res.data)

                getUserById(res.data.participantId).then((res) => {
                    if (res.status == 200){
                        setParticipant(res.data);
                    }
                }).finally(() => {
                    setLoading(false);
                })
            }
        })
    }, [])

    const clickTechSupportHandler = (type) => {
        setAcceptTechSupport(supportId, type).then((res) => {
            if (res.status == 200){
                navigate(`/tech-help`);
            }
        })
    }

    return (
        <div className='techSupport'>
            { loading && <Loading />}
            <div className="techSupport__title">
                {t('participants')}
            </div>
            <div className='techSupport__text'>
                { participant?.fio }
            </div>
            <div className="techSupport__title">
                {t('question')}
            </div>
            <div className='techSupport__text'>
                { request?.text }
            </div>
            {
                (role == Roles.admin && request?.accepted == null) && (
                    <>
                        <div className="techSupport__button">
                            <Button
                                text={t('accept')}
                                onClick={() => clickTechSupportHandler(true)}
                            />
                        </div>
                        <div className="techSupport__button">
                            <Button
                                text={t('decline')}
                                backgroundColor={'#D10000'}
                                onClick={() => clickTechSupportHandler(false)}
                            />
                        </div>
                    </>
                )
            }
            {
                request?.accepted == true && (
                    <div className={`techSupport__answer ${request?.accepted ? 'accepted' : ''}`}>
                        {t('accepted')}
                    </div>
                )
            }
             {
                request?.accepted == false && (
                    <div className={`techSupport__answer ${request?.accepted == false ? 'declined' : ''}`}>
                        {t('declined')}
                    </div>
                )
            }
        </div>
    )
}

export default TechSupport