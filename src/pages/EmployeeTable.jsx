import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Flex,
  Text,
  ButtonGroup,
  Button,
} from "@chakra-ui/react"
import {
  DownloadIcon,
  UpDownIcon,
  AddIcon,
  DeleteIcon,
  SettingsIcon,
} from "@chakra-ui/icons"
import mockData from "../mock.json"
import { useContext } from "react"
import { User } from "../utils/user.context.jsx"

const EmployeeTable = () => {
  const { state, logoutUser } = useContext(User)
  const { user } = state
  const { firstName, lastName } = user

  return (
    <>
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
          <IconButton icon={<AddIcon />} aria-label="Add new employee" />
          <IconButton
            aria-label="Download employee data as CSV"
            icon={<DownloadIcon />}
            colorScheme="green"
          />
        </ButtonGroup>
      </Flex>
      <TableContainer height="200px" overflowY="scroll">
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
            {mockData.map(({ id, name, email, role, department }) => (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>{email}</Td>
                <Td>{role}</Td>
                <Td>{department}</Td>
                <Td>
                  <ButtonGroup>
                    <IconButton icon={<DeleteIcon />} colorScheme="red" />
                    <IconButton icon={<SettingsIcon />} />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default EmployeeTable
