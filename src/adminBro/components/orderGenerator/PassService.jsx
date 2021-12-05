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

const PassService = () => {
  const { register, control } = useFormContext();

  const {
    fields: passServiceFields,
    append: passServiceAppend,
    remove: passServiceRemove,
  } = useFieldArray({
    control,
    name: "passService",
  });

  return (
    <SimpleGrid spacingY={3}>
      <HStack>
        <Text fontSize="md">8. Zaliczanie służby instruktorskiej</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => passServiceAppend({ content: "" })}
        />
      </HStack>
      {passServiceFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Zaliczanie służby instruktorskiej nr. 8.{index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => passServiceRemove(index)}
            />
          </HStack>
          <Textarea {...register(`passService.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default PassService;
