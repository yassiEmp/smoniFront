import { useRef, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'

const FaqComponent = ({title, text}: {title:string, text: string}) => {

    const openRef = useRef<HTMLDivElement|null>(null)
    const [opened, setOpened] = useState<boolean>(false)

    const handleOpen = () => {
        setOpened(!opened)
    }

    return (
        <div className='lg:w-[843px] w-full bg-[#F8F9F9] rounded-[24px] px-4 md:px-[32px] py-4 md:py-[24px] mb-2 border border-primary'>
            <div onClick={()=>handleOpen()} className="w-full flex flex-row justify-between items-center cursor-pointer mb-1" ref={openRef}>
                <h1 className='text-primary text-[16px] md:text-[20px] font-bold'>{title}</h1>
                {!opened ? <HiPlus className='text-xl md:text-2xl' /> : <HiMinus className='text-xl md:text-2xl' /> }
            </div>
            <div 
                className={`${opened ? '' : 'h-[21px]'} text-[12px] md:text-[14px] text-[#6F7886] w-full md:w-11/12 overflow-clip text-clip [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80 [&_a]:transition-colors`}
                dangerouslySetInnerHTML={{ __html: text }}
            />
        </div>
    )
}

export default FaqComponent