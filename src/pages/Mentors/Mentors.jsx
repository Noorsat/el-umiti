import './Mentors.scss';
import { useEffect, useState } from 'react';
import { getMentors } from '../../api/users.api';
import CandidatesItem from '../../components/CandidatesItem/CandidatesItem';

const Mentors = () => {
    const [mentors, setMentors] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getMentors().then((res) => {
            if (res.status == 200){
                setMentors(res.data);
                setLoading(false);
            }
        })
    }, [])

    return (
        <div className='mentorss'>
            <div className="mentors__itemss">
                {
                    mentors && mentors?.map(mentor => (
                        <CandidatesItem 
                            name={mentor?.fio}
                            id={mentor?.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Mentors