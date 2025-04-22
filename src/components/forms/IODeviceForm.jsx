import { Form, Alert } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";
import {
  findAllHardwareBrands,
  findAllHardwareSeries,
  findAllIODeviceLines,
  findAllIODeviceNames,
} from "../../api/assets/hardwareService";
import { findAllITDevices } from "../../api/assets/itDeviceService";
import {
  PhysicalStatusEnum,
  OperationalStatusEnum,
} from "../../data/enums/hardwareEnums";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import InventoryFormSection from "../InventoryFormSection";

const IODeviceForm = ({ mode = "create", readData = null, onSubmit }) => {
  const windowWidth = useWindowWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
  } = useForm();

  // Watch purchase date for warranty validation using useWatch
  const purchaseDate = useWatch({
    control,
    name: "hardwareDetails.purchaseDate",
  });

  // Reset form with initial data when in update mode
  useEffect(() => {
    if (mode === "update" && readData) {
      reset(readData);
    }
  }, [mode, readData, reset]);

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

  const itDevice = useWatch({
    control,
    name: "itDevice.id",
  });
  const hasInitialItDevice = mode === "update" && readData?.itDevice?.id;
  const disableItDevicePlaceholder = !itDevice && !hasInitialItDevice;

  const handleFormSubmit = () => {
    const formData = getValues();

    const formValuesToSubmit = {
      ...formData,
      itDevice:
        formData.itDevice && formData.itDevice.id !== ""
          ? { id: formData.itDevice.id }
          : null,
    };

    console.log(JSON.stringify(formValuesToSubmit, null, 2));
    onSubmit(formValuesToSubmit);
  };

  return (
    <Form
      id={`${mode}-form`}
      className="form-modal"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Photo Section  */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Foto del dispositivo TI</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen (ejemplo: https://ejemplo.com/foto.jpg)"
              defaultValue={mode === "update" ? readData?.image || "" : ""}
              isInvalid={!!errors.image}
              {...register("image")}
            />
          </>
        }
        leftError={errors.image?.message}
      />

      {/* Name and Brand section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Tipo de dispositivo</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.hardwareDetails?.hardwareName?.idHardwareName ||
                    ""
                  : ""
              }
              isInvalid={!!errors.hardwareDetails?.hardwareName?.idHardwareName}
              {...register("hardwareDetails.hardwareName.idHardwareName", {
                required: "El tipo de dispositivo es obligatorio",
              })}
            >
              <option disabled value="">
                {isPendingIODeviceName
                  ? "Cargando tipos de dispositivos..."
                  : "Seleccione un tipo (ej: Monito, Mouse, Keyboard.)"}
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
            {isErrorIODeviceName && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los tipos de dispositivos:{" "}
                {errorIODeviceName.message}
              </Alert>
            )}
          </>
        }
        leftError={
          errors.hardwareDetails?.hardwareName?.idHardwareName?.message
        }
        rightContent={
          <>
            <Form.Label>Marca del dispositivo</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.hardwareDetails?.hardwareBrand?.idHardwareBrand ||
                    ""
                  : ""
              }
              isInvalid={
                !!errors.hardwareDetails?.hardwareBrand?.idHardwareBrand
              }
              {...register("hardwareDetails.hardwareBrand.idHardwareBrand", {
                required: "La marca del dispositivo es obligatoria",
              })}
            >
              <option disabled value="">
                {isPendingHardwareBrand
                  ? "Cargando marcas..."
                  : "Seleccione una marca"}
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
            {isErrorHardwareBrand && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las marcas: {errorHardwareBrand.message}
              </Alert>
            )}
          </>
        }
        rightError={
          errors.hardwareDetails?.hardwareBrand?.idHardwareBrand?.message
        }
      />

      {/* Line and Serie section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Línea del dispositivo</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.hardwareDetails?.hardwareLine?.idHardwareLine ||
                    ""
                  : ""
              }
              isInvalid={!!errors.hardwareDetails?.hardwareLine?.idHardwareLine}
              {...register("hardwareDetails.hardwareLine.idHardwareLine", {
                required: "La línea del dispositivo es obligatoria",
              })}
            >
              <option disabled value="">
                {isPendingIODeviceLine
                  ? "Cargando líneas..."
                  : "Seleccione una línea"}
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
            {isErrorIODeviceLine && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las líneas: {errorIODeviceLine.message}
              </Alert>
            )}
          </>
        }
        leftError={
          errors.hardwareDetails?.hardwareLine?.idHardwareLine?.message
        }
        rightContent={
          <>
            <Form.Label>Serie del dispositivo</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.hardwareDetails?.hardwareSerie?.idHardwareSerie ||
                    ""
                  : ""
              }
              isInvalid={
                !!errors.hardwareDetails?.hardwareSerie?.idHardwareSerie
              }
              {...register("hardwareDetails.hardwareSerie.idHardwareSerie", {
                required: "La serie del dispositivo es obligatoria",
              })}
            >
              <option disabled value="">
                {isPendingHardwareSerie
                  ? "Cargando series..."
                  : "Seleccione una serie"}
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
            {isErrorHardwareSerie && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las series: {errorHardwareSerie.message}
              </Alert>
            )}
          </>
        }
        rightError={
          errors.hardwareDetails?.hardwareSerie?.idHardwareSerie?.message
        }
      />

      {/* Serial number and Description section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Número de serie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el número de serie único del dispositivo"
              defaultValue={
                mode === "update"
                  ? readData?.hardwareDetails?.serialNumber || ""
                  : ""
              }
              isInvalid={!!errors.hardwareDetails?.serialNumber}
              {...register("hardwareDetails.serialNumber", {
                required: "El número de serie es obligatorio",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
                pattern: {
                  value: /^[a-zA-Z0-9-]+$/,
                  message: "Solo letras, números y guiones",
                },
              })}
            />
          </>
        }
        leftError={errors.hardwareDetails?.serialNumber?.message}
        rightContent={
          <>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Detalles adicionales (ej: Especificaciones técnicas, accesorios incluidos, observaciones)"
              defaultValue={
                mode === "update"
                  ? readData?.hardwareDetails?.description || ""
                  : ""
              }
              isInvalid={!!errors.hardwareDetails?.description}
              {...register("hardwareDetails.description", {
                maxLength: {
                  value: 500,
                  message: "Máximo 500 caracteres permitidos",
                },
              })}
            />
          </>
        }
        rightError={errors.hardwareDetails?.description?.message}
      />

      {/* Physical status and Operational status section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Estado físico</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.hardwareDetails?.physicalStatus || ""
                  : ""
              }
              isInvalid={!!errors.hardwareDetails?.physicalStatus}
              {...register("hardwareDetails.physicalStatus", {
                required: "El estado físico es obligatorio",
              })}
            >
              <option disabled value="">
                Seleccione el estado físico
              </option>
              {Object.entries(PhysicalStatusEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </>
        }
        leftError={errors.hardwareDetails?.physicalStatus?.message}
        rightContent={
          <>
            <Form.Label>Estado operativo</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.hardwareDetails?.operationalStatus || ""
                  : ""
              }
              isInvalid={!!errors.hardwareDetails?.operationalStatus}
              {...register("hardwareDetails.operationalStatus", {
                required: "El estado operativo es obligatorio",
              })}
            >
              <option disabled value="">
                Seleccione el estado operativo
              </option>
              {Object.entries(OperationalStatusEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </>
        }
        rightError={errors.hardwareDetails?.operationalStatus?.message}
      />

      {/* Purchase date and Warranty end date section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Fecha de compra</Form.Label>
            <Form.Control
              type="date"
              defaultValue={
                mode === "update" && readData?.hardwareDetails?.purchaseDate
                  ? new Date(readData.hardwareDetails.purchaseDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              isInvalid={!!errors.hardwareDetails?.purchaseDate}
              {...register("hardwareDetails.purchaseDate", {
                required: "La fecha de compra es obligatoria",
                validate: {
                  notFuture: (value) => {
                    if (!value) return true;
                    const selectedDate = new Date(value);
                    const today = new Date();
                    return (
                      selectedDate <= today || "No puede ser una fecha futura"
                    );
                  },
                },
              })}
            />
          </>
        }
        leftError={errors.hardwareDetails?.purchaseDate?.message}
        rightContent={
          <>
            <Form.Label>Fin de garantía</Form.Label>
            <Form.Control
              type="date"
              defaultValue={
                mode === "update" && readData?.hardwareDetails?.warrantyEndDate
                  ? new Date(readData.hardwareDetails.warrantyEndDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              isInvalid={!!errors.hardwareDetails?.warrantyEndDate}
              {...register("hardwareDetails.warrantyEndDate", {
                required: "La fecha de fin de garantía es obligatoria",
                validate: {
                  afterPurchase: (value) => {
                    if (!value || !purchaseDate) return true;
                    const warrantyDate = new Date(value);
                    const purchase = new Date(purchaseDate);
                    return (
                      warrantyDate >= purchase ||
                      "Debe ser posterior a la fecha de compra"
                    );
                  },
                },
              })}
            />
          </>
        }
        rightError={errors.hardwareDetails?.warrantyEndDate?.message}
      />

      {/* IT Device Section  */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Dispositivo TI enlazado</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.itDevice?.id || "" : ""
              }
              isInvalid={!!errors.itDevice?.id}
              {...register("itDevice.id")}
            >
              <option disabled={disableItDevicePlaceholder} value="">
                {isPendingIIDevice
                  ? "Cargando dispositivo TI..."
                  : itDevice || hasInitialItDevice
                  ? "Quitar dispositivo TI"
                  : "Seleccione un dispositivo TI (opcional)"}
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
            {isErrorIIDevice && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los dispositivos TI: {errorIIDevice.message}
              </Alert>
            )}
          </>
        }
        leftError={errors.itDevice?.id?.message}
      />
    </Form>
  );
};

export default IODeviceForm;
