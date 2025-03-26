import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../../hooks/useWindowWidth";
import countriesEs from "../../../data/constants/countriesEs";
import { useEffect } from "react";

const BuildingUpdateForm = ({ readData, onSubmit }) => {
  const windowWidth = useWindowWidth();

  const buildingData = readData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (buildingData) {
      reset(buildingData);
    }
  }, [buildingData, reset]);

  const formValues = useWatch({
    control,
  });

  const formValuesToSubmit = {
    ...formValues,
  };

  const handleFormSubmit = () => {
    onSubmit(formValuesToSubmit);
  };

  return (
    <>
      <Form
        id="update-form"
        className="form-modal"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {/*<pre>{JSON.stringify(formValuesToSubmit, null, 2)}</pre>*/}
        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="buildingPhotoInput"
          >
            <Form.Label>Foto del edificio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la URL de la foto."
              defaultValue={buildingData.image || ""}
              {...register("image")}
            />
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          ></Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="buildingNameInput"
          >
            <Form.Label>Nombre del edificio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del edificio"
              defaultValue={buildingData.name || ""}
              {...register("name")}
            />
            {errors.name && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.name.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="buildingNumbersOfFloorsInput"
          >
            <Form.Label>Número de pisos del edificio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el número de pisos del edificio"
              defaultValue={buildingData.numberOfFloors || ""}
              {...register("numberOfFloors")}
            />
            {errors.numberOfFloors && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.numberOfFloors.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="buildingDescriptionInput"
          >
            <Form.Label>Descripción del edificio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la description del edificio"
              defaultValue={buildingData.description || ""}
              {...register("description")}
            />
            {errors.description && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.description.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          ></Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="addressStreetInput"
          >
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Av. Reforma"
              defaultValue={buildingData.address.street || ""}
              {...register("address.street")}
            />
            {errors.address?.street && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.address.street.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="addressStreetNumberInput"
          >
            <Form.Label>
              Número de la calle{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: 102-B"
              defaultValue={buildingData.address?.streetNumber || ""}
              {...register("address.streetNumber")}
            />
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="addressPostalCodeInput"
          >
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: 75008"
              defaultValue={buildingData.addres?.postalCode || ""}
              {...register("address.postalCode")}
            />
            {errors.address?.postalCode && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.address.postalCode.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="addressCityInput"
          >
            <Form.Label>Cuidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Pachuca"
              defaultValue={buildingData.address?.city || ""}
              {...register("address.city")}
            />
            {errors.address?.city && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.address.city.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
          controlId="addressStateInput"
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>Estado/Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Hidalgo"
              defaultValue={buildingData.address?.countryState || ""}
              {...register("address.countryState")}
            />
            {errors.address?.countryState && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.address.countryState.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="addressCountrySelect"
          >
            <Form.Label>País</Form.Label>
            <Form.Select
              {...register("address.country")}
              defaultValue={buildingData.address?.country || ""}
            >
              <option disabled value="">
                Seleccione el país
              </option>
              {countriesEs.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
            {errors.address?.country && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.address.country.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="addressReferenceInput"
          >
            <Form.Label>
              Referencia <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Cerca del parque"
              defaultValue={buildingData.address?.reference || ""}
              {...register("address.reference")}
            />
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          ></Form.Group>
        </Container>
      </Form>
    </>
  );
};

export default BuildingUpdateForm;
