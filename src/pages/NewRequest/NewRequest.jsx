import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import './NewRequest.scss';
import { useEffect, useState } from 'react';
import { getUsersByMentor } from '../../api/account.api';
import Loading from '../../components/Loading/Loading';
import { createTechSupport } from '../../api/techHelp.api';
import { useNavigate } from 'react-router-dom';

const NewRequest = ({ id }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [participants, setParticipants] = useState();
    const [selectedParticipant, setSelectedParticipant] = useState();
    const [loading, setLoading] = useState();
    const [text, setText] = useState();


    useEffect(() => {
        setLoading(true);

        getUsersByMentor(id).then((res) => {
            if (res.status == 200){
                setParticipants(res.data);
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const createTechSupportRequestHandler = () => {
        if (selectedParticipant && text.length > 0 && id){
            createTechSupport({
                mentorId: id,
                participantId: selectedParticipant,
                text: text
            }).then((res) => {
                if (res.status == 200){
                    navigate(`/request-success`);
                }
            })
        }
    }

    return (
        <div className='request'>
            { loading && <Loading /> }
            <div className="request__select">
                <div className="request__select-title">
                    {t('participants')}
                </div>
                <div className="request__select-input">
                    <select name="" id="" value={selectedParticipant} onChange={(e) => setSelectedParticipant(e.target.value)}>
                        <option selected hidden disabled>{t('selectFromUsers')}</option>
                        {
                            participants?.length > 0 && participants?.map(participant => (
                                <option value={participant?.participant?.id}>{participant?.participant?.fio}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="request__textarea">
                <div className="request__textarea-title">
                    {t('question')}
                </div>
                <div className="request__select-textarea">
                    <textarea name="" id="" placeholder='Текст' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                </div>
            </div>
            <Button 
                text={t('send')}
                paddingY={23}
                onClick={createTechSupportRequestHandler}
            />
        </div>
    )
}

export default NewRequest