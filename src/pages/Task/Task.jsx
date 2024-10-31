import './Task.scss';
import CardItem from '../../components/CardItem/CardItem';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CameraIcon from '../../assets/images/camera.svg';
import Task1 from '../../assets/images/task-1.png';
import Task2 from '../../assets/images/task-2.png';
import Button from '../../components/Button/Button';
import { useParams } from 'react-router-dom';
import { categories } from '../../utils/categories';
import { useEffect, useState } from 'react';
import { getTask, updateTask } from '../../api/task.api';
import Loading from '../../components/Loading/Loading';
import { Roles } from '../../enums/Roles';

const Task = ({ chatId, role }) => {
    const { studentId, directionId, taskId, taskIndex } = useParams();

    const [task, setTask] = useState();
    const [loading, setLoading] = useState();
    const [studentAnswer, setStudentAnswer] = useState(); 

    useEffect(() => {
        setLoading(true);

        getTask(chatId, taskId).then((res) => {
            if (res.status == 200){
                setTask(res.data.data);
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const sendStudentAnswerHandler = () => {
        updateTask(chatId, taskId, { 
            student_answer: studentAnswer
        })
    }

    return (
        <div className='task'>
            { loading && (<Loading /> )}
            <div className="task__card">
                <CardItem
                    title={categories.filter(category => category.id == directionId)[0]?.title}
                    icon={categories.filter(category => category.id == directionId)[0]?.icon}
                />
            </div>
            <div className="task__progress">
                <ProgressBar 
                    current={3}
                    total={13}
                />
            </div>
            <div className="task__item">
                <div className="task__title">
                    №{taskIndex} тапсырма
                </div>
                <div className="task__text">
                    {task?.description}
                </div>
            </div>
            <div className="task__title">
                Қатысушы жауабы
            </div>
            {
                task?.files?.length > 0 && (
                    <div className="task__images">
                        <div className="task__image">
                            <img src={Task1} alt="" />
                        </div>
                        <div className="task__image">
                            <img src={Task2} alt="" />
                        </div>
                    </div>
                )
            }
            {
                (task?.student_answer && role === Roles.mentor ) && (
                    <div>
                        <div className="task__title">
                            Эссе
                        </div>
                        <div className="task__text">
                            Абай жолы романының 1-томынан 50 бет оқу.
                            Фото-бейне есепті жүктеу және қысқаша эссе жазу. <br></br>
                            Абай жолы романының 1-томынан 50 бет оқу.
                            Фото-бейне есепті жүктеу және қысқаша эссе жазу. 
                        </div>
                    </div>
                )
            }
            {
                (task?.student_answer == null && role == Roles.mentor) && (
                    <div>
                        Студент еще не ответил
                    </div>
                )
            }
            {
                (task?.student_answer == null && role == Roles.participant) && (
                    <div className='task__answers'>
                        <div className="task__answers-images">
                            <div className="task__answers-image">
                                <img src={CameraIcon} alt="camera" />
                            </div>
                            <div className="task__answers-image">
                                <img src={CameraIcon} alt="camera" />
                            </div>
                        </div>
                        <div className="task__answers-input">
                            <div className="task__answers-input-title">
                                Эссе
                            </div>
                            <div className="task__answers-input-input">
                                <textarea name="" id="" placeholder='Осы жерге жазыңыз' value={studentAnswer} onChange={e => setStudentAnswer(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="task__answers-button" onClick={sendStudentAnswerHandler}>
                            Жіберу
                        </div>
                    </div>
                )
            }
            {
                task?.student_answer && (
                    <div className="task__buttons">
                        <Button 
                            text="Қабылдау"
                        />
                        <Button 
                            text="Қабылдамау"
                            backgroundColor='#EE3232'
                        />
                    </div>
                )
            }
            
        </div>
    )
}

export default Task