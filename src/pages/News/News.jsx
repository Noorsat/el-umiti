import './News.scss';
import News1 from '../../assets/images/news-1.png'
import News2 from '../../assets/images/news-2.png'
import News3 from '../../assets/images/news-3.png'

const News = () => {
  return (
    <div className='news'>
        <div className="news__items">
            <div className="news__item">
                <div className="news__item-wrapper">
                    <div className="news__item-img">
                        <img src={News1} alt="" />
                    </div>
                    <div className="news__item-title">
                        Елімізде атқарылып жатқан қоғамдық іс-шаралар
                    </div>
                </div>
                <div className="news__item-date">
                    11.09.2024
                </div>
            </div>
            <div className="news__item">
                <div className="news__item-wrapper">
                    <div className="news__item-img">
                        <img src={News2} alt="" />
                    </div>
                    <div className="news__item-title">
                        Елімізде атқарылып жатқан қоғамдық іс-шаралар
                    </div>
                </div>
                <div className="news__item-date">
                    11.09.2024
                </div>
            </div>
            <div className="news__item">
                <div className="news__item-wrapper">
                    <div className="news__item-img">
                        <img src={News3} alt="" />
                    </div>
                    <div className="news__item-title">
                        Елімізде атқарылып жатқан қоғамдық іс-шаралар
                    </div>
                </div>
                <div className="news__item-date">
                    11.09.2024
                </div>
            </div>
        </div>
    </div>
  )
}

export default News