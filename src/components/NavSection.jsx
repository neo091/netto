import { Link } from 'react-router-dom'
import { IconChevronLeft } from '../assets/Icons'

function NavSection({ label }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <Link to="/" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
        <IconChevronLeft size={8} />
      </Link>
      <h1 className="text-2xl font-bold">{label || 'text'}</h1>
    </div>
  )
}

export default NavSection