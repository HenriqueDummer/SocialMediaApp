import Following from "./Following"
import WhoToFollow from "./WhoToFollow"

const RightSideBar = () => {

  return (
    <div className="w-1/4">
      <WhoToFollow />
      <Following />
    </div>
  )
}

export default RightSideBar