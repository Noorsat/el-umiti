import './ProgressBar.scss';

const ProgressBar = ({ current, total }) => {
  return ( 
    <div className='progress'>
        <div className="progress__title">
            {current}/{total}
        </div>
        <div className="progress__bar">
            <div className="progress__bar-progress" style={{width: current * 100 / total+"%"}}></div>
        </div>
    </div>
  )
}

export default ProgressBar;