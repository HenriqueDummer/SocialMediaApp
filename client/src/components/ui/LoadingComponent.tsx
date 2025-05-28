import Container from './Container'
import LoadingIcon from './LoadingIcon'

const LoadingComponent = ({text}: {text: string}) => {
  return (
    <Container className='flex flex-col justify-center items-center gap-3'>
      <h2 className='text-lg text-slate-200'>{text}</h2>
      <LoadingIcon />
    </Container>
  )
}

export default LoadingComponent