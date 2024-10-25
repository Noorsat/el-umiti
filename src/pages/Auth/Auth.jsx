import './Auth.scss'
import TeacherIcon from '../../assets/images/auth-1.svg';
import StudentIcon from '../../assets/images/auth-2.svg';
import { useEffect } from 'react';

const Auth = ({ role, loginAccountHandler }) => {
    useEffect(() => {
        
    }, [role])

  return (
    <div className='auth'>
        <div className="auth__title">
            Өз таңдауыңызды жасап, <br></br>жалғастыру түймесін басыңыз
        </div>
        <div className="auth__cards">
            <div className="auth__card">
                <div className="auth__card-icon">
                    <img src={TeacherIcon} alt="teacher" />
                </div>
                <div className="auth__card-text">
                    Мен <br></br>тәлімгермін
                </div>
            </div>
            <div className="auth__card">
                <div className="auth__card-icon">
                    <img src={StudentIcon} alt="student" />
                </div>
                <div className="auth__card-text">
                    Мен <br></br>қатысушымын
                </div>
            </div>       
        </div>
        <div className="auth__button" onClick={loginAccountHandler}>
            Жалғастыру
        </div>
    </div>
  )
}

export default Auth