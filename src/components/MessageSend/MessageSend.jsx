import './MessageSend.scss';
import UploadIcon from '../../assets/images/upload.svg';
import SendIcon from '../../assets/images/send.svg';

const MessageSend = () => {
  return (
    <div className='messageSend'>
        <div className="messageSend__upload">
            <img src={UploadIcon} alt="" />
        </div>
        <div className="messageSend__input">
            <input type="text" placeholder='Сообщение' />
        </div>
        <div className="messageSend__send">
            <img src={SendIcon} alt="" />
        </div>
    </div>
  )
}

export default MessageSend