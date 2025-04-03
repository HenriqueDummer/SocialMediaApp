import clsx from 'clsx'
import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children, className}) => {
  return (
    <div className={clsx('bg-black border border-zinc-600 p-4 rounded-3xl', className)}>
      {children}
    </div>
  )
}

export default Container