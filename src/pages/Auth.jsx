import { Flex, Text, Box, Image, Button } from "@chakra-ui/react"
import HeroSVG from "../assets/hero.svg"
import GoogleSVG from "../assets/google.svg"

const Auth = () => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={5}>
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
          To access the employee database, please sign up by authenticating with
          Google.
        </Text>
      </Box>
      <Box>
        <Button
          leftIcon={<Image width="15px" src={GoogleSVG} alt="Google Logo" />}
        >
          Authenticate with Google
        </Button>
      </Box>
    </Flex>
  )
}

export default Auth
