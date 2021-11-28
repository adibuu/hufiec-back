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
                          onChange={onChange}
                          value={value}
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
