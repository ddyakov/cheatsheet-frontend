import { Link, useLocation } from 'react-router-dom'

const Home = () => {
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
