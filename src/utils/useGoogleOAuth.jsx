import { useContext, useState } from "react"
import { User } from "./user.context.jsx"
import axios from "axios"

const useGoogleOAuth = (url) => {
  const { dispatch } = useContext(User)
  const [states, setStates] = useState({
    loading: false,
    errorMessage: "",
  })
  const { loading, errorMessage } = states

  const getGoogleAuth = async (response) => {
    setStates({ ...states, loading: true })
    await axios
      .post(url, {
        credential: response.credential,
      })
      .then((res) => {
        setStates({ ...states, loading: false })
        return res["data"]
      })
      .then(({ user, message }) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user))
          dispatch({
            type: "user",
            payload: user,
          })
          return
        }
        throw new Error(message || user)
      })
      .catch(({ message }) => {
        setStates({ ...states, errorMessage: message })
      })
  }
  return { loading, errorMessage, getGoogleAuth }
}

export default useGoogleOAuth
