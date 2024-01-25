import React, { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  Box,
  Input,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { AppContext } from "../Context/AppContext";

const UserTable = () => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedemail, setEditedEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const { data, handleEdit, handleDelete, handleAddUser } =
    useContext(AppContext);
  const {
    isOpen: editModalIsOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure();
  const {
    isOpen: addUserModalIsOpen,
    onOpen: openAddUserModal,
    onClose: closeAddUserModal,
  } = useDisclosure();

  console.log(data);

  const handleEditClick = (userId, name, email) => {
    setEditingUserId(userId);
    setEditedName(name);
    setEditedEmail(email);
    openEditModal();
  };

  const handleSaveEdit = () => {
    handleEdit(editingUserId, { name: editedName, email: editedemail });
    closeEditModal();
  };

  const handleAddNewUser = () => {
    const newUser = {
      name: newUserName,
      email: newUserEmail,
    };
    handleAddUser(newUser);
    setNewUserName("");
    setNewUserEmail("");
    closeAddUserModal();
  };

  return (
    <div>
      <Navbar />
      <Box
        backgroundColor={"white"}
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
        m={"auto"}
        mt={"20px"}
        w={"90%"}
      >
        <Box display={"flex"} justifyContent={"flex-end"} padding={"50px"}>
          <Button onClick={openAddUserModal} colorScheme="red">
            ADD
          </Button>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr backgroundColor={"green"}>
                <Th fontSize={"18px"} color={"white"}>
                  ID
                </Th>
                <Th fontSize={"18px"} color={"white"}>
                  Name
                </Th>
                <Th fontSize={"18px"} color={"white"}>
                  Official Email
                </Th>
                <Th fontSize={"18px"} color={"white"}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data?.map((elem) => {
                  return (
                    <Tr key={elem.id}>
                      <Td>{elem.id}</Td>
                      <Td>{elem.name}</Td>
                      <Td>{elem.email}</Td>
                      <Td>
                        <Button
                          mr={"10px"}
                          onClick={() => handleEditClick(elem.id, elem.name)}
                        >
                          Edit
                        </Button>

                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(elem.id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box></Box>

      {/* Modal for Editing */}
      <Modal isOpen={editModalIsOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Edit Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Input
              placeholder="Edit Email"
              value={editedemail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
              Save
            </Button>
            <Button onClick={closeEditModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for adding new User */}
      <Modal isOpen={addUserModalIsOpen} onClose={closeAddUserModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddNewUser}>
              Save
            </Button>
            <Button onClick={closeAddUserModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserTable;
