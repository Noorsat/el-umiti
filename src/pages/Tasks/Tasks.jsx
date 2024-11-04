import { useNavigate } from 'react-router-dom';
import CardItem from '../../components/CardItem/CardItem';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { categories } from '../../utils/categories';
import './Tasks.scss';
import { useEffect, useState } from 'react';
import { getDirections } from '../../api/task.api';
import Loading from '../../components/Loading/Loading';

const Tasks = ({ id }) => {
  const navigate = useNavigate();

  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getDirections(id).then((res) => {
      if (res.data){
        setDirections(res.data);
      }
      setLoading(false);
    })
  }, [])

  return (
    <div className='tasks'>
      {
        loading && <Loading />
      }
      <div className="tasks__progress">
        <ProgressBar 
          current={12}
          total={50}
        />
      </div>
      <div className="tasks__categories">
        {
            directions && directions.map((directory, i) => (
                <CardItem 
                    title={directory?.nameKaz}
                    icon={ categories.filter((category, index) => index == i)[0]?.icon }
                    onClick={() => navigate(`/exam/${directory?.id}`)}
                /> 
            ))
        }
      </div>
    </div>
  )
}

export default Tasks