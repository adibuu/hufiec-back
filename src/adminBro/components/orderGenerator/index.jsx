import { useState } from "react";
import { Box as AdminBroBox, DatePicker } from "@admin-bro/design-system";
import { useCurrentAdmin } from "admin-bro";
import { useForm, FormProvider, Controller } from "react-hook-form";
import pl from "date-fns/locale/pl";
import Select from "react-select";
import {
  ChakraProvider,
  SimpleGrid,
  Heading,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Text,
  Textarea,
  Switch,
  Flex,
  Divider,
  ScaleFade,
  HStack,
} from "@chakra-ui/react";
import OrdinancesAndInformation from "./OrdinancesAndInformation";
import Troops from "./Troops";
import ClustersTeams from "./ClustersTeams";
import CirclesAndClubs from "./CirclesAndClubs";
import TeamStrains from "./TeamStrains";
import SummerAndWinter from "./SummerAndWinter";
import InstructorAppoitmets from "./InstructorAppoitmets";

const OrderGenerator = () => {
  const [currentAdmin] = useCurrentAdmin();
  const methods = useForm();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const message =
    currentAdmin.role === "admin"
      ? "Generator rozkazów"
      : "Nie masz uprawnień do korzystania z tej strony";

  const onSubmit = (data) => console.log(data);

  const options = [];

  for (let i = 1; i <= 30; i++) {
    options.push({ value: i, label: i });
  }

  const [orderOptions, setOrderOptions] = useState({
    occasionalAdmission: false,
    orderExceptions: false,
    ordinancesAndInformation: false,
    troops: false,
    clustersTeams: false,
    circlesAndClubs: false,
    teamStrains: false,
    summerAndWinter: false,
    instructorAppointments: false,
  });

  return (
    <ChakraProvider>
      <AdminBroBox variant="grey">
        <AdminBroBox variant="card">
          <Center>
            <Heading size="lg" mb={8} color="green">
              Generator rozkazów
            </Heading>
          </Center>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacingY={5}>
                <HStack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Wybierz datę rozkazu</FormLabel>
                    <Controller
                      control={control}
                      name="orderDate"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          onChange={onChange}
                          value={value}
                          locale={pl}
                        />
                      )}
                    />
                    {errors.orderDate && (
                      <Text mt={3} color="red">
                        Data rozkazu jest wymagana
                      </Text>
                    )}
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Wybierz numer rozkazu</FormLabel>
                    <Controller
                      control={control}
                      name="orderNumber"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onChange={(selectedValue) =>
                            onChange(selectedValue.value)
                          }
                          value={options.find((c) => value === c.value)}
                          options={options}
                          placeholder="Wybierz numer rozkazu"
                        />
                      )}
                    />
                    {errors.orderNumber && (
                      <Text mt={3} color="red">
                        Numer rozkazu jest wymagany
                      </Text>
                    )}
                  </FormControl>
                </HStack>
                <FormControl isRequired>
                  <FormLabel>Nazwa Hufca</FormLabel>
                  <Textarea
                    {...register("troopsName", {
                      required: true,
                    })}
                  />
                  {errors.troopsName && (
                    <FormErrorMessage>To pole jest wymagane</FormErrorMessage>
                  )}
                </FormControl>
                <Divider />
                <Flex>
                  <FormLabel>Wstęp okolicznościowy</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.occasionalAdmission}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        occasionalAdmission: !orderOptions.occasionalAdmission,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.occasionalAdmission && (
                  <ScaleFade
                    initialScale={0.7}
                    in={orderOptions.occasionalAdmission}
                  >
                    <FormControl isRequired>
                      <Textarea
                        {...register("occasionalAdmission", {
                          required: orderOptions.occasionalAdmission
                            ? true
                            : false,
                        })}
                      />
                      {errors.occasionalAdmission && (
                        <FormErrorMessage>
                          To pole jest wymagane
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </ScaleFade>
                )}
                <Flex>
                  <FormLabel>Wyjątki z rozkazu jednostki nadrzędnej</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.orderExceptions}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        orderExceptions: !orderOptions.orderExceptions,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.orderExceptions && (
                  <ScaleFade
                    initialScale={0.7}
                    in={orderOptions.orderExceptions}
                  >
                    <FormControl isRequired>
                      <Textarea
                        {...register("orderExceptions", {
                          required: orderOptions.orderExceptions ? true : false,
                        })}
                      />
                      {errors.orderExceptions && (
                        <FormErrorMessage>
                          To pole jest wymagane
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </ScaleFade>
                )}
                <Divider />
                <Flex>
                  <FormLabel>1. Zarządzenia i informacje</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.ordinancesAndInformation}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        ordinancesAndInformation:
                          !orderOptions.ordinancesAndInformation,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.ordinancesAndInformation && (
                  <ScaleFade
                    initialScale={0.7}
                    in={orderOptions.ordinancesAndInformation}
                  >
                    <OrdinancesAndInformation />
                  </ScaleFade>
                )}
                <Divider />
                <Flex>
                  <FormLabel>2. Hufiec</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.troops}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        troops: !orderOptions.troops,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.troops && (
                  <ScaleFade initialScale={0.7} in={orderOptions.troops}>
                    <Troops />
                  </ScaleFade>
                )}
                <Divider />
                <Flex>
                  <FormLabel>3. Gromady, drużyny</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.clustersTeams}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        clustersTeams: !orderOptions.clustersTeams,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.clustersTeams && (
                  <ScaleFade initialScale={0.7} in={orderOptions.clustersTeams}>
                    <ClustersTeams />
                  </ScaleFade>
                )}
                <Divider />
                <Flex>
                  <FormLabel>4. Kręgi, kluby</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.circlesAndClubs}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        circlesAndClubs: !orderOptions.circlesAndClubs,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.circlesAndClubs && (
                  <ScaleFade
                    initialScale={0.7}
                    in={orderOptions.circlesAndClubs}
                  >
                    <CirclesAndClubs />
                  </ScaleFade>
                )}
                <Divider />
                <Flex>
                  <FormLabel>5. Szczepy, związki drużyn</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.teamStrains}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        teamStrains: !orderOptions.teamStrains,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.teamStrains && (
                  <ScaleFade initialScale={0.7} in={orderOptions.teamStrains}>
                    <TeamStrains />
                  </ScaleFade>
                )}
                <Divider />
                <Flex>
                  <FormLabel>6. Harcerska Akcja Letnia i Zimowa</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.summerAndWinter}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        summerAndWinter: !orderOptions.summerAndWinter,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.summerAndWinter && (
                  <ScaleFade
                    initialScale={0.7}
                    in={orderOptions.summerAndWinter}
                  >
                    <SummerAndWinter />
                  </ScaleFade>
                )}
                <Divider />
                <Flex>
                  <FormLabel>7. Mianowania instruktorów</FormLabel>
                  <Switch
                    colorScheme="green"
                    isChecked={orderOptions.instructorAppointments}
                    onChange={() => {
                      setOrderOptions({
                        ...orderOptions,
                        instructorAppointments:
                          !orderOptions.instructorAppointments,
                      });
                    }}
                  />
                </Flex>
                {orderOptions.instructorAppointments && (
                  <ScaleFade
                    initialScale={0.7}
                    in={orderOptions.instructorAppointments}
                  >
                    <InstructorAppoitmets />
                  </ScaleFade>
                )}
                <Divider />
                <Center>
                  <Button type="submit" size="md" colorScheme="green" mt={5}>
                    Generuj dokument PDF
                  </Button>
                </Center>
              </SimpleGrid>
            </form>
          </FormProvider>
        </AdminBroBox>
      </AdminBroBox>
    </ChakraProvider>
  );
};

export default OrderGenerator;
