import './NewsItem.scss';
import NewsHorizontal from '../../assets/images/news-horizontal.png';

const NewsItem = () => {
  return (
    <div className='newsItem'>
        <div className="newsItem__img">
            <img src={NewsHorizontal} alt="" />
        </div>
        <div className="newsItem__title">
            Елімізде атқарылып жатқан қоғамдық іс-шаралар
        </div>
        <div className="newsItem__date">
            11.09.2024
        </div>
        <div className="newsItem__text">
            Lorem Ipsum – басып шығаруда және веб-дизайнда жиі қолданылатын жалған мәтін. Лорем Ипсум 16 ғасырдың басынан бері саланың стандартты жалған мәтіні болды. Сол кездегі аты аталмаған принтер тип үлгілерін шығару үшін Lorem Ipsum көмегімен түр өлшемдері мен пішіндерінің үлкен жинағын жасады. Lorem Ipsum бес ғасыр бойы айтарлықтай өзгеріссіз сәтті өмір сүріп қана қоймай, электронды дизайнға да енді. Ол қазіргі уақытта 1960-шы жылдары Lorem Ipsum үлгі парақтары бар Letraset парақтарын басып шығару арқылы және соңғы уақытта үлгілерінде Lorem Ipsum пайдаланатын Aldus PageMaker сияқты электронды теру бағдарламаларымен танымал болды.
        </div>
    </div>
  )
}

export default NewsItem