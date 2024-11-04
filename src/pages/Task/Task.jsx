import './Task.scss';
import CardItem from '../../components/CardItem/CardItem';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CameraIcon from '../../assets/images/camera.svg';
import Task1 from '../../assets/images/task-1.png';
import Task2 from '../../assets/images/task-2.png';
import Button from '../../components/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { categories } from '../../utils/categories';
import { useEffect, useState } from 'react';
import { answerTask, apporoveAnswer, getTask, updateTask } from '../../api/task.api';
import Loading from '../../components/Loading/Loading';
import { Roles } from '../../enums/Roles';

const Task = ({ chatId, role }) => {
    const { studentId, directionId, taskId, taskIndex } = useParams();

    const [task, setTask] = useState();
    const [loading, setLoading] = useState();
    const [studentAnswer, setStudentAnswer] = useState(); 

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        getTask(taskId).then((res) => {
            if (res.status == 200){
                setTask(res.data);
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const sendStudentAnswerHandler = () => {
        setLoading(true);

        answerTask({taskId: Number(taskId), text: studentAnswer}).then((res) => {
            if (res.status == 200){
                navigate(`/exam/${directionId}`);
            }
            setLoading(false);
        })
    }

    const approveAnswerHandler = () => {
        setLoading(true);

        apporoveAnswer(task?.answers[0].id, true).then((res) => {
            if (res.status == 200){
                navigate(`/exam/${directionId}`)
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const declineAnswerHandler = () => {
        setLoading(true);

        apporoveAnswer(task?.answers[0].id, false).then((res) => {
            if (res.status == 200){
                navigate(`/exam/${directionId}`)
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    console.log(task?.answers)

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
                    {task?.descriptionKaz}
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
                (task?.answers.length > 0 && role === Roles.mentor ) && (
                    task.answers.map(answer => (
                        <div style={{ marginBottom: 12}}>
                            <div className="task__title">
                                Эссе
                            </div>
                            <div className="task__text">
                                { answer.text }
                            </div>
                        </div>
                    ))
                )
            }
            {
                (!(task?.answers.length > 0) && role == Roles.mentor) && (
                    <div>
                        Студент еще не ответил
                    </div>
                )
            }
            {
                (role == Roles.participant) && (
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
                (task?.answers.length > 0 && role == Roles.mentor) && (
                    <div className="task__buttons">
                        <Button 
                            text="Қабылдау"
                            onClick={approveAnswerHandler}
                        />
                        <Button 
                            text="Қабылдамау"
                            backgroundColor='#EE3232'o
                            onClick={declineAnswerHandler}
                        />
                    </div>
                )
            }
            
        </div>
    )
}

export default Task