import {
  IconButton,
  Flex,
  Text,
  ButtonGroup,
  Button,
  useDisclosure,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react"

import { DownloadIcon, AddIcon } from "@chakra-ui/icons"
import { useContext, Fragment, useState } from "react"
import { User } from "../utils/user.context.jsx"
import { seedEmployees, addEmployee } from "../utils/routes.jsx"
import EmployeeTable from "../components/EmployeeTable.jsx"

const EmployeeDashboard = () => {
  const { state, logoutUser } = useContext(User)
  const { user } = state
  const { firstName, lastName } = user
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  })
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleSeedData = async () => {
    try {
      await seedEmployees()
    } catch (error) {
      alert("There was a issue with re-populating the data.")
    }
  }

  const handleAddEmployee = async () => {
    try {
      await addEmployee(newEmployee)
      window.location.reload()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <ChakraModal
        id="new-employee"
        onClose={onClose}
        size="sm"
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl variant="floating">
              <Stack spacing={5}>
                <InputGroup>
                  <Input
                    required
                    isRequired
                    type="email"
                    value={newEmployee.name}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        name: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Name</FormLabel>
                </InputGroup>
                <InputGroup>
                  <Input
                    isRequired
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        email: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Email</FormLabel>
                </InputGroup>
                <InputGroup>
                  <Input
                    isRequired
                    type="role"
                    value={newEmployee.role}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        role: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Role</FormLabel>
                </InputGroup>
                <InputGroup>
                  <Input
                    isRequired
                    type="role"
                    value={newEmployee.department}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        department: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Department</FormLabel>
                </InputGroup>
              </Stack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleAddEmployee()}>
              Add New Employee
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
      <Flex justifyContent="space-between">
        <Text fontSize="3xl">
          Hi, {firstName} {lastName}!
        </Text>
        <Button onClick={logoutUser} colorScheme="orange">
          Log Out
        </Button>
      </Flex>
      <Flex justifyContent="space-between">
        <Text as="h1" fontSize={{ base: "xl", md: "2xl" }} float="start">
          Employee Management
        </Text>
        <ButtonGroup>
          <Button colorScheme="green" onClick={() => handleSeedData()}>
            Re-seed Data
          </Button>
          <IconButton
            icon={<AddIcon />}
            aria-label="Add new employee"
            title="Add new employee"
            onClick={() => onOpen()}
          />
          <IconButton
            aria-label="Download employee data as CSV"
            icon={<DownloadIcon />}
            colorScheme="green"
            title="Download employee data as CSV"
          />
        </ButtonGroup>
      </Flex>
      <EmployeeTable />
    </Fragment>
  )
}

export default EmployeeDashboard
