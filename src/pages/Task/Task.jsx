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
import { answerTask, apporoveAnswer, deleteTask, getDirections, getImage, getTask, updateTask, uploadFilesToAnswer } from '../../api/task.api';
import Loading from '../../components/Loading/Loading';
import { Roles } from '../../enums/Roles';
import { useTranslation } from 'react-i18next';

const Task = ({ chatId, role }) => {
    const { t, i18n } = useTranslation();
    const { studentId, directionId, taskId, taskIndex } = useParams();

    const currentLanguage = i18n.language;

    const [task, setTask] = useState();
    const [directions, setDirections] = useState([]);
    const [loading, setLoading] = useState();
    const [studentAnswer, setStudentAnswer] = useState(); 
    const [firstFile, setFirstFile] = useState(null);
    const [firstType, setFirstType] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [secondFile, setSecondFile] = useState(null);
    const [secondType, setSecondType] = useState(null);
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

        getDirections(studentId).then((res) => {
            if (res.status === 200){
              setDirections(res.data);
            }
          }).finally(() => {
            setLoading(false);
          })

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

        if (studentAnswer && studentAnswer.trim().length > 0){
            answerTask({taskId: Number(taskId), text: studentAnswer}).then((res) => {
                if (res.status == 200){
                    if (firstFile || secondFile){
                        const formData1 = new FormData();
                        const formData2 = new FormData();

                        if (firstFile) {
                            formData1.append('files', firstFile);
                        }
                        if (secondFile) {
                            formData2.append('files', secondFile);
                        }

                        setLoading(true); 

                        Promise.all([
                            firstFile ? uploadFilesToAnswer(res.data.id, formData1, firstType.toUpperCase()) : Promise.resolve(),
                            secondFile ? uploadFilesToAnswer(res.data.id, formData2, secondType.toUpperCase()) : Promise.resolve() 
                        ])
                            .then(() => {
                                navigate(`/exam/${directionId}`);
                            })
                            .finally(() => {
                                setLoading(false);
                            })
                            .catch(error => {
                                console.error("File upload failed:", error);
                                setLoading(false);
                            });
                    }else{
                        navigate(`/exam/${directionId}`);
                    }
                }
            })
        }else{
            alert("Заполните поля");
            setLoading(false);
        }
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
            setFirstType(file?.type?.split("/")[0]);
            setFirstImage(previewUrl);
        }
    }

    const secondImageHandler = (event) => {
        const file = event.target.files[0];
        setSecondFile(file);
        if (file) {
          const previewUrl = URL.createObjectURL(file);
          setSecondType(file?.type?.split("/")[0]);
          setSecondImage(previewUrl);
        }
    }

    const deleteTaskHandler = () => {
        setLoading(true);

        deleteTask(task.id).then((res) => {
            if (res.status == 200){
                navigate(`/exam/${directionId}`)
            }
        }).catch((err) => {
            alert(err);
        }).finally(() => {
            setLoading(false);
        })
    }
    
    return (
        <div className='task'>
            { loading && (<Loading /> )}
            <div className="task__card">
               <CardItem
                    title={currentLanguage == 'kz' ? directions?.filter(category => category.id == directionId)[0]?.nameKaz : directions?.filter(category => category.id == directionId)[0]?.nameRus}
                    icon={categories?.filter(item => item.id == directions?.filter(category => category.id == directionId)[0]?.id)[0]?.icon}
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
                    №{taskIndex} {t('task1')}
                </div>
                <div className="task__text">
                    {task?.descriptionKaz}
                </div>
            </div>
            <div className="task__title">
                {t('participantResponse')}
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
                                            <>
                                                {
                                                    file.fileType == 'VIDEO' && <video src={ images.filter(image => image.id == file.id)[0]?.link } width={'50%'} controls autoPlay />
                                                }
                                                {
                                                    file.fileType == "IMAGE" && <img src={ images.filter(image => image.id == file.id)[0]?.link } width={'50%'} /> 
                                                }
                                            </>
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
                        {t('studentNotAnswer')}
                    </div>
                )
            }
            {
                ((task?.answers.length == 0) && role == Roles.participant) && (
                    <div className='task__answers'>
                        <div className="task__answers-images">
                            <div className="task__answers-image">
                                <img src={CameraIcon} alt="camera" />
                                <input type='file' onChange={(e) => firstImageHandler(e)} />
                                {
                                    (firstImage && firstType == "image") && <img className='task__answers-image-item' src={firstImage} />
                                }
                                {
                                    (firstImage && firstType == "video") && <video className='task__answers-image-item' src={firstImage} controls autoPlay  />
                                }
                            </div>
                            <div className="task__answers-image">
                                <img src={CameraIcon} alt="camera" />
                                <input type='file' onChange={(e) => secondImageHandler(e)} />
                                {
                                    (secondImage && secondType == "image") && <img className='task__answers-image-item' src={secondImage} />
                                }
                                {
                                    (secondImage && secondType == "video") && <video className='task__answers-image-item' src={secondImage} controls autoPlay  />
                                }
                            </div>
                        </div>
                        <div className="task__answers-input">
                            <div className="task__answers-input-title">
                                Эссе
                            </div>
                            <div className="task__answers-input-input">
                                <textarea name="" id="" placeholder={t('writeHere')} value={studentAnswer} onChange={e => setStudentAnswer(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="task__answers-button" onClick={sendStudentAnswerHandler}>
                            {t('send')}
                        </div>
                    </div>
                )
            }
            {
                (!(task?.answers.length == 0) && role == Roles.participant) && (
                    <div className='task__answers'>
                        {t('alreadyAnswer')}
                    </div>
                )
            }
            {
                (task?.answers.length > 0 && role == Roles.mentor && !(task?.answers?.filter(answer => (answer.approved == true ||  answer.approved == false)).length > 0)) && (
                    <div className="task__buttons">
                        <Button 
                            text={t('accept')}
                            onClick={approveAnswerHandler}
                        />
                        <Button 
                            text={t('decline')}
                            backgroundColor='#EE3232'
                            onClick={declineAnswerHandler}
                        />
                    </div>
                )
            }
            {
                (task?.answers.length > 0 && role == Roles.mentor && (task?.answers?.filter(answer => answer.approved == true).length > 0)) && (
                    <div className="task__success">
                        {t('accepted')}
                    </div>
                )
            }
             {
                (task?.answers.length > 0 && role == Roles.mentor && (task?.answers?.filter(answer => answer.approved == false).length > 0)) && (
                    <div className="task__error">
                        {t('declined')}
                    </div>
                )
            }
            {
                role == Roles.mentor &&
                    <div style={{marginTop:24}}>
                         <Button 
                            text={t('delete')}
                            backgroundColor={'#D70040'}
                            onClick={deleteTaskHandler}
                        />
                    </div>
            }
            
        </div>
    )
}

export default Task