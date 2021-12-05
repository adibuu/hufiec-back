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

const Troops = () => {
  const { register, control } = useFormContext();

  const {
    fields: troopLayoffsFields,
    append: troopLayoffsAppend,
    remove: troopLayoffsRemove,
  } = useFieldArray({
    control,
    name: "troopLayoffs",
  });

  const {
    fields: troopAppointmentFields,
    append: troopAppointmentAppend,
    remove: troopAppointmentRemove,
  } = useFieldArray({
    control,
    name: "troopAppointment",
  });

  const {
    fields: troopVocationFields,
    append: troopVocationAppend,
    remove: troopVocationRemove,
  } = useFieldArray({
    control,
    name: "troopVocation",
  });

  return (
    <SimpleGrid spacingY={3} ml={5}>
      <HStack>
        <Text fontSize="md">2.1 Zwolnienia w komendzie hufca</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => troopLayoffsAppend({ content: "" })}
        />
      </HStack>
      {troopLayoffsFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Zwolnienie nr. 2.1.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => troopLayoffsRemove(index)}
            />
          </HStack>
          <Textarea {...register(`troopLayoffs.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">2.2 Mianowania w komendzie hufca</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => troopAppointmentAppend({ content: "" })}
        />
      </HStack>
      {troopAppointmentFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Mianowanie nr. 2.2.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => troopAppointmentRemove(index)}
            />
          </HStack>
          <Textarea {...register(`troopAppointment.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">
          2.3 Powołanie i rozwiązanie sztabów, komisji, komend kursów
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => troopVocationAppend({ content: "" })}
        />
      </HStack>
      {troopVocationFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Powołanie i rozwiązanie sztabów, komisji, komend kursów nr. 2.3.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => troopVocationRemove(index)}
            />
          </HStack>
          <Textarea {...register(`troopVocation.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Troops;
