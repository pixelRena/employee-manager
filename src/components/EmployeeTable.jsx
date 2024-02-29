import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  ButtonGroup,
  Text,
  useDisclosure,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  Stack,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react"
import { UpDownIcon, DeleteIcon, SettingsIcon } from "@chakra-ui/icons"
import { getEmployees, deleteEmployee, editEmployee } from "../utils/routes.jsx"
import { useState, useEffect, Fragment, useRef } from "react"

const EmployeeTable = () => {
  const [employees, setEmployees] = useState(null)
  const [message, setMessage] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState({})
  const [isAlertOpen, setIsAlertOpen] = useState()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees()
      setEmployees(data)
    } catch (error) {
      setMessage(error)
    }
  }
  // Todo: add validation for required fields
  const handleDeleteEmployee = async (id) => {
    try {
      const { data } = await deleteEmployee(id)
      fetchEmployees()
      setMessage(data)
    } catch (error) {
      setMessage(error)
    }
  }

  const handleEditEmployee = async () => {
    try {
      const { data } = await editEmployee(selectedEmployee)
      fetchEmployees()
      setMessage(data)
      onClose()
    } catch (error) {
      setMessage(error)
    }
  }

  const handleEmployeeConfirmation = (data) => {
    setIsAlertOpen(true)
    setSelectedEmployee(data)
  }

  const setEmployee = (data) => {
    setSelectedEmployee(data)
    onOpen()
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <Fragment>
      <ChakraModal
        id={selectedEmployee.id}
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
                    type="email"
                    value={selectedEmployee.name}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        name: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Name</FormLabel>
                </InputGroup>
                <InputGroup>
                  <Input
                    type="email"
                    value={selectedEmployee.email}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        email: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Email</FormLabel>
                </InputGroup>
                <InputGroup>
                  <Input
                    type="role"
                    value={selectedEmployee.role}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        role: e.target.value,
                      })
                    }
                  />
                  <FormLabel>Role</FormLabel>
                </InputGroup>
                <InputGroup>
                  <Input
                    type="role"
                    value={selectedEmployee.department}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
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
            <Button onClick={() => handleEditEmployee()}>
              Update Employee Information
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
      <ConfirmationModal
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        employee={selectedEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
      />
      <TableContainer height="500px" overflowY="scroll">
        <Table variant="simple">
          <Thead
            bg="rgba(246,246,248)"
            position="sticky"
            top={0}
            zIndex="docked"
          >
            <Tr>
              <Th>Employee Name</Th>
              <Th>Work Email</Th>
              <Th>Role</Th>
              <Th>
                Department
                <IconButton
                  aria-label="Sort by Department (Asc/Desc)"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  size="sm"
                  icon={<UpDownIcon />}
                />
              </Th>
              <Th>Modify</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees &&
              employees?.map(({ id, name, email, role, department }) => (
                <Fragment key={id}>
                  <Tr>
                    <Td>{name}</Td>
                    <Td>{email}</Td>
                    <Td>{role}</Td>
                    <Td>{department}</Td>
                    <Td>
                      <ButtonGroup>
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() =>
                            handleEmployeeConfirmation({
                              id,
                              name,
                              email,
                              role,
                              department,
                            })
                          }
                        />
                        <IconButton
                          icon={<SettingsIcon />}
                          onClick={() =>
                            setEmployee({ id, name, email, role, department })
                          }
                        />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                </Fragment>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export default EmployeeTable

const ConfirmationModal = ({
  setIsOpen,
  isOpen,
  employee,
  handleDeleteEmployee,
}) => {
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  return (
    <Fragment>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {name} Employee
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete {employee.name}? You can't undo this
            action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                onClose()
                handleDeleteEmployee(employee.id)
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  )
}
