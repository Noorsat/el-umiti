import './TaskUpload.scss';
import CardItem from '../../components/CardItem/CardItem';
import Button from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { categories } from '../../utils/categories';
import { createTask } from '../../api/task.api';
import { useState } from 'react';
import Loading from '../../components/Loading/Loading';

const TaskUpload = ({ chatId, id : userId, selectedStudentId }) => {  
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [task, setTask] = useState({
        user_id: Number(selectedStudentId),
        direction_id: categories.filter(category => category.id == id)[0]?.id,
        title: categories.filter(category => category.id == id)[0]?.title,
        created_by: Number(userId),
        mentor_id: Number(userId),
        description: '',
        deadline: '',
        status: 1
    });

    const createTaskHandler = () => {
        setLoading(true);
        createTask(chatId, task).then((res) => {
            if (res.status == 201){
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
                    title={ categories.filter(category => category.id == id)[0]?.title }
                    icon={ categories.filter(category => category.id == id)[0]?.icon } 
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
                        value={task?.description}
                        onChange={(e) => setTask({...task, description: e.target.value})}
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