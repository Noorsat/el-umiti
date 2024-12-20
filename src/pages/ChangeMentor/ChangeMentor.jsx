import { useEffect, useState } from 'react';
import './ChangeMentor.scss';
import { getMentors } from '../../api/users.api';
import { defineMentorToUser } from '../../api/account.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChangeMentor = () => {
    const { t } = useTranslation();
    const { userId } = useParams();
    const navigate = useNavigate();

    const [mentors, setMentors] = useState(null);
    const [selectedMentorId, setSelectedMentorId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getMentors().then((res) => {
            if (res.status == 200){
                setMentors(res.data);
            }
        }).catch((err) => {
            alert("Нету менторов")
        }).finally(() => {
            setLoading(false);
        })
    }, []) 

    const changeMentorHandler = () => {
        defineMentorToUser(userId, selectedMentorId).then((res) => {
            if (res.status == 200){
                navigate(`/candidate/${userId}`)
            }
        })
    }

    return (
        <div className='changeMentor'>
            <div className="changeMentor__title">
                {t('selectMentorPrompt')}
            </div>
            <div className="changeMentor__select">
                <select value={selectedMentorId} onChange={(e) => setSelectedMentorId(e.target.value)}>
                    <option value="">{t('notSelected')}</option>
                    {
                        mentors && mentors.map((mentor) => (
                            <option value={mentor?.id}>{mentor?.fio}</option>
                        ))
                    }
                </select>
            </div>
            <div className="changeMentor__button">
                <button disabled={!selectedMentorId} onClick={changeMentorHandler}>
                    {t('save')}
                </button>
            </div>
        </div>
    )
}

export default ChangeMentor