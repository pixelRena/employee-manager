import "./App.css"
import { Flex, Box } from "@chakra-ui/react"
import EmployeeTable from "./pages/EmployeeTable"
import Auth from "./pages/Auth"
import { Routes, Route } from "react-router-dom"
import { RequireAuth } from "./utils/requireAuth"

function App() {
  return (
    <Flex
      height="100%"
      flexDirection="column"
      justifyContent="center"
      justifyItems="center"
      width="100%"
      alignItems="center"
    >
      <Box
        background="rgba(246,246,248)"
        boxShadow="2px 2px 5px #E1E1E6"
        borderRadius="15px"
        padding={{ base: "20px", md: "50px" }}
        width="fit-content"
      >
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <EmployeeTable />
              </RequireAuth>
            }
          />
        </Routes>
      </Box>
    </Flex>
  )
}

export default App
