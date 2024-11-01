import './Candidate.scss';
import CandidatesItem from '../../components/CandidatesItem/CandidatesItem';
import BoxItem from '../../components/BoxItem/BoxItem';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CardItem from '../../components/CardItem/CardItem';
import PhoneIcon from '../../assets/images/phone.svg';
import PdfIcon from '../../assets/images/pdf.svg';
import TasksIcon from '../../assets/images/tasks.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserById } from '../../api/account.api';
import { categories } from '../../utils/categories';
import Loading from '../../components/Loading/Loading';

const Candidate = ({ chatId, setSelectedStudentId }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true);
        setSelectedStudentId(id);
        getUserById(chatId, id).then((res) => {
            if (res.data.data){
                setUser(res.data.data)
                setLoading(false);
            }
        })
    }, [])

    return (
        <div className='candidate'>
            {
                loading && <Loading />
            }
            <CandidatesItem 
                name={user?.full_name}
                iin={user?.iin}
            />
            <div className="candidate__phone">
                <div className="candidate__phone-title">
                    Контакты
                </div>
                <div className="candidate__phone-text">
                    { user?.phone }
                </div>
            </div>
            <div className="candidate__items">
                <a href={`tel:${user?.phone}`}>
                    <BoxItem 
                        icon={PhoneIcon}
                        title={'Хабарласу'}
                    />
                </a>
                <BoxItem 
                    icon={PdfIcon}
                    title={'Разрешение PDF'}
                />
                <BoxItem 
                    icon={TasksIcon}
                    title={'Тапсырмалар тізімі'}
                />
            </div>
            <div className='candidate__progress'>
                <ProgressBar 
                    current={12}
                    total={50}
                />
            </div>
            <div className="candidate__cards">
                {
                    categories.map(category => (
                        <CardItem 
                            title={category.title}
                            icon={category.icon}
                            onClick={() => navigate(`/exam/${category.id}`)}
                        /> 
                    ))
                }
            </div>
        </div>
    )
}

export default Candidate