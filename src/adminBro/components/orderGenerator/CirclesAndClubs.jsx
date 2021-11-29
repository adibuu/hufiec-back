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

const CirclesAndClubs = () => {
  const { register, control } = useFormContext();

  const {
    fields: givingNamesCirclesAndClubsFields,
    append: givingNamesCirclesAndClubsAppend,
    remove: givingNamesCirclesAndClubsRemove,
  } = useFieldArray({
    control,
    name: "givingNamesCirclesAndClubs",
  });

  const {
    fields: appointmentCirclesFields,
    append: appointmentCirclesAppend,
    remove: appointmentCirclesRemove,
  } = useFieldArray({
    control,
    name: "appointmentCircles",
  });

  const {
    fields: dismissalsAndTeamAppointmentsCirclesFields,
    append: dismissalsAndTeamAppointmentsCirclesAppend,
    remove: dismissalsAndTeamAppointmentsCirclesRemove,
  } = useFieldArray({
    control,
    name: "dismissalsAndTeamAppointmentsCircles",
  });

  return (
    <SimpleGrid spacingY={3} ml={5}>
      <HStack>
        <Text fontSize="md">4.1 Nadanie imion, nazw </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => givingNamesCirclesAndClubsAppend({ content: "" })}
        />
      </HStack>
      {givingNamesCirclesAndClubsFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">Nadanie imion, nazw nr. 4.1.{index + 1}</Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => givingNamesCirclesAndClubsRemove(index)}
            />
          </HStack>
          <Textarea
            {...register(`givingNamesCirclesAndClubs.${index}.content`)}
          />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">4.2 Powołania i rozwiązania kręgów</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => appointmentCirclesAppend({ content: "" })}
        />
      </HStack>
      {appointmentCirclesFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Powołania i rozwiązania kręgów nr. 4.2.{index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => appointmentCirclesRemove(index)}
            />
          </HStack>
          <Textarea {...register(`appointmentCircles.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">4.3 Zwolnienia i mianowania w kręgach</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() =>
            dismissalsAndTeamAppointmentsCirclesAppend({ content: "" })
          }
        />
      </HStack>
      {dismissalsAndTeamAppointmentsCirclesFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Zwolnienia i mianowania w kręgach nr. 4.3.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => dismissalsAndTeamAppointmentsCirclesRemove(index)}
            />
          </HStack>
          <Textarea
            {...register(
              `dismissalsAndTeamAppointmentsCircles.${index}.content`
            )}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default CirclesAndClubs;
