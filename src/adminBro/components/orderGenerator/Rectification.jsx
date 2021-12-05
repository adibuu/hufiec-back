import { useFormContext, useFieldArray } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  SimpleGrid,
  Text,
  Textarea,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react";

const Rectification = () => {
  const { register, control } = useFormContext();

  const {
    fields: rectificationFields,
    append: rectificationAppend,
    remove: rectificationRemove,
  } = useFieldArray({
    control,
    name: "rectification",
  });

  return (
    <SimpleGrid spacingY={3}>
      <HStack>
        <Text fontSize="md">14. Sprostowania</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => rectificationAppend({ content: "" })}
        />
      </HStack>
      {rectificationFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Sprostowanie nr. 14.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => rectificationRemove(index)}
            />
          </HStack>
          <Textarea {...register(`rectification.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Rectification;
