import Button from '../../components/Button/Button';
import './NewRequest.scss';

const NewRequest = () => {
  return (
    <div className='request'>
        <div className="request__select">
            <div className="request__select-title">
                Қатысушы
            </div>
            <div className="request__select-input">
                <select name="" id="">
                    <option selected hidden disabled>Тізімнен таңдаңыз</option>
                </select>
            </div>
        </div>
        <div className="request__textarea">
            <div className="request__textarea-title">
                Сұрағыңыз
            </div>
            <div className="request__select-textarea">
                <textarea name="" id="" placeholder='Текст'></textarea>
            </div>
        </div>
        <Button 
            text={"Жіберу"}
            paddingY={23}
        />
    </div>
  )
}

export default NewRequest