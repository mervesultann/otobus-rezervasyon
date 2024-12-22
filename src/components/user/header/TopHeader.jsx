
import { FaXTwitter, FaInstagram, FaPhone  } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { Link } from "react-router-dom"

const TopHeader = () => {
  return (
    <div className= "  bg-neutral-400 h-auto w-full flex flex-col justify-around items-center md:flex-row gap-2 py-2 ">

<div className="flex justify-center items-center ">
<p className="text-white text-center">Kolay ve hızlı bilet alma imkanı.</p>
</div>

<div className="flex justify-center items-center gap-5">
<Link to="/">
              {" "}
              <FaXTwitter  className="text-white size-6 hover:text-blue-500" />
            </Link>
            <Link to="/">
              {" "}
              <FaInstagram className="text-white size-6 hover:text-blue-500 " />
            </Link>
            <Link to="/">
              {" "}
              <LuFacebook className="text-white size-6 hover:text-blue-500 " />
            </Link>
            
         <Link to="tel:05321234567"> <p className="text-white text-center flex items-center gap-2 border-l-2 border-white pl-5 hover:text-orange-300"> <FaPhone className="size-5" /> 0532 123 45 67</p></Link>
          
          </div>

    </div>
  )
}

export default TopHeader