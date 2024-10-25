import { FaSpinner } from 'react-icons/fa'; 

const Loading = () => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 9999, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const spinnerStyle = {
    fontSize: '3rem',
    color: 'white',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={overlayStyle}>
      <FaSpinner style={spinnerStyle} />
    </div>
  );
};

export default Loading;
