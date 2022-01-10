import { Link } from 'react-router-dom'
import '../styles/ButtonIcons.css'
interface Props {
  to?: string
  icon?: string
  style: React.CSSProperties
}
export const ButtonIcon = ({ to = '/', icon = 'chevron-left',style }: Props) => {
  return (
    <div style={style}>
      <Link to={to} className="ButtonIcon">
        <i className={`fas fa-${icon}`}></i>
      </Link>
    </div>
  )
}
