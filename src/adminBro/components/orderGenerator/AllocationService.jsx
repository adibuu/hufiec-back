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

const AllocationService = () => {
  const { register, control } = useFormContext();

  const {
    fields: obtainAllocationFields,
    append: obtainAllocationAppend,
    remove: obtainAllocationRemove,
  } = useFieldArray({
    control,
    name: "obtainAllocation",
  });

  const {
    fields: changeAllocationFields,
    append: changeAllocationAppend,
    remove: changeAllocationRemove,
  } = useFieldArray({
    control,
    name: "changeAllocation",
  });

  return (
    <SimpleGrid spacingY={3} ml={5}>
      <HStack>
        <Text fontSize="md">
          9.1 Uzyskanie przydziału służbowego przez członka ZHP
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => obtainAllocationAppend({ content: "" })}
        />
      </HStack>
      {obtainAllocationFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Uzyskanie przydziału służbowego przez członka ZHP nr. 9.1.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => obtainAllocationRemove(index)}
            />
          </HStack>
          <Textarea {...register(`obtainAllocation.${index}.content`)} />
        </Box>
      ))}
      <HStack>
        <Text fontSize="md">9.2 Zmiana przydziału służbowego</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => changeAllocationAppend({ content: "" })}
        />
      </HStack>
      {changeAllocationFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Zmiana przydziału służbowego nr. 9.2.{index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => changeAllocationRemove(index)}
            />
          </HStack>
          <Textarea {...register(`changeAllocation.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default AllocationService;
