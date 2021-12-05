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

const TeamStrains = () => {
  const { register, control } = useFormContext();

  const {
    fields: givingNamesTeamStrainsFields,
    append: givingNamesTeamStrainsAppend,
    remove: givingNamesTeamStrainsRemove,
  } = useFieldArray({
    control,
    name: "givingNamesTeamStrains",
  });

  const {
    fields: appointmentTeamStrainsFields,
    append: appointmentTeamStrainsAppend,
    remove: appointmentTeamStrainsRemove,
  } = useFieldArray({
    control,
    name: "appointmentTeamStrains",
  });

  const {
    fields: dismissalsAndTeamAppointmentsTeamStrainsFields,
    append: dismissalsAndTeamAppointmentsTeamStrainsAppend,
    remove: dismissalsAndTeamAppointmentsTeamStrainsRemove,
  } = useFieldArray({
    control,
    name: "dismissalsAndTeamAppointmentsTeamStrains",
  });

  return (
    <SimpleGrid spacingY={3} ml={5}>
      <HStack>
        <Text fontSize="md">5.1 Nadanie imion, nazw, sztandarów</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => givingNamesTeamStrainsAppend({ content: "" })}
        />
      </HStack>
      {givingNamesTeamStrainsFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Nadanie imion, nazw, sztandarów nr. 5.1.{index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => givingNamesTeamStrainsRemove(index)}
            />
          </HStack>
          <Textarea {...register(`givingNamesTeamStrains.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">
          5.2 Powołania i rozwiązania szczepów, związków drużyn
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => appointmentTeamStrainsAppend({ content: "" })}
        />
      </HStack>
      {appointmentTeamStrainsFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Powołania i rozwiązania szczepów, związków drużyn nr. 5.2.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => appointmentTeamStrainsRemove(index)}
            />
          </HStack>
          <Textarea {...register(`appointmentTeamStrains.${index}.content`)} />
        </Box>
      ))}
      <HStack>
        <Text fontSize="md">
          5.3 Zwolnienia i mianowania w szczepach i związkach drużyn
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() =>
            dismissalsAndTeamAppointmentsTeamStrainsAppend({ content: "" })
          }
        />
      </HStack>
      {dismissalsAndTeamAppointmentsTeamStrainsFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Zwolnienia i mianowania w szczepach i związkach drużyn nr. 5.3.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() =>
                dismissalsAndTeamAppointmentsTeamStrainsRemove(index)
              }
            />
          </HStack>
          <Textarea
            {...register(
              `dismissalsAndTeamAppointmentsTeamStrains.${index}.content`
            )}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default TeamStrains;
