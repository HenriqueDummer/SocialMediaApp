import clsx from 'clsx'
import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children, className}) => {
  return (
    <div className={clsx('border border-zinc-600 p-4 rounded-xl lg:rounded-3xl bg-black/90', className)}>
      {children}
    </div>
  )
}

export default Container