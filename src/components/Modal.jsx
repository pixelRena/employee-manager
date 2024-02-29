import {
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
} from "@chakra-ui/react"
import { editEmployee } from "../utils/routes"
import { useState, useEffect } from "react"

export const EditEmployeeModal = ({ data, isOpen, onClose }) => {
  const { id, name, email, role, department } = data
  const [employeeInformation, setEmployeeInformation] = useState(null)

  const handleEditEmployee = async () => {
    try {
      // const { data } = await editEmployee(employeeInformation)
      console.log(employeeInformation)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {}, [])

  return (
    <ChakraModal id={id} onClose={onClose} size="xs" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              defaultValue={email}
              onChange={(e) =>
                setEmployeeInformation({
                  ...employeeInformation,
                  email: e.target.value,
                })
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => handleEditEmployee()}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export const AddModal = () => {}
