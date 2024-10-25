import './Candidates.scss';
import CandidatesItem from "../../components/CandidatesItem/CandidatesItem"
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { getUsersByMentor } from '../../api/account.api';
import { Roles } from '../../enums/Roles';
import Loading from '../../components/Loading/Loading';

const Candidates = ({ chatId, id, setSelectedStudentId }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getUsersByMentor(chatId, id, Roles.participant).then((res) => {
            if (res.status == 200){
                setCandidates(res.data.data);
                setLoading(false);
            }
        })
    }, [])

    return (
        <div className='candidates'>
            { loading && <Loading /> }
            <div className="candidates__header">
                <div className="candidates__title">
                    Жалпы саны { candidates.length }
                </div>
                <div className="candidates__line">
                </div>
            </div>
            <div className="candidates__items">
                {
                    candidates && candidates.map(candidate => (
                        <CandidatesItem 
                            type='blue' 
                            name={candidate?.full_name}
                            id={candidate?.id}
                        />
                    ))
                }
            </div>
            <Button 
                text="Тізімді жүктеп алу"
            />
        </div>
    )
}

export default Candidates