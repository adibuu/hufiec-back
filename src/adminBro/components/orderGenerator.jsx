import React from "react";
import { Box, Header } from "@admin-bro/design-system";
import { useCurrentAdmin } from "admin-bro";

const OrderGenerator = () => {
  const [currentAdmin] = useCurrentAdmin();

  const message =
    currentAdmin.role === "admin"
      ? "Generator rozkazów"
      : "Nie masz uprawnień do korzystania z tej strony";

  return (
    <Box variant="grey">
      <Box variant="card">
        <Header.H3 fontWeight="bold">{message}</Header.H3>
      </Box>
    </Box>
  );
};

export default OrderGenerator;
