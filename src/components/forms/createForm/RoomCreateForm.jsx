import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../../hooks/useWindowWidth";
import { findAllBuildings } from "../../../api/infrastructure/buildingService";
import { findAllDepartments } from "../../../api/infrastructure/departmentService";
import { findAllRoomTypes } from "../../../api/infrastructure/roomTypeService";
import { useQuery } from "@tanstack/react-query";

const RoomCreateForm = ({ onSubmit }) => {
  const windowWidth = useWindowWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const formValues = useWatch({
    control,
  });

  const {
    isPending: isPendingRoomType,
    isError: isErrorRoomType,
    data: roomTypeReferences,
    error: errorRoomType,
  } = useQuery({
    queryKey: ["roomTypeReferences"],
    queryFn: findAllRoomTypes,
  });

  const {
    isPending: isPendingBuilding,
    isError: isErrorBuilding,
    data: buildingReferences,
    error: errorBuilding,
  } = useQuery({
    queryKey: ["buildingReferences"],
    queryFn: findAllBuildings,
  });

  const {
    isPending: isPendingDepartment,
    isError: isErrorDepartment,
    data: departmentReferences,
    error: errorDepartment,
  } = useQuery({
    queryKey: ["departmentReferences"],
    queryFn: findAllDepartments,
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
        id="create-form"
        className="form-modal"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <pre>{JSON.stringify(formValuesToSubmit, null, 2)}</pre>
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
            controlId="roomPhotoInput"
          >
            <Form.Label>Foto de la habitación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la URL de la foto."
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
            controlId="roomTypeInput"
          >
            <Form.Label>Tipo de habitación</Form.Label>
            <Form.Select {...register("roomType.id")} defaultValue="">
              <option disabled value="">
                {isPendingRoomType
                  ? "Cargando tipo de habitaciones..."
                  : "Seleccione el tipo de habitación"}
              </option>
              {!isPendingRoomType &&
                !isErrorRoomType &&
                roomTypeReferences.data?.map((roomType) => (
                  <option key={roomType.id} value={roomType.id}>
                    {roomType.typeName}
                  </option>
                ))}
            </Form.Select>
            {errors.roomType?.id && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.roomType.id.message}
              </Alert>
            )}
            {isErrorRoomType && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los tipos de habitaciones:{" "}
                {errorRoomType.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="roomNameInput"
          >
            <Form.Label>Nombre de la habitación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la habitación"
              {...register("name")}
            />
            {errors.name && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.name.message}
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
            controlId="roomCapacityInput"
          >
            <Form.Label>Capacidad máxima de la habitación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la capacidad máxima de la habitación"
              {...register("capacityMax")}
            />
            {errors.capacityMax && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.capacityMax.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="roomBuildingInput"
          >
            <Form.Label>Edificio</Form.Label>
            <Form.Select {...register("building.id")} defaultValue="">
              <option disabled value="">
                {isPendingBuilding
                  ? "Cargando edificios..."
                  : "Seleccione el edificio"}
              </option>
              {!isPendingBuilding &&
                !isErrorBuilding &&
                buildingReferences.data?.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
            </Form.Select>
            {errors.building?.id && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.building.id.message}
              </Alert>
            )}
            {isErrorBuilding && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los edificios: {errorBuilding.message}
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
            controlId="roomDescriptionInput"
          >
            <Form.Label>Nivel de piso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nivel de piso"
              {...register("floorLabel")}
            />
            {errors.floorLabel && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.floorLabel.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>Descripción de la habitación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la description de la habitación"
              {...register("description")}
            />
            {errors.description && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.description.message}
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
            controlId="roomDeparment1Input"
          >
            <Form.Label>Departamento / área 1</Form.Label>
            <Form.Select {...register("deparment[0].id")} defaultValue="">
              <option disabled value="">
                {isPendingDepartment
                  ? "Cargando departamentos / áreas..."
                  : "Seleccione el departamento / área"}
              </option>
              {!isPendingDepartment &&
                !isErrorDepartment &&
                departmentReferences.data?.map((deparment) => (
                  <option key={deparment.id} value={deparment.id}>
                    {deparment.name}
                  </option>
                ))}
            </Form.Select>
            {errors.deparment?.[0]?.id && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.deparment[0].id.message}
              </Alert>
            )}
            {isErrorDepartment && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los departamentos / áreas:{" "}
                {errorDepartment.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="roomDeparment2Input"
          >
            <Form.Label>Departamento / área 2</Form.Label>
            <Form.Select {...register("deparment[1].id")} defaultValue="">
              <option disabled value="">
                {isPendingDepartment
                  ? "Cargando departamentos / áreas..."
                  : "Seleccione el departamento / área"}
              </option>
              {!isPendingDepartment &&
                !isErrorDepartment &&
                departmentReferences.data?.map((deparment) => (
                  <option key={deparment.id} value={deparment.id}>
                    {deparment.name}
                  </option>
                ))}
            </Form.Select>
            {isErrorDepartment && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los departamentos / áreas:{" "}
                {errorDepartment.message}
              </Alert>
            )}
          </Form.Group>
        </Container>
      </Form>
    </>
  );
};

export default RoomCreateForm;
