import './Button.scss'

const Button = ({ text, onClick, backgroundColor, paddingY }) => {
  return (
    <div className='button' onClick={onClick} style={{background: backgroundColor, paddingTop: paddingY, paddingBottom: paddingY }}>
        {text}
    </div>
  )
}

export default Button