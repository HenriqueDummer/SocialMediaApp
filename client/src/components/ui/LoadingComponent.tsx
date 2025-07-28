import Container from './Container'
import LoadingIcon from './LoadingIcon'

const LoadingComponent = ({text, complementText}: {text: string, complementText?: string}) => {
  return (
    <Container className='flex flex-col justify-center items-center gap-3 bg-secondary_bg'>
      <p className='text-lg text-slate-200'>{text}</p>
      <LoadingIcon />
      {complementText && <p className='text-base text-slate-300'>{complementText}</p>}
    </Container>
  )
}

export default LoadingComponent