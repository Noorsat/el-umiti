import { useParams } from 'react-router-dom';
import './ChatId.scss';


const ChatId = ({ setChatId }) => {
    let { chatId } = useParams();

    setChatId(chatId);

    return (
        <div>
            chatid
        </div>
    )
}

export default ChatId