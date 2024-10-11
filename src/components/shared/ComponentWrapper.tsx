import { ReactNode } from "react"

const ComponentWrapper = ({children}: {children: ReactNode}) => {
  return (
    <div className="px-2 xl:px-0 max-w-screen-xl mx-auto">
      {children}
    </div>
  )
}

export default ComponentWrapper