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

  const formValuesToSubmit = {
    ...formValues,
  };

  const handleFormSubmit = () => {
    onSubmit(formValuesToSubmit);
  };

  return (
    <Form
      id={`${mode}-form`}
      className="form-modal"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Photo Section  */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Foto</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen (ejemplo: https://ejemplo.com/foto.jpg)"
              defaultValue={mode === "update" ? readData?.image || "" : ""}
              isInvalid={!!errors.image}
              {...register("image", {
                validate: (value) => {
                  if (!value) return true;
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return "Ingrese una URL válida";
                  }
                },
              })}
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
            <Form.Label>Nombre</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.roomType?.toString() || "" : ""
              }
              isInvalid={!!errors.roomType}
              {...register("roomType", {
                required: "El tipo de habitación es obligatorio",
              })}
            >
              <option disabled value="">
                Seleccione el tipo de habitación
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
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              defaultValue={mode === "update" ? readData?.name || "" : ""}
              isInvalid={!!errors.name}
              {...register("name", {
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\s'-]+$/u,
                  message:
                    "El nombre solo puede contener letras, espacios, guiones y apóstrofes",
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
            <Form.Label>Número de la habitación</Form.Label>
            <Form.Select
              defaultValue={mode === "update" ? readData?.number || "" : ""}
              isInvalid={!!errors.number}
              {...register("number")}
            >
              <option disabled value="">
                Seleccione el número de la habitación
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
            <Form.Label>Capacidad máxima de la habitación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la capacidad máxima de la habitación"
              defaultValue={
                mode === "update" ? readData?.capacityMax || "" : ""
              }
              isInvalid={!!errors.capacityMax}
              {...register("capacityMax")}
            />
          </>
        }
        rightError={errors.capacityMax?.message}
      />

      {/* Room number and Max capacity */}
      <FormSection
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
                required: "El edificio es obligatorio",
              })}
            >
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
          </>
        }
        leftError={errors.building?.id}
        rightContent={
          <>
            <Form.Label>Nivel de piso</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nivel de piso"
              defaultValue={mode === "update" ? readData?.floorLabel || "" : ""}
              isInvalid={!!errors.image}
              {...register("floorLabel")}
            />
          </>
        }
        rightError={errors.floorLabel?.message}
      />
    </Form>
  );
};

export default RoomForm;
