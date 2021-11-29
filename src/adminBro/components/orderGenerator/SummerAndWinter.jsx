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

const SummerAndWinter = () => {
  const { register, control } = useFormContext();

  const {
    fields: appoitmentsHALIZFields,
    append: appoitmentsHALIZAppend,
    remove: appoitmentsHALIZRemove,
  } = useFieldArray({
    control,
    name: "appoitmentsHALIZ",
  });

  return (
    <SimpleGrid spacingY={3} ml={5}>
      <HStack>
        <Text fontSize="md">6.1. Zwolnienia i mianowania kadry HALiZ</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => appoitmentsHALIZAppend({ content: "" })}
        />
      </HStack>
      {appoitmentsHALIZFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Zwolnienia i mianowania kadry HALiZ nr. 6.1.{index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => appoitmentsHALIZRemove(index)}
            />
          </HStack>
          <Textarea {...register(`appoitmentsHALIZ.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default SummerAndWinter;
