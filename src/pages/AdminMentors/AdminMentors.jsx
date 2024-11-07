import './AdminMentors.scss';
import DropdownMenuIcon from '../../assets/images/dropdown.svg';
import { useEffect, useState } from 'react';
import { getMentors } from '../../api/users.api';
import { getUsersByMentor } from '../../api/account.api';
import CardItem from '../../components/CardItem/CardItem';
import CandidatesItem from '../../components/CandidatesItem/CandidatesItem';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const AdminMentors = () => {
    const navigate = useNavigate();

    const [mentors, setMentors] = useState(null);
    const [students, setStudents] = useState(null);
    const [selectedMentorId, setSelecteMentorId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getMentors().then((res) => {
            if (res.status == 200){
                setMentors(res.data);
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const getMentorsStudentsHandler = (mentorId) => {
        if (mentorId == selectedMentorId){
            setSelecteMentorId(null);
            setStudents(null);
        }else{
            setLoading(true);

            setSelecteMentorId(mentorId); 

            getUsersByMentor(mentorId).then((res) => {
                if (res.status == 200){
                    setStudents(res.data);
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    return (
        <div className='mentors'>
            { loading && <Loading />}
            <div className="mentors__items">
                {
                    mentors && mentors.map(mentor => (
                        <div className="mentors__item" onClick={() => getMentorsStudentsHandler(mentor.id)}>
                            <div className="mentors__item-header">
                                <div className="mentors__item-name">
                                    { mentor?.fio?.split(" ")[0] } { mentor?.fio?.split(" ")[1]?.charAt(0).toUpperCase() }.{ mentor?.fio?.split(" ")[2]?.charAt(0).toUpperCase() }.
                                </div>
                                <div className="mentors__item-border"></div>
                                <div className="mentors__item-dropdown" style={{ transform: selectedMentorId == mentor?.id ? 'rotate(180deg)' : '' }}>
                                    <img src={DropdownMenuIcon} alt="" />
                                </div>
                            </div>
                            {
                                selectedMentorId == mentor.id && (
                                    students?.map(student => (
                                        <CandidatesItem 
                                            name={student?.participant?.fio}
                                            id={student?.participant?.id}
                                        />
                                    ))
                                )
                            }
                        </div>
                    ))
                }
            </div>
            <Button
                text="Жаңа қатысушы қосу"
                onClick={() => navigate(`/new-user`)}
            />
        </div>
    )
}

export default AdminMentors