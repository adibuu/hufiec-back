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

const Other = () => {
  const { register, control } = useFormContext();

  const {
    fields: otherFields,
    append: otherAppend,
    remove: otherRemove,
  } = useFieldArray({
    control,
    name: "other",
  });

  return (
    <SimpleGrid spacingY={3}>
      <HStack>
        <Text fontSize="md">13. Inne</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => otherAppend({ content: "" })}
        />
      </HStack>
      {otherFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Inne nr. 13.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => otherRemove(index)}
            />
          </HStack>
          <Textarea {...register(`other.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Other;
