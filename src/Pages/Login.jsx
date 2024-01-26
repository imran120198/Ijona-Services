import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [form, setForm] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.username !== "Ijona" || form.password !== "Ijona") {
      alert("Incorrect username or password");
      return;
    }

    // Proceed with the login logic
    let data = JSON.parse(localStorage.getItem("userData")) || [];
    data.push(form);
    localStorage.setItem("userData", JSON.stringify(data));
    navigate("/home");
  };

  return (
    <Box h={"700px"}>
      <Box mt={"50px"} mb={"30px"}>
        <Heading>Login</Heading>
      </Box>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={"30px"}
        margin={"auto"}
      >
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button colorScheme="blue" mt={"20px"} onClick={handleSubmit}>
            Login
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Login;
