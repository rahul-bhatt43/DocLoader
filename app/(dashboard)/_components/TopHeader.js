import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TopHeader = ({sidebarToggler, sideBarEnabled}) => {
  return (
    <div className={`flex p-5 border-b items-center  ${!sideBarEnabled?"justify-end":"justify-between"}`} >
        {/* <AlignJustify className='md:hidden cursor-pointer' onClick={()=>sidebarToggler()} /> */}
        <Image src={'/logo.svg'} width={130} height={100} alt='logo' className={`${!sideBarEnabled?"hidden":null} `}   />
        <UserButton/>
    </div>
  )
}

export default TopHeader