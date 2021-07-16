import React from "react";
import { Box, Header } from "@admin-bro/design-system";

const Public = (props) => {
  const { record } = props;
  return (
    <Box variant="grey">
      <Box variant="card">
        <Header.H3 fontWeight="bold">Pomyślnie opublikowano artykuł:</Header.H3>
        <Header.H4 fontStyle="italic">"{record.params.title}"</Header.H4>
        <Header.H5>autor: {record.populated.author.params.email}</Header.H5>
      </Box>
    </Box>
  );
};

export default Public;
