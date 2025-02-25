import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

const Rating = ({value, text, color}) => {
    const fullStar = Math.floor(value)
    const halfStar = value - fullStar > 0.5 ? 1 : 0;
    const emptyStar = 5 - fullStar - halfStar; 
  return (
    <div className="flex items-center">
        {[...Array(fullStar)].map((__dirname, index) => (
            <FaStar key ={index} className={`text-${color} ml-1`}/>
        ))}
        {halfStar === 1 && <FaStarHalfAlt className={`text-${color} ml-1`}/>}
        {[...Array(emptyStar)].map((__dirname, index) => (
            <FaRegStar key ={index} className={`text-${color} ml-1`}/>
        ))}
        <span className={`rating-text ml-[2rem] text-${color}`}>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
    color: "yellow-500"
}
export default Rating