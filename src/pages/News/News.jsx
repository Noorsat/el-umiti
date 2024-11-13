import './News.scss';
import News1 from '../../assets/images/news-1.png'
import { Roles } from '../../enums/Roles';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getNewsAll, getNewsByType, getNewsImage } from '../../api/news.api';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';

const News = ({ role }) => {
    const { t } = useTranslation(); 
    const navigate = useNavigate();

    const [news, setNews] = useState();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        if (role == Roles.admin){
            getNewsAll().then((res) => {
                if (res.status == 200){
                    setNews(res.data.map(n => {
                        return {
                            ...n,
                            newsFiles: n?.newsFiles?.map(file => {
                                return {
                                    ...file, 
                                    imageUrl: getImageHandler(file.id)
                                }
                            })
                        }
                    }));
                }
            }).finally(() => {
                setLoading(false);
            })
        }else{
            getNewsByType(role+"S").then((res) => {
                if (res.status == 200){
                    setNews(res.data.map(n => {
                        return {
                            ...n,
                            newsFiles: n?.newsFiles?.map(file => {
                                return {
                                    ...file, 
                                    imageUrl: getImageHandler(file.id)
                                }
                            })
                        }
                    }));
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [])

    const getImageHandler = async (imageId) => {
        if (imageId) {
            const imageUrl = await getNewsImage(imageId);

            setImages(prevImages => [...prevImages, {
                id: imageId,
                link: imageUrl
            }])    
        }
    }

    return (
        <div className='news'>
            {
                loading && <Loading />
            }
            {
                role == Roles.admin && (
                    <div style={{marginBottom: 24}}>
                        <Button 
                            text={t('addNews')}
                            onClick={() => navigate(`/news/create`)}
                        />
                    </div>
                )
            }
            <div className="news__items">
                {
                news && news?.map(n => (
                        <Link className="news__item" to={`/news/${n.id}`}>
                            <div className="news__item-wrapper">
                                <div className="news__item-img">
                                    <img src={images?.filter(image => image.id == n?.newsFiles[0]?.id)[0]?.link} alt="" />
                                </div>
                                <div className="news__item-title">
                                    {n.title}
                                </div>
                            </div>
                            <div className="news__item-date">
                                { moment(n.created).format("DD.MM.YYYY") }
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default News