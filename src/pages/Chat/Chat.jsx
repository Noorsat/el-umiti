import './Chat.scss';
import DocsIcon from '../../assets/images/docs.svg';
import DownloadIcon from '../../assets/images/download.svg';
import { useLocation } from 'react-router-dom';

const Chat = () => {
    return (
        <div className='chat'>
            <div className="chat__date">
                Cегодня
            </div>
            <div className="chat__message">
                <div className="chat__message left">
                    <div className="chat__message-title">
                        Добрый день! <br></br>
                        Чем мы можем помочь?
                    </div>
                    <div className="chat__message-date">
                        15:00    
                    </div>
                </div>
                <div className="chat__message right">
                    <div className="chat__message-title">
                        Здравствуйте!<br></br>
                        Вы можете отправить<br></br>
                        справку?
                    </div>
                    <div className="chat__message-date">
                        15:00    
                    </div>
                </div>
                <div className="chat__message left">
                    <div className="chat__message-title">
                        Да, конечно
                    </div>
                    <div className="chat__message-date">
                        15:00    
                    </div>
                </div>
                <div className="chat__message left docs">
                    <div className="chat__docs">
                        <div className="chat__docs-img">
                            <img src={DocsIcon} alt="" />
                        </div>
                        <div className="chat__docs-content">
                            <div className="chat__docs-name">
                                Справка_TFG.pdf
                            </div>
                            <div className="chat__docs-size">
                                258 kb
                            </div>
                        </div>
                        <div className="chat__docs-download">
                            <img src={DownloadIcon} alt="" />
                        </div>
                    </div>
                    <div className="chat__message-title">
                        Вот ваша справка о <br></br>задолженности
                    </div>
                    <div className="chat__message-date">
                        15:00    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat