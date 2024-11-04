import './TaskUpload.scss';
import CardItem from '../../components/CardItem/CardItem';
import Button from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { categories } from '../../utils/categories';
import { createTask, getDirections } from '../../api/task.api';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import moment from 'moment';

const TaskUpload = ({ chatId, id : userId, selectedStudentId }) => {  
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [directions, setDirections] = useState();
    const [task, setTask] = useState({
        nameRus: "",
        nameKaz: "",
        descriptionKaz: "",
        descriptionRus: "",
        deadline: "",
        participantId: Number(selectedStudentId),
        directionId: Number(id),
        mentorId: Number(userId)
    });


    useEffect(() => {
        setLoading(true);

        getDirections(userId).then((res) => {
            if (res.data){
                setDirections(res.data);                
            }
            setLoading(false);

        }) 
    }, [])

    const createTaskHandler = () => {
        setLoading(true);
        createTask({...task, deadline: moment(task?.deadline).format('YYYY-MM-DDT00:00:00.000Z').slice(0, moment(task?.deadline).format('YYYY-MM-DDT00:00:00.000Z').length -3) + "00" }).then((res) => {
            if (res.status == 200){
                navigate(`/exam/${id}`)
            }

            setLoading(false);
        })
    }

    return (
        <div className='upload'>
            {
                loading && <Loading />
            }
            <div className="upload__card">
                <CardItem
                    title={ directions?.filter(category => category.id == id)[0]?.nameKaz }
                    icon={ categories?.filter(item => item.id == directions?.filter(category => category.id == id)[0]?.id)[0]?.icon } 
                />
            </div>
            <div className="upload__title">
                Тапсырманы енгізіңіз
            </div>
            <div className="upload__input">
                <div className="upload__input-title">
                    Тапсырма сұрағы
                </div>
                <div className="upload__input-textarea">
                    <textarea
                        placeholder="Текст"
                        value={task?.descriptionKaz}
                        onChange={(e) => setTask({...task, descriptionKaz: e.target.value})}
                    />
                </div>
            </div>
            <div className="upload__datepicker">
                <div className="upload__datepicker-title upload__input-title">
                    Дедлайн
                </div>
                <div className="upload__datepicker-calendar">
                    <input 
                        type="date" 
                        placeholder="Выберите дату" 
                        onChange={(e) => setTask({...task, deadline: e.target.value})}
                    />
                </div>
            </div>
            <Button 
                text="Жіберу"
                onClick={createTaskHandler}
            />
        </div>
    )
}

export default TaskUpload