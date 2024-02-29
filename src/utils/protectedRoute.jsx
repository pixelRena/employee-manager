import { useLocation, Navigate } from "react-router-dom"
import { User } from "./user.context"
import { useContext } from "react"

// Protected Route that prevents the user from going to the dashboard without authentication
export const ProtectedRoute = ({ children }) => {
  const { state } = useContext(User)
  const { user } = state

  let location = useLocation()

  if (user === null) {
    return <Navigate to="/" state={{ from: location }} replace />
  } else {
    return children
  }
}
