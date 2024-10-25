import { Link } from 'react-router-dom';
import './CandidatesItem.scss';

const CandidatesItem = ({ name, iin, type, id }) => {
  return (
        <Link className="candidates__item" to={`/candidate/${id}`}>
            <div className="candidates__item-name">
                {name}
            </div>
            {
                iin && (
                    <div className="candidates__item-iin">
                        ИИН: {iin}
                    </div>
                )
            }
            <div className={`candidates__item-dot ${type}`}></div>
        </Link>
    )
}

export default CandidatesItem