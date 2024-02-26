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
} from "@chakra-ui/react"
import {
  DownloadIcon,
  UpDownIcon,
  AddIcon,
  DeleteIcon,
  SettingsIcon,
} from "@chakra-ui/icons"
import mockData from "../mock.json"

const EmployeeTable = () => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Text as="h1" fontSize={{ base: "xl", md: "3xl" }} float="start">
          Employee Management
        </Text>
        <ButtonGroup>
          <IconButton icon={<AddIcon />} aria-label="Add new employee" />
          <IconButton
            aria-label="Download employee data as CSV"
            icon={<DownloadIcon />}
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
                Department{" "}
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
                    <IconButton icon={<DeleteIcon />} />
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
