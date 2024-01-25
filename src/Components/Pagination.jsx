import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { AppContext } from "../Context/AppContext";

const Pagination = () => {
  const { userData, currentPage, itemsPerPage, handlePageChange } =
    useContext(AppContext);

  const pageNumbers = Math.ceil(userData.length / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= pageNumbers; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          colorScheme={currentPage === i ? "blue" : "gray"}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return <div>{renderPaginationButtons()}</div>;
};

export default Pagination;
