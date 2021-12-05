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

const Praise = () => {
  const { register, control } = useFormContext();

  const {
    fields: praiseFields,
    append: praiseAppend,
    remove: praiseRemove,
  } = useFieldArray({
    control,
    name: "praise",
  });

  return (
    <SimpleGrid spacingY={3}>
      <HStack>
        <Text fontSize="md">12. Pochwały, wyróżnienia, nagrody</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => praiseAppend({ content: "" })}
        />
      </HStack>
      {praiseFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Pochwała, wyróżnienie, nagroda nr. {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => praiseRemove(index)}
            />
          </HStack>
          <Textarea {...register(`praise.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Praise;
