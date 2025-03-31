import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../../hooks/useWindowWidth";
import {
  findAllITDeviceNames,
  findAllHardwareBrands,
  findAllITDeviceLines,
  findAllHardwareSeries,
} from "../../../api/assets/hardwareService";
import { findAllRooms } from "../../../api/infrastructure/roomService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  PhysicalStatusEnum,
  OperationalStatusEnum,
} from "../../../data/enums/hardwareEnums";
import { RoomTypesEnum } from "../../../data/enums/roomEnums";

const ITDeviceUpdateForm = ({ readData, onSubmit }) => {
  const windowWidth = useWindowWidth();

  const itDeviceData = readData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (itDeviceData) {
      reset(itDeviceData);
    }
  }, [itDeviceData, reset]);

  const formValues = useWatch({
    control,
  });

  const {
    isPending: isPendingITDeviceName,
    isError: isErrorITDeviceName,
    data: iTDeviceNameReferences,
    error: errorITDeviceName,
  } = useQuery({
    queryKey: ["iTDeviceNamesReferences"],
    queryFn: findAllITDeviceNames,
  });

  const {
    isPending: isPendingHardwareBrand,
    isError: isErrorHardwareBrand,
    data: hardwareBrandReferences,
    error: errorHardwareBrand,
  } = useQuery({
    queryKey: ["hardwareBrandsReferences"],
    queryFn: findAllHardwareBrands,
  });

  const {
    isPending: isPendingITDeviceLine,
    isError: isErrorITDeviceLine,
    data: iTDeviceLineReferences,
    error: errorITDeviceLine,
  } = useQuery({
    queryKey: ["iTDeviceLineReferences"],
    queryFn: findAllITDeviceLines,
  });

  const {
    isPending: isPendingHardwareSerie,
    isError: isErrorHardwareSerie,
    data: hardwareSerieReferences,
    error: errorHardwareSerie,
  } = useQuery({
    queryKey: ["hardwareSerieReferences"],
    queryFn: findAllHardwareSeries,
  });

  const {
    isPending: isPendingRoom,
    isError: isErrorRoom,
    data: roomReferences,
    error: errorRoom,
  } = useQuery({
    queryKey: ["roomReferences"],
    queryFn: findAllRooms,
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
            controlId="itDevicePhotoInput"
          >
            <Form.Label>Foto del dispositivo TI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la URL de la foto."
              defaultValue={itDeviceData.image || ""}
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
            controlId="itDeviceNameInput"
          >
            <Form.Label>Nombre del dispositivo TI</Form.Label>
            <Form.Select
              {...register("hardwareDetails.hardwareName.idHardwareName")}
              defaultValue={
                itDeviceData.hardwareDetails.hardwareName.idHardwareName || ""
              }
            >
              <option disabled value="">
                {isPendingITDeviceName
                  ? "Cargando nombres de dispositivos TI..."
                  : "Seleccione el nombre de dispositivos TI"}
              </option>
              {!isPendingITDeviceName &&
                !isErrorITDeviceName &&
                iTDeviceNameReferences.data?.map((itDeviceName) => (
                  <option
                    key={itDeviceName.idHardwareName}
                    value={itDeviceName.idHardwareName}
                  >
                    {itDeviceName.name}
                  </option>
                ))}
            </Form.Select>
            {errors.hardwareName?.idHardwareName && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareName.idHardwareName.message}
              </Alert>
            )}
            {isErrorITDeviceName && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los nombres de dispositivos TI:{" "}
                {errorITDeviceName.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="itDeviceBrandInput"
          >
            <Form.Label>Marca del dispositivo TI</Form.Label>
            <Form.Select
              {...register("hardwareDetails.hardwareBrand.idHardwareBrand")}
              defaultValue={
                itDeviceData.hardwareDetails.hardwareBrand.idHardwareBrand || ""
              }
            >
              <option disabled value="">
                {isPendingITDeviceName
                  ? "Cargando marcas de dispositivos TI..."
                  : "Seleccione la marca de dispositivos TI"}
              </option>
              {!isPendingHardwareBrand &&
                !isErrorHardwareBrand &&
                hardwareBrandReferences.data?.map((itDeviceBrand) => (
                  <option
                    key={itDeviceBrand.idHardwareBrand}
                    value={itDeviceBrand.idHardwareBrand}
                  >
                    {itDeviceBrand.brand}
                  </option>
                ))}
            </Form.Select>
            {errors.hardwareBrand?.idHardwareBrand && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareBrand.idHardwareBrand.message}
              </Alert>
            )}
            {isErrorHardwareBrand && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las marcas de dispositivos TI:{" "}
                {errorHardwareBrand.message}
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
            controlId="itDeviceLineInput"
          >
            <Form.Label>Linea del dispositivo TI</Form.Label>
            <Form.Select
              {...register("hardwareDetails.hardwareLine.idHardwareLine")}
              defaultValue={
                itDeviceData.hardwareDetails.hardwareLine.idHardwareLine || ""
              }
            >
              <option disabled value="">
                {isPendingITDeviceName
                  ? "Cargando lineas de dispositivos TI..."
                  : "Seleccione las linea de dispositivos TI"}
              </option>
              {!isPendingITDeviceLine &&
                !isErrorITDeviceLine &&
                iTDeviceLineReferences.data?.map((itDeviceLine) => (
                  <option
                    key={itDeviceLine.idHardwareLine}
                    value={itDeviceLine.idHardwareLine}
                  >
                    {itDeviceLine.lineName}
                  </option>
                ))}
            </Form.Select>
            {errors.hardwareLine?.idHardwareLine && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareLine.idHardwareLine.message}
              </Alert>
            )}
            {isErrorITDeviceLine && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las lineas de dispositivos TI:{" "}
                {errorITDeviceLine.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="itDeviceSerieInput"
          >
            <Form.Label>Serie del dispositivo TI</Form.Label>
            <Form.Select
              {...register("hardwareDetails.hardwareSerie.idHardwareSerie")}
              defaultValue={
                itDeviceData.hardwareDetails.hardwareSerie.idHardwareSerie || ""
              }
            >
              <option disabled value="">
                {isPendingHardwareSerie
                  ? "Cargando series de dispositivos TI..."
                  : "Seleccione la serie de dispositivos TI"}
              </option>
              {!isPendingHardwareSerie &&
                !isErrorHardwareSerie &&
                hardwareSerieReferences.data?.map((itDeviceSerie) => (
                  <option
                    key={itDeviceSerie.idHardwareSerie}
                    value={itDeviceSerie.idHardwareSerie}
                  >
                    {itDeviceSerie.serie}
                  </option>
                ))}
            </Form.Select>
            {errors.hardwareSerie?.idHardwareSerie && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareSerie.idHardwareSerie.message}
              </Alert>
            )}
            {isErrorHardwareSerie && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las series de dispositivos TI:{" "}
                {errorHardwareSerie.message}
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
            controlId="itDeviceSerialNumberInput"
          >
            <Form.Label>Número de serie del dispositivo TI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el número de serie del dispositivo TI"
              {...register("hardwareDetails.serialNumber")}
              defaultValue={itDeviceData.hardwareDetails.serialNumber || ""}
            />
            {errors.hardwareDetails?.serialNumber && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareDetails.serialNumber.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="itDeviceDescriptionInput"
          >
            <Form.Label>Descripción del dispositivo TI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción del dispositivo TI"
              {...register("hardwareDetails.description")}
              defaultValue={itDeviceData.hardwareDetails.description || ""}
            />
            {errors.hardwareDetails?.description && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareDetails.description.message}
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
            controlId="itDevicePhysicalStatusInput"
          >
            <Form.Label>Estado físico del dispositivo TI</Form.Label>
            <Form.Select
              {...register("hardwareDetails.physicalStatus")}
              defaultValue={itDeviceData.hardwareDetails.physicalStatus || ""}
            >
              <option disabled value="">
                Seleccione el estado físico del dispositivo
              </option>
              {Object.entries(PhysicalStatusEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
            {errors.hardwareDetails?.physicalStatus && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareDetails.physicalStatus.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="itDeviceOperationalStatusInput"
          >
            <Form.Label>Estado operativo del dispositivo TI</Form.Label>
            <Form.Select
              {...register("hardwareDetails.operationalStatus")}
              defaultValue={
                itDeviceData.hardwareDetails.operationalStatus || ""
              }
            >
              <option disabled value="">
                Seleccione el estado operativo del dispositivo
              </option>
              {Object.entries(OperationalStatusEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
            {errors.hardwareDetails?.operationalStatus && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareDetails.operationalStatus.message}
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
            controlId="itDevicePurchaseDateInput"
          >
            <Form.Label>Fecha de compra del dispositivo TI</Form.Label>
            <Form.Control
              type="date"
              {...register("hardwareDetails.purchaseDate")}
              defaultValue={itDeviceData.hardwareDetails.purchaseDate || ""}
            />
            {errors.hardwareDetails?.purchaseDate && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareDetails.purchaseDate.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="itDeviceWarrantyEndDateInput"
          >
            <Form.Label>
              Fecha de finalización de la garantía del dispositivo TI
            </Form.Label>
            <Form.Control
              type="date"
              {...register("hardwareDetails.warrantyEndDate")}
              defaultValue={itDeviceData.hardwareDetails.warrantyEndDate || ""}
            />
            {errors.hardwareDetails?.warrantyEndDate && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareDetails.warrantyEndDate.message}
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
            controlId="itDevicePurchaseDateInput"
          >
            <Form.Label>Habitación asignada</Form.Label>

            <Form.Select
              {...register("room.id")}
              defaultValue={itDeviceData.room.id || ""}
            >
              <option disabled value="">
                {isPendingRoom
                  ? "Cargando habitaciones..."
                  : "Seleccione las habitaciones"}
              </option>
              {!isPendingRoom &&
                !isErrorRoom &&
                roomReferences.data?.map((room) => (
                  <option key={room.id} value={room.id}>
                    {[RoomTypesEnum[room?.roomType], room.name, room.number]
                      .filter(Boolean)
                      .join(" - ")}
                  </option>
                ))}
            </Form.Select>
            {errors.room?.id && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.room.id.message}
              </Alert>
            )}
            {isErrorRoom && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las habitaciónes: {errorRoom.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="itDeviceWarrantyEndDateInput"
          ></Form.Group>
        </Container>
      </Form>
    </>
  );
};

export default ITDeviceUpdateForm;
