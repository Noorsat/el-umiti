import { useTranslation } from 'react-i18next';
import './About.scss';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className='about'>
            <div className="main__chat">
                <div className="main__chat-title">
                    {t('descr')}
                </div>
            </div>
            <div className="about__text">
                {t('fullDescr')}
            </div>
        </div>
    )
}

export default About;