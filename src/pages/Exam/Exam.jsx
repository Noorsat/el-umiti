import './Exam.scss';
import CardItem from '../../components/CardItem/CardItem';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Button from '../../components/Button/Button';
import SuccessIcon from '../../assets/images/correct.svg';
import ArrowRight from '../../assets/images/arrow-right.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { categories } from '../../utils/categories';
import { useEffect, useState } from 'react';
import { getDirections, getTasksByUserId, getTasksByUserIdAndDirectionId } from '../../api/task.api';
import Loading from '../../components/Loading/Loading';

const Exam = ({ id : userId, selectedStudentId, role }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDirections(selectedStudentId).then((res) => {
      if (res.status === 200){
        setDirections(res.data);
      }
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  console.log(directions?.filter(category => category.id == id)[0]?.tasks)

  return (
    <div className='exam'>
      { loading && <Loading /> }
      <div className="exam__card">
        <CardItem
          title={directions?.filter(category => category.id == id)[0]?.nameKaz}
          icon={categories?.filter(item => item.id == directions?.filter(category => category.id == id)[0]?.id)[0]?.icon}
        />
      </div>
      <div className="exam__progress">
        <ProgressBar
          current={3}
          total={13}
        />
      </div>
      {
        role == 'MENTOR' && (
          <div className="exam__button">
            <Button 
              text="Тапсырма жүктеу"
              onClick={() => navigate(`/task-upload/${id}`)}
            />
          </div>
        )
      }   
      <div className="exam__tasks">
        <div className="exam__tasks-title">
          Тапсырмалар
        </div>
        <div className="exam__tasks-items">
          {
            directions?.filter(category => category.id == id)[0]?.tasks && directions?.filter(category => category.id == id)[0].tasks?.map((task, index) => (
              <Link to={`/task-check/${selectedStudentId}/${id}/${task.id}/${index+1}`} className="exam__tasks-item">
                <div className="exam__tasks-item-left">
                    <div className={`exam__tasks-item-icon ${task?.status == 1 ? 'exam__tasks-item-notpassed' : ''} ${task?.status == 3 ? 'exam__tasks-item-deadlinepassed' : ''} `}>
                      { task?.status == 2 && <img src={SuccessIcon} alt="" /> }
                    </div>
                    <div className="exam__tasks-item-title">
                      №{index+1} тапсырма
                    </div>
                </div>
                <div className="exam__tasks-item-right">
                  <div className="exam__tasks-item-count">
                  </div>
                  <div className="exam__tasks-item-arrow">
                    <img src={ArrowRight} alt="" />
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Exam;