import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../../hooks/useWindowWidth";
import {
  findAllIODeviceNames,
  findAllHardwareBrands,
  findAllIODeviceLines,
  findAllHardwareSeries,
} from "../../../api/assets/hardwareService";
import { findAllITDevices } from "../../../api/assets/itDeviceService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  PhysicalStatusEnum,
  OperationalStatusEnum,
} from "../../../data/enums/hardwareEnums";

const IODeviceUpdateForm = ({ readData, onSubmit }) => {
  const windowWidth = useWindowWidth();

  const ioDeviceData = readData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (ioDeviceData) {
      reset(ioDeviceData);
    }
  }, [ioDeviceData, reset]);

  const formValues = useWatch({
    control,
  });

  const {
    isPending: isPendingIODeviceName,
    isError: isErrorIODeviceName,
    data: ioDeviceNameReferences,
    error: errorIODeviceName,
  } = useQuery({
    queryKey: ["ioDeviceNamesReferences"],
    queryFn: findAllIODeviceNames,
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
    isPending: isPendingIODeviceLine,
    isError: isErrorIODeviceLine,
    data: ioDeviceLineReferences,
    error: errorIODeviceLine,
  } = useQuery({
    queryKey: ["ioDeviceLineReferences"],
    queryFn: findAllIODeviceLines,
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
    isPending: isPendingIIDevice,
    isError: isErrorIIDevice,
    data: itDeviceReferences,
    error: errorIIDevice,
  } = useQuery({
    queryKey: ["itDeviceReferences"],
    queryFn: findAllITDevices,
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
            controlId="ioDevicePhotoInput"
          >
            <Form.Label>Foto del dispositivo E/S</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la URL de la foto."
              defaultValue={ioDeviceData.image || ""}
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
            controlId="ioDeviceNameInput"
          >
            <Form.Label>Nombre del dispositivo E/S</Form.Label>
            <Form.Select
              {...register("hardwareDetails.hardwareName.idHardwareName")}
              defaultValue={
                ioDeviceData.hardwareDetails.hardwareName.idHardwareName || ""
              }
            >
              <option disabled value="">
                {isPendingIODeviceName
                  ? "Cargando nombres de dispositivos E/S..."
                  : "Seleccione el nombre de dispositivos E/S"}
              </option>
              {!isPendingIODeviceName &&
                !isErrorIODeviceName &&
                ioDeviceNameReferences.data?.map((ioDeviceName) => (
                  <option
                    key={ioDeviceName.idHardwareName}
                    value={ioDeviceName.idHardwareName}
                  >
                    {ioDeviceName.name}
                  </option>
                ))}
            </Form.Select>
            {errors.hardwareName?.idHardwareName && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareName.idHardwareName.message}
              </Alert>
            )}
            {isErrorIODeviceName && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los nombres de dispositivos E/S:{" "}
                {errorIODeviceName.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="ioDeviceBrandInput"
          >
            <Form.Label>Marca del dispositivo E/S</Form.Label>
            <Form.Select
              {...register("hardwareDetails.hardwareBrand.idHardwareBrand")}
              defaultValue={
                ioDeviceData.hardwareDetails.hardwareBrand.idHardwareBrand || ""
              }
            >
              <option disabled value="">
                {isPendingIODeviceName
                  ? "Cargando marcas de dispositivos E/S..."
                  : "Seleccione la marca de dispositivos E/S"}
              </option>
              {!isPendingHardwareBrand &&
                !isErrorHardwareBrand &&
                hardwareBrandReferences.data?.map((ioDeviceBrand) => (
                  <option
                    key={ioDeviceBrand.idHardwareBrand}
                    value={ioDeviceBrand.idHardwareBrand}
                  >
                    {ioDeviceBrand.brand}
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
                Error al cargar las marcas de dispositivos E/S:{" "}
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
            controlId="ioDeviceLineInput"
          >
            <Form.Label>Linea del dispositivo E/S</Form.Label>
            <Form.Select
              {...register("hardwareDetails.hardwareLine.idHardwareLine")}
              defaultValue={
                ioDeviceData.hardwareDetails.hardwareLine.idHardwareLine || ""
              }
            >
              <option disabled value="">
                {isPendingIODeviceName
                  ? "Cargando lineas de dispositivos E/S..."
                  : "Seleccione las linea de dispositivos E/S"}
              </option>
              {!isPendingIODeviceLine &&
                !isErrorIODeviceLine &&
                ioDeviceLineReferences.data?.map((ioDeviceLine) => (
                  <option
                    key={ioDeviceLine.idHardwareLine}
                    value={ioDeviceLine.idHardwareLine}
                  >
                    {ioDeviceLine.lineName}
                  </option>
                ))}
            </Form.Select>
            {errors.hardwareLine?.idHardwareLine && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.hardwareLine.idHardwareLine.message}
              </Alert>
            )}
            {isErrorIODeviceLine && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las lineas de dispositivos E/S:{" "}
                {errorIODeviceLine.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="ioDeviceSerieInput"
          >
            <Form.Label>Serie del dispositivo E/S</Form.Label>
            <Form.Select
              {...register("hardwareDetails.hardwareSerie.idHardwareSerie")}
              defaultValue={
                ioDeviceData.hardwareDetails.hardwareSerie.idHardwareSerie || ""
              }
            >
              <option disabled value="">
                {isPendingHardwareSerie
                  ? "Cargando series de dispositivos E/S..."
                  : "Seleccione la serie de dispositivos E/S"}
              </option>
              {!isPendingHardwareSerie &&
                !isErrorHardwareSerie &&
                hardwareSerieReferences.data?.map((ioDeviceSerie) => (
                  <option
                    key={ioDeviceSerie.idHardwareSerie}
                    value={ioDeviceSerie.idHardwareSerie}
                  >
                    {ioDeviceSerie.serie}
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
                Error al cargar las series de dispositivos E/S:{" "}
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
            controlId="ioDeviceSerialNumberInput"
          >
            <Form.Label>Número de serie del dispositivo E/S</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el número de serie del dispositivo E/S"
              {...register("hardwareDetails.serialNumber")}
              defaultValue={ioDeviceData.hardwareDetails.serialNumber || ""}
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
            controlId="ioDeviceDescriptionInput"
          >
            <Form.Label>Descripción del dispositivo E/S</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción del dispositivo E/S"
              {...register("hardwareDetails.description")}
              defaultValue={ioDeviceData.hardwareDetails.description || ""}
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
            controlId="ioDevicePhysicalStatusInput"
          >
            <Form.Label>Estado físico del dispositivo E/S</Form.Label>
            <Form.Select
              {...register("hardwareDetails.physicalStatus")}
              defaultValue={ioDeviceData.hardwareDetails.physicalStatus || ""}
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
            controlId="ioDeviceOperationalStatusInput"
          >
            <Form.Label>Estado operativo del dispositivo E/S</Form.Label>
            <Form.Select
              {...register("hardwareDetails.operationalStatus")}
              defaultValue={
                ioDeviceData.hardwareDetails.operationalStatus || ""
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
            controlId="ioDevicePurchaseDateInput"
          >
            <Form.Label>Fecha de compra del dispositivo E/S</Form.Label>
            <Form.Control
              type="date"
              {...register("hardwareDetails.purchaseDate")}
              defaultValue={ioDeviceData.hardwareDetails.purchaseDate || ""}
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
            controlId="ioDeviceWarrantyEndDateInput"
          >
            <Form.Label>
              Fecha de finalización de la garantía del dispositivo E/S
            </Form.Label>
            <Form.Control
              type="date"
              {...register("hardwareDetails.warrantyEndDate")}
              defaultValue={ioDeviceData.hardwareDetails.warrantyEndDate || ""}
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
            controlId="ioDevicePurchaseDateInput"
          >
            <Form.Label>Dispositivo TI enlazado</Form.Label>
            <Form.Select
              {...register("itDevice.id")}
              defaultValue={ioDeviceData.itDevice.id || ""}
            >
              <option disabled value="">
                {isPendingIIDevice
                  ? "Cargando dispositivos TI..."
                  : "Seleccione el dispositivo TI"}
              </option>
              {!isPendingIIDevice &&
                !isErrorIIDevice &&
                itDeviceReferences.data?.map((itDevice) => (
                  <option key={itDevice.id} value={itDevice.id}>
                    {itDevice.hardwareDetails.hardwareName.name}{" "}
                    {itDevice.hardwareDetails.hardwareBrand.brand}{" "}
                    {itDevice.hardwareDetails.hardwareLine.lineName}{" "}
                    {itDevice.hardwareDetails.hardwareSerie.serie} -{" "}
                    {itDevice.hardwareDetails.serialNumber}
                  </option>
                ))}
            </Form.Select>
            {errors.itDevice?.id && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.itDevice.id.message}
              </Alert>
            )}
            {isErrorIIDevice && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los dispositivos TI: {errorIIDevice.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="ioDeviceWarrantyEndDateInput"
          ></Form.Group>
        </Container>
      </Form>
    </>
  );
};

export default IODeviceUpdateForm;
