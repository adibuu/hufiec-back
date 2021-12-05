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

const OrdinancesAndInformation = () => {
  const { register, control } = useFormContext();

  const {
    fields: ordinancesFields,
    append: ordinancesAppend,
    remove: ordinancesRemove,
  } = useFieldArray({
    control,
    name: "ordinances",
  });

  const {
    fields: informationFields,
    append: informationAppend,
    remove: informationRemove,
  } = useFieldArray({
    control,
    name: "information",
  });

  return (
    <SimpleGrid spacingY={3} ml={5}>
      <HStack>
        <Text fontSize="md">1.1 Zarządzenia</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => ordinancesAppend({ content: "" })}
        />
      </HStack>
      {ordinancesFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Zarządzenie nr. 1.1.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => ordinancesRemove(index)}
            />
          </HStack>
          <Textarea {...register(`ordinances.${index}.content`)} />
        </Box>
      ))}
      <HStack>
        <Text fontSize="md">1.2 Informacje</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => informationAppend({ content: "" })}
        />
      </HStack>
      {informationFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Informacja nr. 1.2.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => informationRemove(index)}
            />
          </HStack>
          <Textarea {...register(`information.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default OrdinancesAndInformation;
