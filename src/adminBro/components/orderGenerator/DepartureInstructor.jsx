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

const DepartureInstructor = () => {
  const { register, control } = useFormContext();

  const {
    fields: departureInstrucotrFields,
    append: departureInstrucotrAppend,
    remove: departureInstrucotrRemove,
  } = useFieldArray({
    control,
    name: "departureInstrucotr",
  });

  return (
    <SimpleGrid spacingY={3}>
      <HStack>
        <Text fontSize="md">
          10. Wystąpienia instruktorów, skreślenia z listy członków, ustanie
          członkostwa
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => departureInstrucotrAppend({ content: "" })}
        />
      </HStack>
      {departureInstrucotrFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Wystąpienia instruktorów, skreślenia z listy członków, ustanie
              członkostwa nr. 10.{index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => departureInstrucotrRemove(index)}
            />
          </HStack>
          <Textarea {...register(`departureInstrucotr.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default DepartureInstructor;
