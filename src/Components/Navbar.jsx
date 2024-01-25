import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };
  return (
    <div>
      <Box
        w={"100%"}
        display={"flex"}
        flexDirection={"row-reverse"}
        paddingRight={"100px"}
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
      >
        <Button margin={"20px"} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default Navbar;
