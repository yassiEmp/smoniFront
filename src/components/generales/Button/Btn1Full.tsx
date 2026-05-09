import { motion } from "motion/react";
import { useNavigate } from "react-router";

const Btn1Full = ({text,uri}: {text: string, uri?:string}) => {
    const navigate = useNavigate();

    const buttonVariants = {
        hover: {
          backgroundColor: '#fcf492dd',
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        },
    };

    const handleClick = () => {
        if (uri) {
            navigate(uri);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <motion.button 
            onClick={handleClick}
            variants={buttonVariants} 
            whileHover="hover" 
            className="bg-white text-primary px-5 py-3 rounded-full w-full"
        >
            {text}
        </motion.button>
    )
}

export default Btn1Full