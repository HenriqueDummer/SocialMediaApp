import clsx from 'clsx'
import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children, className}) => {
  return (
    <div className={clsx('bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 border border-zinc-600 p-4 rounded-3xl pr-8', className)}>
      {children}
    </div>
  )
}

export default Container