import clsx from 'clsx'
import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children, className}) => {
  return (
    <div className={clsx('border border-white/20 p-4 rounded-xl lg:rounded-3xl bg-secondary_bg', className)}>
      {children}
    </div>
  )
}

export default Container