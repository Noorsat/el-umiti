import './Candidates.scss';
import CandidatesItem from "../../components/CandidatesItem/CandidatesItem"
import { useEffect, useState } from 'react';
import { getUsersByMentor } from '../../api/account.api';
import Loading from '../../components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Roles } from '../../enums/Roles';

const Candidates = ({ chatId, id, setSelectedStudentId, role }) => {
    const { mentorId } = useParams(); 
    const navigate = useNavigate();

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getUsersByMentor(mentorId || id).then((res) => {
            if (res.status == 200){
                setCandidates(res.data);
                setLoading(false);
            }
        })
    }, [])

    return (
        <div className='candidates'>
            { loading && <Loading /> }
            {
                (role == Roles.admin && mentorId) && (
                    <Button 
                        text={`Жаңа қатысушы қосу`}
                        onClick={() => navigate(`/new-user/${mentorId}`)}
                    />            
                )
            }
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
                            name={candidate?.participant?.fio}
                            id={candidate?.participant?.id}
                        />
                    ))
                }
            </div>
            {/* <Button 
                text="Тізімді жүктеп алу"
            /> */}
        </div>
    )
}

export default Candidates