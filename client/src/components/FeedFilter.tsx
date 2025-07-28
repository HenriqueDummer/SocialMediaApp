import Container from './ui/Container'
import { Link } from '@tanstack/react-router'

const FeedFilter = () => {
  return (
    <Container className="flex !p-0 overflow-hidden">
      <Link
        className={`flex-1 duration-150 hover:bg-white/10 flex justify-center items-center text-slate-400 font-semibold py-2`}
        activeProps={{
          className: "border-b-4 border-accent_purple !text-slate-300"
        }}
        to="/"
      >
        <button>For you</button>
      </Link>
      <Link
        className={`flex-1 duration-150 hover:bg-white/10 flex justify-center items-center text-slate-400 font-semibold py-2`}
        activeProps={{
          className: "border-b-4 border-accent_purple !text-slate-300"
        }}
        to="/following"
      >
        <button>Following</button>
      </Link>
    </Container>
  )
}

export default FeedFilter