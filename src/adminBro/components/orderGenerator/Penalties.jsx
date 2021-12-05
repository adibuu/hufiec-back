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

const Penalties = () => {
  const { register, control } = useFormContext();

  const {
    fields: penaltiesFields,
    append: penaltiesAppend,
    remove: penaltiesRemove,
  } = useFieldArray({
    control,
    name: "penalties",
  });

  return (
    <SimpleGrid spacingY={3}>
      <HStack>
        <Text fontSize="md">11. Kary organizacyjne</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => penaltiesAppend({ content: "" })}
        />
      </HStack>
      {penaltiesFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Kara organizacyjna nr. 11.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => penaltiesRemove(index)}
            />
          </HStack>
          <Textarea {...register(`penalties.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Penalties;
