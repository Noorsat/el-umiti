import './Button.scss'

const Button = ({ text, onClick, backgroundColor, paddingY, disabled }) => {
  return (
    <div className='button' onClick={onClick} style={{background: backgroundColor, paddingTop: paddingY, paddingBottom: paddingY }}>
        {text}
    </div>
  )
}

export default Button