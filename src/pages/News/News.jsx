import './News.scss';
import News1 from '../../assets/images/news-1.png'
import News2 from '../../assets/images/news-2.png'
import News3 from '../../assets/images/news-3.png'
import { Roles } from '../../enums/Roles';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';

const News = ({ role }) => {
    const { t } = useTranslation(); 

  return (
    <div className='news'>
        {
            role == Roles.admin && (
                <div style={{marginBottom: 24}}>
                    <Button 
                        text={t('addNews')}
                    />
                </div>
            )
        }
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