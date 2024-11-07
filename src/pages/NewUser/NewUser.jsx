import { useEffect, useState } from 'react';
import './NewUser.scss';
import { Roles } from '../../enums/Roles';
import { createUser, defineMentorToUser, getAddresses } from '../../api/account.api';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { getMentors } from '../../api/users.api';

const NewUser = () => {
    const navigate = useNavigate();
    const { mentorId } = useParams();

    const [newUser, setNewUser] = useState({
        fio: "",
        email: "",
        address: "",
        workPlace: "",
        phoneNumber: "",
        organization: "",
        dateOfBirth: "",
        roles: [
          {
            id: 2,
            name: Roles.participant
          }
        ]
    });
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selectedMentorId, setSelectedMentorId] = useState(mentorId || null);

    useEffect(() => {
        setLoading(true);

        getAddresses().then((res) => {
            if (res.status == 200){
                setAddresses(res.data);
            }
        }).catch(() => {
            alert("Не получилось взять адресы")
        }).finally(() => {
            setLoading(false);
        })

        getMentors().then(res => {
            setMentors(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const createUserHandler = () => {
        setLoading(true);

        createUser(newUser).then((res) => {
            if (res.status == 200){
                defineMentorToUser(res.data.id, selectedMentorId).then((res) => {
                    if (res.status == 200){
                        navigate(mentorId ? `/candidates/${mentorId}` : `/admin-mentors`);
                    }
                })
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
                <select name="" id="" value={newUser?.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value }) }>
                    <option value="" selected disabled hidden>Аудан таңдалмады</option>
                    {
                        addresses && addresses.map(address => (
                            <option value={address}>{ address }</option>
                        ))
                    }
                </select>
            </div>
        </div>
        <div className="newUser__form">
            <div className="newUser__input">
                <div className="newUser__input-label">
                    Білім беру ұйымы
                </div>
                <div className="newUser__input-input">
                    <input type="text" placeholder='Білім беру ұйымы' value={newUser?.organization} onChange={(e) => setNewUser({...newUser, organization: e.target.value }) } />
                </div>
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
                    <input type="text" placeholder='Email' value={newUser?.email} onChange={(e) => setNewUser({...newUser, email: e.target.value })} />
                </div>
            </div>
        </div>
        <div className="newUser__form">
            <div className="newUser__input">
                <div className="newUser__input-label">
                    Телефон нөміріңіз
                </div>
                <div className="newUser__input-input">
                    <input type="text" placeholder='+7 7' value={newUser?.phoneNumber} onChange={(e) => setNewUser({...newUser, phoneNumber: e.target.value })} />
                </div>
            </div>
        </div>
        <div className="newUser__form">
            <div className="newUser__input">
                <div className="newUser__input-label">
                    Жұмыс орны
                </div>
                <div className="newUser__input-input">
                    <input type="text" placeholder='Қайда жұмыс жасайсыз?' value={newUser?.workPlace} onChange={(e) => setNewUser({...newUser, workPlace: e.target.value })}  />
                </div>
            </div>
        </div>
        {
            !mentorId && (
                <div className="newUser__select">
                    <div className="newUser__select-label">
                        Тәлімгер
                    </div>
                    <div className="newUser__select-select">
                        <select name="" id="" value={selectedMentorId} onChange={(e) => setSelectedMentorId(e.target.value) }>
                            <option value="" selected disabled hidden>Тәлімгер таңдалмады</option>
                            {
                                mentors && mentors.map(mentor => (
                                    <option value={mentor.id}>{ mentor?.fio }</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            )
        }
       
        <div className="newUser__button">
            <button onClick={createUserHandler} disabled={!Object.values(newUser).every((value) => value !== '')}>
                Қосу
            </button>
        </div>
    </div>
  )
}

export default NewUser