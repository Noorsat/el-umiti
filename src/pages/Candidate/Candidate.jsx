import './Candidate.scss';
import CandidatesItem from '../../components/CandidatesItem/CandidatesItem';
import BoxItem from '../../components/BoxItem/BoxItem';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CardItem from '../../components/CardItem/CardItem';
import PhoneIcon from '../../assets/images/phone.svg';
import PdfIcon from '../../assets/images/pdf.svg';
import TasksIcon from '../../assets/images/tasks.svg';
import MentorChangeIcon from '../../assets/images/mentor-change.svg';
import ChangeTaskIcon from '../../assets/images/change-task.svg';
import DeleteIcon from '../../assets/images/delete.svg';
import ParticipiantsIcon from '../../assets/images/participiants.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserById } from '../../api/account.api';
import { categories } from '../../utils/categories';
import Loading from '../../components/Loading/Loading';
import { getDirections } from '../../api/task.api';
import { Roles } from '../../enums/Roles';
import { useTranslation } from 'react-i18next';

const Candidate = ({ role, setSelectedStudentId }) => {
    const { t, i18n } = useTranslation(); 
    const navigate = useNavigate();
    const { id } = useParams();

    const currentLanguage = i18n.language;
    
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();
    const [directions, setDirections] = useState();

    useEffect(() => {
        setLoading(true);
        setSelectedStudentId(id);
        getUserById(id).then((res) => {
            if (res.data){
                setUser(res.data)
                setLoading(false);
            }
        })
        getDirections(id).then((res) => {
            if (res.data){
                setDirections(res.data);
            }
        })
    }, [])

    return (
        <div className='candidate'>
            {
                loading && <Loading />
            }
            <CandidatesItem 
                name={user?.fio}
                iin={user?.iin}
            />
            <div className="candidate__phone">
                <div className="candidate__phone-title">
                    {t('contacts')}
                </div>
                <div className="candidate__phone-text">
                    { user?.phoneNumber }
                </div>
            </div>
            <div className="candidate__items">
                {
                    role == Roles.admin && user?.roles[0]?.name == Roles.mentor && (
                        <BoxItem 
                            title={t('participant')}
                            icon={ParticipiantsIcon}
                            onClick={() => navigate(`/candidates/${id}`)}
                        /> 
                    )
                }
                <a href={`tel:${user?.phoneNumber}`}>
                    <BoxItem 
                        icon={PhoneIcon}
                        title={t('contactUs')}
                    />
                </a>
                {
                    !(role == Roles.admin && user?.roles[0]?.name == Roles.mentor) && (
                        <BoxItem 
                            icon={PdfIcon}
                            title={`${t('permission')} PDF`}
                        />
                    )
                }
                  {
                    !(role == Roles.admin && user?.roles[0]?.name == Roles.mentor) && (
                        <BoxItem 
                            icon={TasksIcon}
                            title={t('taskList')}
                        />
                    )
                }
                {
                    (role == Roles.admin && user?.roles[0]?.name == Roles.participant) && (
                        <BoxItem 
                            title={t('selectMentor')}
                            icon={MentorChangeIcon}
                            onClick={() => navigate(`/change-mentor/${id}`)}
                        />
                    )
                }
                {
                    (role == Roles.admin && user?.roles[0]?.name == Roles.participant) && (
                        <BoxItem 
                            title={t('updateTask')}
                            icon={ChangeTaskIcon}
                        />
                    )
                }
                {
                    role == Roles.admin && (
                        <BoxItem 
                            title={t('delete')}
                            icon={DeleteIcon}
                            titleColor={'#FF0B54'}
                        />
                    )
                }
            </div>
            {
                role != Roles.admin && (
                    <div className='candidate__progress'>
                        <ProgressBar 
                            current={12}
                            total={50}
                        />
                    </div>
                )
            }
            {
                role != Roles.admin && (
                    <div className="candidate__cards">
                        {
                            directions && directions.map((direction, i) => (
                                <CardItem 
                                    title={currentLanguage == 'kz' ? direction.nameKaz : direction?.nameRus}
                                    icon={categories.filter((item, index) => index == i)[0]?.icon}
                                    onClick={() => navigate(`/exam/${direction.id}`)}
                                /> 
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Candidate