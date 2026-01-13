
import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
  const location = useLocation()
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">404 - Page Not Found</h1>
      <p>{location.pathname}</p>
      <Link to="/" className="text-blue-500">Go Home</Link>
    </div>
  )
}
