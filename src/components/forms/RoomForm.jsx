import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { findAllBuildings } from "../../api/infrastructure/buildingService";
import { findAllDepartments } from "../../api/infrastructure/departmentService";
import { useQuery } from "@tanstack/react-query";
import { RoomTypesEnum } from "../../data/enums/roomEnums";
import { roomNumbers } from "../../data/constants/roomNumbers";
import FormSection from "../FormSection";
import useWindowWidth from "../hooks/useWindowWidth";
import { useEffect } from "react";

const RoomForm = ({ mode = "create", readData = null, onSubmit }) => {
  const windowWidth = useWindowWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

  // Reset form with initial data when in update mode
  useEffect(() => {
    if (mode === "update" && readData) {
      reset(readData);
    }
  }, [mode, readData, reset]);

  const formValues = useWatch({
    control,
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

  const handleFormSubmit = (data) => {
    const formValuesToSubmit = {
      ...data,
      departments: (data.departments || []).filter(
        (dept) => dept?.id && dept.id !== ""
      ),
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
      {/* Photo Section */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Foto de la sala/espacio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: https://ejemplo.com/imagen-sala.jpg"
              defaultValue={mode === "update" ? readData?.image || "" : ""}
              isInvalid={!!errors.image}
              {...register("image")}
            />
          </>
        }
        leftError={errors.image?.message}
      />

      {/* Room Type and Name Section */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Tipo de sala/espacio*</Form.Label>
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
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Número de sala</Form.Label>
            <Form.Select
              defaultValue={mode === "update" ? readData?.number || "" : ""}
              isInvalid={!!errors.number}
              {...register("number")}
            >
              <option value="">
                {mode === "update" && readData?.number
                  ? "Eliminar número asignado"
                  : "Seleccione un número o deje en blanco"}
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
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Edificio*</Form.Label>
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
            <Form.Label>Nivel/Piso*</Form.Label>
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
      <FormSection
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
      <FormSection
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
              <option value="">
                {mode === "update" && readData?.departments?.[1]?.id
                  ? "Quitar departamento secundario"
                  : isPendingDepartment
                  ? "Cargando departamentos..."
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
