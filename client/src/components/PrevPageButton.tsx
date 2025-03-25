import Container from './ui/Container';
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const PrevPageButton = ({title}: {title: string}) => {
  const navigate = useNavigate();
  return (
    <Container className="w-full !p-1 flex items-center gap-4 bg-dark_bg">
        <Button
          onClick={() => navigate(-1)}
          className="w-10 bg-transparent aspect-square rounded-full"
        >
          <IoIosArrowBack className='scale-125' />
        </Button>
        <h1 className=" text-slate-200 text-lg font-semibold">{title}</h1>
      </Container>
  )
}

export default PrevPageButton