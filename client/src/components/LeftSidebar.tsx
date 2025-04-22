import NavBar from "./NavBar";
import Container from "./ui/Container";

const LeftSideBar = () => {
  return (
    <>
      <div className="hidden lg:inline w-1/4 self-start  min-w-[20rem] xl:min-w-[26rem]">
        <NavBar />
      </div>

      <div className="absolute lg:hidden -bottom-0 w-full sm:w-auto sm:static sm:inline ">
        <Container className="!px-0 !py-1 rounded-none sm:!px-2 sm:rounded-lg !bg-black border-0 border-t sm:!border border-slate-700">
          <NavBar />
        </Container>
      </div>
    </>
  );
};

export default LeftSideBar;
