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

const InstructorAppoitmets = () => {
  const { register, control } = useFormContext();

  const {
    fields: closeGuideAttemptFields,
    append: closeGuideAttemptAppend,
    remove: closeGuideAttemptRemove,
  } = useFieldArray({
    control,
    name: "closeGuideAttempt",
  });

  const {
    fields: openGuideAttemptFields,
    append: openGuideAttemptAppend,
    remove: openGuideAttemptRemove,
  } = useFieldArray({
    control,
    name: "openGuideAttempt",
  });

  const {
    fields: closeScoutmasterAttemptFields,
    append: closeScoutmasterAttemptAppend,
    remove: closeScoutmasterAttemptRemove,
  } = useFieldArray({
    control,
    name: "closeScoutmasterAttempt",
  });

  const {
    fields: openScoutmasterAttemptFields,
    append: openScoutmasterAttemptAppend,
    remove: openScoutmasterAttemptRemove,
  } = useFieldArray({
    control,
    name: "openScoutmasterAttempt",
  });

  const {
    fields: instructorReceptionFields,
    append: instructorReceptionAppend,
    remove: instructorReceptionRemove,
  } = useFieldArray({
    control,
    name: "instructorReception",
  });

  return (
    <SimpleGrid spacingY={3} ml={5}>
      <HStack>
        <Text fontSize="md">
          7.1. Zamknięcia próby na stopień przewodniczki/przewodnika
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => closeGuideAttemptAppend({ content: "" })}
        />
      </HStack>
      {closeGuideAttemptFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Zamknięcia próby na stopień przewodniczki/przewodnika nr. 7.1.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => closeGuideAttemptRemove(index)}
            />
          </HStack>
          <Textarea {...register(`closeGuideAttempt.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">
          7.2. Otwarcie próby na stopień przewodniczki/przewodnika
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => openGuideAttemptAppend({ content: "" })}
        />
      </HStack>
      {openGuideAttemptFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Otwarcie próby na stopień przewodniczki/przewodnika nr. 7.2.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => openGuideAttemptRemove(index)}
            />
          </HStack>
          <Textarea {...register(`openGuideAttempt.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">
          7.3. Zamknięcie próby na stopień podharcmistrzyni/podharcmistrza
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => closeScoutmasterAttemptAppend({ content: "" })}
        />
      </HStack>
      {closeScoutmasterAttemptFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Zamknięcie próby na stopień podharcmistrzyni/podharcmistrza nr.
              7.3.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => closeScoutmasterAttemptRemove(index)}
            />
          </HStack>
          <Textarea {...register(`closeScoutmasterAttempt.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">
          7.4. Otwarcie próby na stopień podharcmistrzyni/podharcmistrza
        </Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => openScoutmasterAttemptAppend({ content: "" })}
        />
      </HStack>
      {openScoutmasterAttemptFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Otwarcie próby na stopień podharcmistrzyni/podharcmistrza nr. 7.4.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => openScoutmasterAttemptRemove(index)}
            />
          </HStack>
          <Textarea {...register(`openScoutmasterAttempt.${index}.content`)} />
        </Box>
      ))}

      <HStack>
        <Text fontSize="md">7.5. Przyjęcie w poczet instruktorów</Text>
        <Icon
          as={IoMdAddCircleOutline}
          w={6}
          h={6}
          color="green.500"
          _hover={{ color: "green.300", cursor: "pointer" }}
          onClick={() => instructorReceptionAppend({ content: "" })}
        />
      </HStack>
      {instructorReceptionFields.map((item, index) => (
        <Box key={item.id} p={3}>
          <HStack mb={3}>
            <Text fontSize="md">
              Przyjęcie w poczet instruktorów nr. 7.5.
              {index + 1}
            </Text>
            <Icon
              ml={2}
              as={RiDeleteBin2Line}
              w={5}
              h={5}
              color="red.500"
              _hover={{ color: "red.300", cursor: "pointer" }}
              onClick={() => instructorReceptionRemove(index)}
            />
          </HStack>
          <Textarea {...register(`instructorReception.${index}.content`)} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default InstructorAppoitmets;
