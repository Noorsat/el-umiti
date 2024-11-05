import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Language from './pages/Language/Language';
import Auth from './pages/Auth/Auth';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';
import BottomPanel from './components/BottomPanel/BottomPanel';
import Account from './pages/Account/Account';
import Candidates from './pages/Candidates/Candidates';
import Candidate from './pages/Candidate/Candidate';
import Exam from './pages/Exam/Exam';
import Task from './pages/Task/Task';
import TaskUpload from './pages/TaskUpload/TaskUpload';
import TechHelp from './pages/TechHelp/TechHelp';
import Chat from './pages/Chat/Chat';
import MessageSend from './components/MessageSend/MessageSend';
import NewRequest from './pages/NewRequest/NewRequest';
import RequestSuccess from './pages/RequestSuccess/RequestSuccess';
import News from './pages/News/News';
import NewsItem from './pages/NewsItem/NewsItem';
import AdminLang from './pages/AdminLang/AdminLang';
import Tasks from './pages/Tasks/Tasks';
import { Roles } from './enums/Roles';
import About from './pages/About/About';
import AdminMentors from './pages/AdminMentors/AdminMentors';


function App() {
  const navigate = useNavigate();

  const page = location.pathname.split("/")[1];

  const [isLogin, setIsLogin] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [user, setUser] = useState(null);

  const hideBottomPanelPages = ['chat', 'request-success'];
  const hideHeaderPages = ['request-success']

  const loginAccountHandler = () => {
    setIsLogin(true);
    navigate('/main');
  }

  useEffect(() => {
    if (role === Roles.admin){
      navigate("/admin/lang");
    }else{
      navigate('/');
    }
  }, [role])

  return (
    <div className="App">
      {(isLogin && !hideHeaderPages.includes(page)) && <Header />} 
      <div className={isLogin ? 'main' : ''}>
        <Routes>
          <Route index element={<Language setChatId={setChatId} setRole={setRole} setId={setId} id={id} chatId={chatId} setUser={setUser} />} />
          <Route path='auth' element={<Auth role={role} loginAccountHandler={loginAccountHandler} />} />
          <Route path='main' element={<Main role={role} setIsLogin={setIsLogin} user={user} />} />
          <Route path='account' element={<Account id={id} chatId={chatId} />} />
          <Route path='candidates' element={<Candidates chatId={chatId} id={id}  />} />
          <Route path='/about' element={<About /> } />
          <Route path='/tasks' element={<Tasks id={id}/>} />
          <Route path='/candidate/:id' element={<Candidate role={role} setSelectedStudentId={setSelectedStudentId} />} />
          <Route path='/exam/:id' element={<Exam id={id} selectedStudentId={selectedStudentId || id} role={role} />} />
          <Route path='/task-check/:studentId/:directionId/:taskId/:taskIndex' element={<Task chatId={chatId} role={role} />} />
          <Route path='/task-upload/:id' element={<TaskUpload chatId={chatId} id={id} selectedStudentId={selectedStudentId} />} />
          <Route path='/tech-help' element={<TechHelp />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/new-request' element={<NewRequest />} />
          <Route path='/request-success' element={<RequestSuccess />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:id' element={<NewsItem />} />
          <Route path='/admin/lang' element={<AdminLang id={id} chatId={chatId} setId={setId} setUser={setUser} setRole={setRole} />}  />
          <Route path='/admin-mentors' element={<AdminMentors />} />
        </Routes>
      </div>
      {
        page === 'chat' && (
          <MessageSend />
        )
      }
      {(isLogin && !hideBottomPanelPages.includes(page)) && <BottomPanel role={role} />}
    </div>
  );
}

export default App;
