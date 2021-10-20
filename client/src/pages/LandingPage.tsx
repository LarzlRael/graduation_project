import React from 'react'
import { Header } from '../components/Header'

export const LandingPage = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/img/back4.png'})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            className="landingContainer"
        >
            <Header />

            <div className="info">
                <div className="title">
                    <h2>See the world</h2>
                </div>
                <div className="info-container">
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus illum labore vitae cumque. Ab ullam officia molestias blanditiis, ex aut quisquam.
                    </span>
                    <a className="buttonMap"
                    href="http://localhost:4000/maps" target="_blank" rel="noreferrer">Ir a mapa interactivo</a>
                </div>

            </div>
        </div >
    )
}
