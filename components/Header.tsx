import { FaGithub } from "react-icons/fa"

const Header = () => {
  return (
    <header className="absolute w-full py-8 lg:py-2 px-4 md:px-8">
      <div className="max-w-[1080px] mx-auto flex justify-between items-center">
        <div>
          <span>Beelingo</span>
        </div>
        <div className="flex items-center gap-1">
          <a href="https://github.com/wildanam/beelingo" target="_blank" className="btn btn-outline flex items-center"><FaGithub size={16} /></a>
          <a href="https://wa.me/+14155238886" target="_blank" className="btn btn-primary">Try for free</a>
        </div>
      </div>
    </header>
  )
}

export default Header