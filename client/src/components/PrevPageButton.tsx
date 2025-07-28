import Container from './ui/Container';
import { Button } from './ui/button'
import { useNavigate } from '@tanstack/react-router'
import { IoIosArrowBack } from "react-icons/io";

const PrevPageButton = ({ title }: { title: string }) => {
  return (
    <Container className="w-full !p-1 flex items-center gap-4 bg-black">
      <Button
        onClick={() => {
          window.history.back()
        }}
        className="w-10 bg-transparent aspect-square rounded-full"
      >
        <IoIosArrowBack className='scale-125' />
      </Button>
      <h1 className=" text-slate-200 text-lg font-semibold">{title}</h1>
    </Container>
  )
}

export default PrevPageButton