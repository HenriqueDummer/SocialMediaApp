import Container from './Container'
import { NavLink } from 'react-router-dom'

const FeedFilter = () => {
  return (
    <Container className="flex">
        <NavLink
          className="flex-1 flex justify-center items-center text-slate-300 font-semibold"
          to="/"
        >
          <button>Home</button>
        </NavLink>
        <NavLink
          className="flex-1 flex justify-center items-center text-slate-400 font-semibold"
          to="/following"
        >
          <button>Following</button>
        </NavLink>
      </Container>
  )
}

export default FeedFilter