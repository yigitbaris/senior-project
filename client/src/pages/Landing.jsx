import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import { Logo } from '../components'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Nöbet <span>Takip</span> Uygulaması
          </h1>
          <p>
            umut ipsum dolor sit amet consectetur adipisicing elit. Placeat
            eligendi natus enim, incidunt suscipit, blanditiis earum iure, eius
            in expedita maxime fugit laborum eveniet delectus eaque cumque ea
            possimus! Facere!
          </p>
          <Link to='/register' className='btn register-link'>
            Kaydol
          </Link>
          <Link to='/login' className='btn'>
            Giris / Demo Kullanıcı
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
