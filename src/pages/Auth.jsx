import { useEffect, useContext } from "react"
import {
  Flex,
  Text,
  Box,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import HeroSVG from "../assets/hero.svg"
import useFetch from "../utils/useGoogleOAuth"
import { User } from "../utils/user.context"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const { state } = useContext(User)
  const { user } = state
  // const { firstName, lastName } = user
  const { getGoogleAuth, loading, errorMessage } = useFetch(
    "http://localhost:5152/authenticate"
  )
  const navigate = useNavigate()

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: getGoogleAuth,
      })

      google.accounts.id.renderButton(document.getElementById("auth-button"), {
        theme: "filled_blue",
        text: "authenticate",
        shape: "pill",
      })
    }
  }, [getGoogleAuth])

  const { onClose } = useDisclosure({ defaultIsOpen: true })

  return (
    <Flex flexDirection="column" alignItems="center" gap={5}>
      {/* <Alert
        hidden={!errorMessage}
        status="error"
        position="absolute"
        width="50%"
        top="30px"
      >
        <AlertIcon />
        <AlertTitle>An Error Occurred</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert> */}
      <Box>
        <Text as="h1" fontSize="3xl">
          Welcome to EMD!
        </Text>
        <Image
          src={HeroSVG}
          alt="Man using technology to display bar data"
          width="290px"
        />
      </Box>
      <Box>
        <Text fontSize="lg">
          {user
            ? `Welcome back, ${user?.firstName} ${user?.lastName}!`
            : `To access the employee database, please sign up by authenticating with
          Google.`}
        </Text>
      </Box>
      {user ? (
        <Button
          onClick={() => navigate("/dashboard")}
          borderRadius="50px"
          colorScheme="orange"
        >
          Continue to Dashboard
        </Button>
      ) : (
        <Box>{loading ? <Spinner /> : <div id="auth-button" />}</Box>
      )}
    </Flex>
  )
}

export default Auth
