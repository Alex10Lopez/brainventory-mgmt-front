import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { findAllBuildings } from "../../api/infrastructure/buildingService";
import { findAllDepartments } from "../../api/infrastructure/departmentService";
import { useQuery } from "@tanstack/react-query";
import { RoomTypesEnum } from "../../data/enums/roomEnums";
import { roomNumbers } from "../../data/constants/roomNumbers";
import InventoryFormSection from "../InventoryFormSection";
import useWindowWidth from "../hooks/useWindowWidth";
import { useEffect, useRef, useState } from "react";

const RoomForm = ({ mode = "create", readData = null, onSubmit }) => {
  const windowWidth = useWindowWidth();
  const imageInputRef = useRef(null);
  const [localImageFile, setLocalImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    if (mode === "update" && readData) {
      reset(readData);
    }
  }, [mode, readData, reset, setValue]);
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

  const numberRoom = useWatch({ control, name: "number" });
  const hasInitialNumber = mode === "update" && readData?.number;
  const disableNumberPlaceholder = !numberRoom && !hasInitialNumber;

  const secondaryDepartment = useWatch({ control, name: "departments[1].id" });
  const hasInitialSecondaryDepartment =
    mode === "update" && readData?.departments?.[1]?.id;
  const disableSecondaryPlaceholder =
    !secondaryDepartment && !hasInitialSecondaryDepartment;

  const handleFormSubmit = () => {
    const formData = getValues();
    const imageFile = formData.imageFile;

    const roomata = {
      ...formData,
      imageFile: undefined,
      departments: (formData.departments || []).filter(
        (dept, index) =>
          (index === 0 ? dept?.id && dept.id !== "" : true) &&
          (index !== 0 ? !dept || (dept.id && dept.id !== "") : true)
      ),
    };

    console.log(JSON.stringify(roomata, null, 2));

    onSubmit({
      room: roomata,
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
            <Form.Label>Foto de la sala/espacio</Form.Label>
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
                      : `http://localhost:9000${readData.image}`
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
      {/* Room Type and Name Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Tipo de sala/espacio</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.roomType?.toString() || "" : ""
              }
              isInvalid={!!errors.roomType}
              {...register("roomType", {
                required: "Debe seleccionar un tipo de sala/espacio",
              })}
            >
              <option disabled value="">
                Seleccione el tipo de sala/espacio
              </option>
              {Object.entries(RoomTypesEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </>
        }
        leftError={errors.roomType?.message}
        rightContent={
          <>
            <Form.Label>Nombre identificador</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Sala de juntas A, Laboratorio 3"
              defaultValue={mode === "update" ? readData?.name || "" : ""}
              isInvalid={!!errors.name}
              {...register("name", {
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres permitidos",
                },
                pattern: {
                  value: /^[\p{L}\d\s'-]+$/u,
                  message:
                    "Solo letras, números, espacios, guiones y apóstrofes",
                },
              })}
            />
          </>
        }
        rightError={errors.name?.message}
      />
      {/* Room number and Max capacity */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Número de sala</Form.Label>
            <Form.Select
              defaultValue={mode === "update" ? readData?.number || "" : ""}
              isInvalid={!!errors.number}
              {...register("number")}
            >
              <option disabled={disableNumberPlaceholder} value="">
                {numberRoom || hasInitialNumber
                  ? "Quitar número asignado"
                  : "Seleccione un número"}
              </option>
              {roomNumbers.map((roomNumber, index) => (
                <option key={index} value={roomNumber}>
                  {roomNumber}
                </option>
              ))}
            </Form.Select>
          </>
        }
        rightContent={
          <>
            <Form.Label>Capacidad máxima de personas</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="1000"
              placeholder="Ejemplo: 20"
              defaultValue={
                mode === "update" ? readData?.capacityMax || "" : ""
              }
              isInvalid={!!errors.capacityMax}
              {...register("capacityMax", {
                min: {
                  value: 1,
                  message: "El valor mínimo es 1",
                },
                max: {
                  value: 50,
                  message: "El valor máximo permitido es 50",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Solo números enteros positivos",
                },
              })}
            />
          </>
        }
        rightError={errors.capacityMax?.message}
      />
      {/* Building and Floor label */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Edificio</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.building?.id.toString() || "" : ""
              }
              isInvalid={!!errors.building?.id}
              {...register("building.id", {
                required: "Debe seleccionar un edificio",
              })}
            >
              <option disabled value="">
                {isPendingBuilding
                  ? "Cargando lista de edificios..."
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
            {isErrorBuilding && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar los edificios: {errorBuilding.message}
              </Alert>
            )}
          </>
        }
        leftError={errors.building?.id?.message}
        rightContent={
          <>
            <Form.Label>Nivel/Piso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Planta Baja, Piso 3, Sótano 1"
              defaultValue={mode === "update" ? readData?.floorLabel || "" : ""}
              isInvalid={!!errors.floorLabel}
              {...register("floorLabel", {
                required: "Debe especificar el nivel/piso",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres permitidos",
                },
                pattern: {
                  value: /^[\p{L}\d\s-]+$/u,
                  message: "Solo letras, números, espacios y guiones",
                },
              })}
            />
          </>
        }
        rightError={errors.floorLabel?.message}
      />
      {/* Description */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Descripción de la sala/espacio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ejemplo: Sala equipada con proyector, 20 sillas y mesa de reuniones. Acceso para personas con movilidad reducida."
              defaultValue={
                mode === "update" ? readData?.description || "" : ""
              }
              isInvalid={!!errors.description}
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Máximo 500 caracteres permitidos",
                },
              })}
            />
          </>
        }
        leftError={errors.description?.message}
      />
      {/* Departments */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Departamento/Área 1</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.departments?.[0]?.id?.toString() || ""
                  : ""
              }
              isInvalid={!!errors.departments?.[0]?.id}
              {...register("departments[0].id", {
                required: "Debe seleccionar al menos un departamento/área",
              })}
            >
              <option disabled value="">
                {isPendingDepartment
                  ? "Cargando departamentos..."
                  : "Seleccione departamento/área 1"}
              </option>
              {!isPendingDepartment &&
                !isErrorDepartment &&
                departmentReferences.data?.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </Form.Select>
            {isErrorDepartment && (
              <Alert key="warning" variant="warning" className="mt-2 p-2">
                Error al cargar departamentos: {errorDepartment.message}
              </Alert>
            )}
          </>
        }
        leftError={errors.departments?.[0]?.id?.message}
        rightContent={
          <>
            <Form.Label>Departamento/Área secundario</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.departments?.[1]?.id?.toString() || ""
                  : ""
              }
              isInvalid={!!errors.departments?.[1]?.id}
              {...register("departments[1].id")}
            >
              <option disabled={disableSecondaryPlaceholder} value="">
                {isPendingDepartment
                  ? "Cargando departamentos..."
                  : secondaryDepartment || hasInitialSecondaryDepartment
                  ? "Quitar departamento secundario"
                  : "Seleccione el departamento/área 2 (opcional)"}
              </option>
              {!isPendingDepartment &&
                !isErrorDepartment &&
                departmentReferences.data?.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </Form.Select>
          </>
        }
        rightError={errors.departments?.[1]?.id?.message}
      />
    </Form>
  );
};

export default RoomForm;
