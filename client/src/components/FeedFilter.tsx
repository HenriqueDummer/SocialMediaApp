import Container from './ui/Container'
import { NavLink } from 'react-router-dom'

const FeedFilter = () => {
  return (
    <Container className="flex !p-0 overflow-hidden">
        <NavLink
          className={({isActive}) => `flex-1 duration-150 hover:bg-white/10 flex justify-center items-center text-slate-400 font-semibold py-2 ${isActive ? "border-b-4 border-accent_purple !text-slate-300" : ""}`}
          to="/"
        >
          <button>For you</button>
        </NavLink>
        <NavLink
          className={({isActive}) => `flex-1 duration-150 hover:bg-white/10 flex justify-center items-center text-slate-400 font-semibold py-2 ${isActive ? "border-b-4 border-accent_purple !text-slate-300" : ""}`}
          to="/following"
        >
          <button>Following</button>
        </NavLink>
      </Container>
  )
}

export default FeedFilter