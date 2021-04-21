// React imports A-Z
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
// Local imports A-Z
import './Home.scss'

const Home: FC = () => {
  const location = useLocation()

  return (
    <>
      <h1>Home</h1>
      <Link className='Home' to={{ pathname: `/steps/name/`, state: { from: location.pathname } }}>
        Get started
      </Link>
    </>
  )
}

export default Home
