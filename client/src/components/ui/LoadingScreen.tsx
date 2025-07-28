import LoadingComponent from "./LoadingComponent"

export const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-secondary_bg">
        <LoadingComponent text="Loading..." complementText="This can take a while at fist" />
    </div>
  )
}
