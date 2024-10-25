import './Main.scss';
import InfoIcon from '../../assets/images/info.svg';
import NewsIcon from '../../assets/images/news.svg';
import CallCenterIcon from '../../assets/images/headphone.svg';
import { useEffect } from 'react';
import CandidatesItem from '../../components/CandidatesItem/CandidatesItem';
import { Roles } from '../../enums/Roles';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import MentorIcon from '../../assets/images/mentor.svg';
import ParticipiantIcon from '../../assets/images/participant.svg';

const Main = ({ role, setIsLogin, user }) => {

    useEffect(() => {
        setIsLogin(true);
    }, [])

    return (
        <div className='main' style={{ padding: '0 16px'}}>
            <div className="main__chat">
                <div className="main__chat-title">
                    “Ел үміті” медаліне<br></br> үміткерлер чат-боты
                </div>
            </div>
            <div className="main__about">
                <div className="main__about-content">
                    <div className="main__about-icon">
                        <img src={InfoIcon} alt="info" />
                    </div>
                    <div className="main__about-title">
                        Жоба жайлы
                    </div>
                </div>
            </div>
            {
                role == Roles.participant && (
                    <CandidatesItem
                        name={user?.full_name}
                        iin={user?.iin}
                    />
                )
            }
            {
                role == Roles.participant && (
                    <div style={{marginBottom: 42}}>
                        <ProgressBar
                            current={12}
                            total={50}
                        />
                    </div>
                )
            }
            <div className="main__items">
                <div className="main__item">
                    <div className="main__item-icon">
                        <img src={NewsIcon} alt="news" />
                    </div>
                    <div className="main__item-title">
                        Жаңалықтар
                    </div>
                </div>
                <div className="main__item">
                    <div className="main__item-icon">
                        <img src={CallCenterIcon} alt="call-center-icon" />
                    </div>
                    <div className="main__item-title">
                        Тех. қолдау
                    </div>
                </div>
            </div>
            {
                role == Roles.admin && (
                    <div className='main__admin-items'>
                        <div className="main__admin-item">
                            <div className="main__admin-item-img">
                                <img src={MentorIcon} alt="" />
                            </div>
                            <div className="main__admin-item-title">
                                Тәлімгер
                            </div>
                        </div>
                        <div className="main__admin-item">
                            <div className="main__admin-item-img">
                                <img src={ParticipiantIcon} alt="" />
                            </div>
                            <div className="main__admin-item-title">
                                Қатысушы
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
  )
}

export default Main;