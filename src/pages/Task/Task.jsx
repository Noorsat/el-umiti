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
import { answerTask, apporoveAnswer, getImage, getTask, updateTask, uploadFilesToAnswer } from '../../api/task.api';
import Loading from '../../components/Loading/Loading';
import { Roles } from '../../enums/Roles';

const Task = ({ chatId, role }) => {
    const { studentId, directionId, taskId, taskIndex } = useParams();

    const [task, setTask] = useState();
    const [loading, setLoading] = useState();
    const [studentAnswer, setStudentAnswer] = useState(); 
    const [firstFile, setFirstFile] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [secondFile, setSecondFile] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [images, setImages] = useState([]); 

    const navigate = useNavigate();

    const fetchImageUrl = async (imageId) => {
        const imageUrl = await getImage(imageId);

        setImages(prevImages => [...prevImages, {
            id: imageId,
            link: imageUrl
        }])
    };
    
    useEffect(() => {
        setLoading(true);

        getTask(taskId).then((res) => {
            if (res.status == 200){
                setTask({...res.data, answers: res.data?.answers?.map(answer => {
                    return {
                        ...answer,
                        answerFiles: answer?.answerFiles?.map(file => {
                            return {
                                ...file, 
                                fileLink: fetchImageUrl(file.id)
                            }
                        })
                    }
                })});
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const sendStudentAnswerHandler = () => {
        setLoading(true);

        answerTask({taskId: Number(taskId), text: studentAnswer}).then((res) => {
            if (res.status == 200){

                if (firstFile || secondFile){
                    const formData = new FormData();

                    if (firstFile){
                        formData.append('files', firstFile);
                    }
                    if (secondFile){
                        formData.append('files', secondFile);
                    }
    
                    uploadFilesToAnswer(res.data.id, formData).then((res) => {
                        if (res.status == 200){
                            navigate(`/exam/${directionId}`);
                        }
                    })
                }else{
                    navigate(`/exam/${directionId}`);
                }
              
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
    
    const firstImageHandler = (event) => {
        const file = event.target.files[0];
        setFirstFile(file);
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          setFirstImage(previewUrl);
        }
    }

    const secondImageHandler = (event) => {
        const file = event.target.files[0];
        setSecondFile(file);
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          setSecondImage(previewUrl);
        }
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
                    {task?.descriptionKaz}
                </div>
            </div>
            <div className="task__title">
                Қатысушы жауабы
            </div>
            {/* {
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
            } */}
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
                            <div className="task__images">
                                {
                                    answer?.answerFiles?.map(file => {
                                        return (
                                            <img src={ images.filter(image => image.id == file.id)[0]?.link } width={'50%'} />  
                                        )
                                    })
                                }
                             
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
                                <input type='file' onChange={(e) => firstImageHandler(e)} />
                                {
                                    firstImage && <img className='task__answers-image-item' src={firstImage} />
                                }
                            </div>
                            <div className="task__answers-image">
                                <img src={CameraIcon} alt="camera" />
                                <input type='file' onChange={(e) => secondImageHandler(e)} />
                                {
                                    secondImage && <img className='task__answers-image-item' src={secondImage} />
                                }
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
                (task?.answers.length > 0 && role == Roles.mentor && !(task?.answers?.filter(answer => (answer.approved == true ||  answer.approved == false)).length > 0)) && (
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
            {
                (task?.answers.length > 0 && role == Roles.mentor && (task?.answers?.filter(answer => answer.approved == true).length > 0)) && (
                    <div className="task__success">
                        Қабылданды
                    </div>
                )
            }
             {
                (task?.answers.length > 0 && role == Roles.mentor && (task?.answers?.filter(answer => answer.approved == false).length > 0)) && (
                    <div className="task__error">
                        Қабылданбады
                    </div>
                )
            }
            
        </div>
    )
}

export default Task