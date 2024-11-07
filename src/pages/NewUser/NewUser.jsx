import { useState } from 'react';
import './NewUser.scss';
import { Roles } from '../../enums/Roles';
import { createUser } from '../../api/account.api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const NewUser = () => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        fio: "",
        email: "",
        address: "",
        workPlace: "",
        phoneNumber: "",
        dateOfBirth: "",
        roles: [
          {
            id: 2,
            name: Roles.participant
          }
        ]
    });
    const [loading, setLoading] = useState(false);

    const createUserHandler = () => {
        setLoading(true);

        createUser(newUser).then((res) => {
            if (res.status == 200){
                navigate(`/admin-mentors`);
            }
        }).catch((err) => {
            alert("Не получилось создать юзера");
        }).finally(() => {
            setLoading(false);
        })
    }

  return (
    <div className='newUser'>
        { loading && <Loading /> }
        <div className="newUser__title">
            Тіркелу
        </div>
        <div className="newUser__form">
            <div className="newUser__input">
                <div className="newUser__input-label">
                    Аты-жөніңіз
                </div>
                <div className="newUser__input-input">
                    <input type="text" placeholder='Аты-жөніңізді жазыңыз' value={newUser?.fio} onChange={(e) => setNewUser({...newUser, fio: e.target.value }) } />
                </div>
            </div>
        </div>
        <div className="newUser__select">
            <div className="newUser__select-label">
                Аудан
            </div>
            <div className="newUser__select-select">
                <select name="" id="">
                    <option value="" selected disabled hidden>Аудан таңдалмады</option>
                </select>
            </div>
        </div>
        <div className="newUser__select">
            <div className="newUser__select-label">
                Білім беру ұйымы
            </div>
            <div className="newUser__select-select">
                <select name="" id="">
                    <option value="" selected disabled hidden>Ұйым таңдалмады</option>
                </select>
            </div>
        </div>
        <div className="newUser__form">
            <div className="newUser__input">
                <div className="newUser__input-label">
                    Туған күніңіз
                </div>
                <div className="newUser__input-input">
                    <input type="date" placeholder='-- -- ---' value={newUser?.dateOfBirth} onChange={(e) => setNewUser({...newUser, dateOfBirth: e.target.value }) } />
                </div>
            </div>
        </div>
        <div className="newUser__form">
            <div className="newUser__input">
                <div className="newUser__input-label">
                    Электронды поштаңыз
                </div>
                <div className="newUser__input-input">
                    <input type="Email" placeholder='Email' value={newUser?.address} onChange={(e) => setNewUser({...newUser, email: e.target.value })} />
                </div>
            </div>
        </div>
        <div className="newUser__form">
            <div className="newUser__input">
                <div className="newUser__input-label">
                    Телефон нөміріңіз
                </div>
                <div className="newUser__input-input">
                    <input type="Email" placeholder='+7 7' value={newUser?.phoneNumber} onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value })} />
                </div>
            </div>
        </div>
        <div className="newUser__form">
            <div className="newUser__input">
                <div className="newUser__input-label">
                    Жұмыс орны
                </div>
                <div className="newUser__input-input">
                    <input type="Email" placeholder='Қайда жұмыс жасайсыз?' value={newUser?.workPlace} onChange={(e) => setNewUser({...newUser, workPlace: e.target.value })}  />
                </div>
            </div>
        </div>
        <div className="newUser__button" onClick={createUserHandler}>
            Қосу
        </div>
    </div>
  )
}

export default NewUser