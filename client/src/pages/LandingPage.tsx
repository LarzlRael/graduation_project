import { Header } from '../components/Header'
import { SwitchTheme } from '../components/public/SwitchTheme'

export const LandingPage = () => {
  return (
    <div className="landingContainer">
      <Header />
      <div className="info">
        <div className="title">
          <h2>See the world</h2>
        </div>
        <div className="info-container">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus illum labore vitae cumque. Ab ullam officia molestias
            blanditiis, ex aut quisquam.
          </span>
          <a
            className="buttonMap"
            href={`${process.env.REACT_APP_SERVER_URL}/maps`}
            target="_blank"
            rel="noreferrer"
          >
            Ir a mapa interactivo
            
          </a>
        </div>

        <SwitchTheme />
      </div>
    </div>
  )
}
