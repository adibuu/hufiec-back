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

const ClustersTeams = () => {
  const { register, control } = useFormContext();

  const {
    fields: givingNamesFields,
    append: givingNamesAppend,
    remove: givingNamesRemove,
  } = useFieldArray({
    control,
    name: "givingNames",
  });

  const {
    fields: organizationalChangesFields,
    append: organizationalChangesAppend,
    remove: organizationalChangesRemove,
  } = useFieldArray({
    control,
    name: "organizationalChanges",
  });

  const {
    fields: dismissalsAndTeamAppointmentsFields,
    append: dismissalsAndTeamAppointmentsAppend,
    remove: dismissalsAndTeamAppointmentsRemove,
  } = useFieldArray({
    control,
    name: "dismissalsAndTeamAppointments",
  });

  return (
    <SimpleGrid spacingY={3} ml={5}>
      <HStack>
        <Text fontSize="md">3.1 Nadanie imion, nazw, sztandarów</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => givingNamesAppend({ content: "" })}
        />
      </HStack>
      {givingNamesFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Nadanie imion, nazw, sztandarów nr. 3.1.{index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => givingNamesRemove(index)}
            />
          </HStack>
          <Textarea {...register(`givingNames.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">3.2 Zmiany organizacyjne</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => organizationalChangesAppend({ content: "" })}
        />
      </HStack>
      {organizationalChangesFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Zmiany organizacyjne nr. 3.2.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => organizationalChangesRemove(index)}
            />
          </HStack>
          <Textarea {...register(`organizationalChanges.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">3.3 Zwolnienia i mianowania drużynowych</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => dismissalsAndTeamAppointmentsAppend({ content: "" })}
        />
      </HStack>
      {dismissalsAndTeamAppointmentsFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Zwolnienia i mianowania drużynowych nr. 3.3.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => dismissalsAndTeamAppointmentsRemove(index)}
            />
          </HStack>
          <Textarea
            {...register(`dismissalsAndTeamAppointments.${index}.content`)}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ClustersTeams;
