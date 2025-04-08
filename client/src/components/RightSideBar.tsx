import Following from "./Following"
import WhoToFollow from "./WhoToFollow"

const RightSideBar = () => {

  return (
    <div className="w-1/4 hidden 2xl:inline">
      <WhoToFollow />
      <Following />
    </div>
  )
}

export default RightSideBar