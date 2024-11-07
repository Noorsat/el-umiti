import './BottomPanel.scss';
import TasksIcon from '../../assets/images/panel-1.svg';
import MainPageIcon from '../../assets/images/panel-2.svg';
import AccountIcon from '../../assets/images/panel-3.svg';
import { Link, useLocation } from 'react-router-dom';
import { Roles } from '../../enums/Roles';

const BottomPanel = ({ role }) => {
    return (
        <div className='bottomPanel'>
            <div className="bottomPanel__items">
                <Link to={(role == Roles.admin) ? `/admin-mentors` : (role == Roles.mentor ) ? `/candidates` : `/tasks`} className="bottomPanel__item">
                    <div className="bottomPanel__item-icon">
                        <img src={TasksIcon} alt="tasks" />
                    </div>
                    <div className="bottomPanel__item-title">
                        { (role == Roles.admin || role == Roles.mentor ) ? 'Қатысушылар' : 'Тапсырмалар' }
                    </div>
                </Link>
                <Link to={`/main`} className="bottomPanel__item">
                    <div className="bottomPanel__item-icon">
                        <img src={MainPageIcon} alt="main" />
                    </div>
                    <div className="bottomPanel__item-title">
                        Басты бет
                    </div>
                </Link>
                <Link to={`/account`} className="bottomPanel__item">
                    <div className="bottomPanel__item-icon">
                        <img src={AccountIcon} alt="account" />
                    </div>
                    <div className="bottomPanel__item-title">
                        Жеке кабинет
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BottomPanel