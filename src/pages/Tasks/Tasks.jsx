import { useNavigate } from 'react-router-dom';
import CardItem from '../../components/CardItem/CardItem';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { categories } from '../../utils/categories';
import './Tasks.scss';

const Tasks = () => {
  const navigate = useNavigate();

  return (
    <div className='tasks'>
      <div className="tasks__progress">
        <ProgressBar 
          current={12}
          total={50}
        />
      </div>
      <div className="tasks__categories">
        {
            categories.map(category => (
                <CardItem 
                    title={category.title}
                    icon={category.icon}
                    onClick={() => navigate(`/exam/${category.id}`)}
                /> 
            ))
        }
      </div>
    </div>
  )
}

export default Tasks