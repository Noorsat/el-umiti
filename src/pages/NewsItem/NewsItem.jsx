import './NewsItem.scss';
import NewsHorizontal from '../../assets/images/news-horizontal.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsImage, getNewsItem } from '../../api/news.api';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';

const NewsItem = () => {
    const { id } = useParams();

    const [news, setNews] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getNewsItem(id).then((res) => {
            if (res.status == 200){
                setNews(res.data);
                getImageHandler(res.data?.newsFiles[0]?.id)
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const getImageHandler = async (imageId) => {
        if (imageId) {
            const imageUrl = await getNewsImage(imageId);

            setImage(imageUrl);
        }
    }

    return (
        <div className='newsItem'>
            { loading && <Loading />}
            {
                news && (
                    <>
                        <div className="newsItem__img">
                            <img src={image} alt="" />
                        </div>
                        <div className="newsItem__title">
                            { news?.title }
                        </div>
                        <div className="newsItem__date">
                            {moment(news?.created).format("DD.MM.YYYY")}
                        </div>
                        <div className="newsItem__text">
                            { news?.text }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default NewsItem