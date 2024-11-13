import './CreateNews.scss';
import CameraIcon from '../../assets/images/camera.svg';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { createNews, uploadFilesToNews } from '../../api/news.api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading/Loading';

const CreateNews = ({ id }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [news, setNews] = useState({
        text: "",
        createdById: Number(id),
        title: "",
        type: "ALL"
    });
    const [file, setFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileInputHandler = (e) => {
        const file = e.target.files[0];

        if (file){
            setFileImage(URL.createObjectURL(file));
            setFile(file);
        }
    }

    const createNewsHandler = () => {
        if (news.text && news.title && news.type && news.createdById && file){
            setLoading(true);

            createNews(news).then((res) => {
                if (res.status == 200){
                    const formData = new FormData();
                    formData.append('files', file);

                    uploadFilesToNews(res.data.id, formData).then((res) => {
                        if (res.status == 200){
                            navigate(`/news`);
                        }
                    })
                }
            }).finally((res) => {
                setLoading(false);
            })
        }else{
            alert("Заполните поля")
        }
    }

    return (
        <div className='createNews'>
            { loading && <Loading /> }
            <div className="createNews__image">
                <input type="file" onChange={fileInputHandler} accept="image/*" />
                <img className={`${fileImage ? 'uploaded' : ''}`} src={fileImage ? fileImage : CameraIcon} />        
            </div>
            <div className="createNews__inputs">
                <div className="createNews__input">
                    <div className="createNews__input-title">
                        {t('title')}
                    </div>
                    <div className="createNews__input-input">
                        <input type="text" placeholder={t('title')} value={news.title} onChange={e => setNews({...news, title: e.target.value})} />
                    </div>
                </div>
                <div className="createNews__input">
                    <div className="createNews__input-title">
                        {t('type')}
                    </div>
                    <div className="createNews__input-select">
                        <select name="" id="" value={news.type} onChange={e => setNews({...news, type: e.target.value })}>
                            <option value="ALL">{t('toEveryone')}</option>
                            <option value="MENTORS">{t('toMentors')}</option>
                            <option value="PARTICIPANTS">{t('toParticipants')}</option>    
                        </select>                    
                    </div>
                </div>
                <div className="createNews__input">
                    <div className="createNews__input-title">
                        Текст
                    </div>
                    <div className="createNews__input-textarea">
                        <textarea name="" id="" placeholder='Осы жерге жазыңыз' value={news.text} onChange={e => setNews({...news, text: e.target.value})}></textarea>
                    </div>
                </div>
            </div>
            <div className="createNews__add">
                <Button 
                    text={'Сақтау'}
                    onClick={createNewsHandler}
                />
            </div>
        </div>
    )
}

export default CreateNews;