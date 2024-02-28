import { createContext, useReducer } from "react"
import { useNavigate } from "react-router-dom"

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
}

export const User = createContext({
  state: initialState,
  dispatch: () => {},
})

const reducer = (state, action) => {
  switch (action.type) {
    case "user":
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  const logoutUser = () => {
    localStorage.removeItem("user")
    dispatch({
      type: "user",
      payload: null,
    })
    navigate("/", { replace: true })
  }

  const value = { state, dispatch, logoutUser }

  return <User.Provider value={value}>{children}</User.Provider>
}
