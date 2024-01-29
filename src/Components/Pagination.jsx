import React, { useContext } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { AppContext } from "../Context/AppContext";

const Pagination = () => {
  const { datalength, page, limit, setPage } = useContext(AppContext);

  const totalPages = Math.ceil(datalength / limit);
  const startItem = (page - 1) * limit + 1;

  const handlePageAdd = () => {
    setPage((page) => page + 1);
  };
  const handlePageSub = () => {
    setPage((page) => page - 1);
  };

  return (
    <Flex justify={"right"}>
      <Flex justify={""} align={"center"}>
      </Flex>
      <Box>
        <Button
          onClick={handlePageSub}
          bg={"transparent"}
          isDisabled={page === 1}
        >
          {"<"}
        </Button>
        <Button>{page}</Button>
        <Button
          onClick={handlePageAdd}
          isDisabled={page >= totalPages}
          bg={"transparent"}
        >
          {">"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Pagination;
