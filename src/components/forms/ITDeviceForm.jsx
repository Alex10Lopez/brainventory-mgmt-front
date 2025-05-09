import { Form, Alert } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";
import { useEffect, useRef, useState } from "react";
import {
  findAllITDeviceNames,
  findAllHardwareBrands,
  findAllITDeviceLines,
  findAllHardwareSeries,
} from "../../api/assets/hardwareService";
import { findAllRooms } from "../../api/infrastructure/roomService";
import {
  PhysicalStatusEnum,
  OperationalStatusEnum,
} from "../../data/enums/hardwareEnums";
import { useQuery } from "@tanstack/react-query";
import InventoryFormSection from "../InventoryFormSection";
import { RoomTypesEnum } from "../../data/enums/roomEnums";

const ITDeviceForm = ({ mode = "create", readData = null, onSubmit }) => {
  const windowWidth = useWindowWidth();
  const imageInputRef = useRef(null);
  const [localImageFile, setLocalImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    control,
  } = useForm();

  // Reset form with initial data when in update mode
  useEffect(() => {
    if (mode === "update" && readData) {
      reset(readData);
    }
  }, [mode, readData, reset, setValue]);

  const {
    isPending: isPendingITDeviceName,
    isError: isErrorITDeviceName,
    data: itDeviceNameReferences,
    error: errorITDeviceName,
  } = useQuery({
    queryKey: ["itDeviceNamesReferences"],
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
    data: itDeviceLineReferences,
    error: errorITDeviceLine,
  } = useQuery({
    queryKey: ["itDeviceLineReferences"],
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

  const roomItDevice = useWatch({
    control,
    name: "room.id",
  });
  const hasInitialRoom = mode === "update" && readData?.room?.id;
  const disableRoomPlaceholder = !roomItDevice && !hasInitialRoom;

  const purchaseDate = useWatch({
    control,
    name: "hardwareDetails.purchaseDate",
  });

  const handleFormSubmit = () => {
    const formData = getValues();
    const imageFile = formData.imageFile;

    const itDeviceData = {
      ...formData,
      room: formData.room?.id ? { id: formData.room.id } : null,
      imageFile: undefined,
    };

    console.log(JSON.stringify(itDeviceData, null, 2));

    onSubmit({
      itDevice: itDeviceData,
      image: imageFile,
    });
  };

  return (
    <Form
      id={`${mode}-form`}
      className="form-modal"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Photo Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Foto del dispositivo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={(e) => {
                const file = e.target.files[0] || null;
                setValue("imageFile", file);
                setLocalImageFile(file);
              }}
            />
            {(localImageFile || (mode === "update" && readData?.image)) && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={() => {
                  setValue("imageFile", null);
                  setLocalImageFile(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                  }
                }}
              >
                Quitar imagen
              </button>
            )}
          </>
        }
        rightContent={
          <>
            {(localImageFile || (mode === "update" && readData?.image)) && (
              <div className="d-flex flex-column align-items-center mt-2">
                <img
                  src={
                    localImageFile
                      ? URL.createObjectURL(localImageFile)
                      : readData.image.startsWith("http")
                      ? readData.image
                      : `http://localhost:9010${readData.image}`
                  }
                  alt="Vista previa de la foto del edificio"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )}
          </>
        }
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
                {isPendingITDeviceName
                  ? "Cargando tipos de dispositivos..."
                  : "Seleccione un tipo (ej: Laptop, Servidor, etc.)"}
              </option>
              {!isPendingITDeviceName &&
                !isErrorITDeviceName &&
                itDeviceNameReferences.data?.map((itDeviceName) => (
                  <option
                    key={itDeviceName.idHardwareName}
                    value={itDeviceName.idHardwareName}
                  >
                    {itDeviceName.name}
                  </option>
                ))}
            </Form.Select>
            {isErrorITDeviceName && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los tipos de dispositivos:{" "}
                {errorITDeviceName.message}
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
                hardwareBrandReferences.data?.map((itDeviceBrand) => (
                  <option
                    key={itDeviceBrand.idHardwareBrand}
                    value={itDeviceBrand.idHardwareBrand}
                  >
                    {itDeviceBrand.brand}
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
                {isPendingITDeviceLine
                  ? "Cargando líneas..."
                  : "Seleccione una línea"}
              </option>
              {!isPendingITDeviceLine &&
                !isErrorITDeviceLine &&
                itDeviceLineReferences.data?.map((itDeviceLine) => (
                  <option
                    key={itDeviceLine.idHardwareLine}
                    value={itDeviceLine.idHardwareLine}
                  >
                    {itDeviceLine.lineName}
                  </option>
                ))}
            </Form.Select>
            {isErrorITDeviceLine && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las líneas: {errorITDeviceLine.message}
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

      {/* Room section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Ubicación (Habitación)</Form.Label>
            <Form.Select
              defaultValue={mode === "update" ? readData?.room?.id || "" : ""}
              isInvalid={!!errors.room?.id}
              {...register("room.id")}
            >
              <option disabled={disableRoomPlaceholder} value="">
                {isPendingRoom
                  ? "Cargando ubicaciones..."
                  : roomItDevice || hasInitialRoom
                  ? "Quitar ubicación"
                  : "Seleccione una ubicación (opcional)"}
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
            {isErrorRoom && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar las ubicaciones: {errorRoom.message}
              </Alert>
            )}
          </>
        }
        leftError={errors.room?.id?.message}
      />
    </Form>
  );
};

export default ITDeviceForm;
