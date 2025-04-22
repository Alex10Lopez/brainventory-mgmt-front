import { Form, Alert } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";
import countriesEs from "../../data/constants/countriesEs";
import demonymEs from "../../data/constants/demonymEs";
import {
  SexEnum,
  PermissionsEnum,
  StatusEnum,
} from "../../data/enums/employeeEnums";
import { findAllJobRole } from "../../api/humanResources/jobRoleService";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import InventoryFormSection from "../InventoryFormSection";
import InventoryViewSection from "../InventoryViewSection";

const ProfileForm = ({ readData = null, onSubmit }) => {
  const windowWidth = useWindowWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    getValues,
  } = useForm();

  // Reset form with initial data when in update mode
  useEffect(() => {
    if (readData) {
      reset(readData);
    }
  }, [readData, reset]);

  const formValues = useWatch({
    control,
  });

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const showPassword = useWatch({
    control,
    name: "showPassword",
    defaultValue: false,
  });

  const handleFormSubmit = () => {
    const formData = getValues();

    const formValuesToSubmit = {
      ...formData,
      ...{
        password: formData.password ? formData.password : undefined,
        verifyPassword: undefined,
      },
      contacts: (formData.contacts || []).filter(
        (contact, index) =>
          (index === 0 ? contact.phoneNumber : true) &&
          (!contact || contact.phoneNumber || contact.email)
      ),
      showPassword: undefined,
    };

    console.log(JSON.stringify(formValuesToSubmit, null, 2));
    onSubmit(formValuesToSubmit);
  };

  return (
    <Form
      id="profile-form"
      className="form-modal"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Photo Section  */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Foto del empleado</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen (ejemplo: https://ejemplo.com/foto.jpg)"
              defaultValue={readData?.image || ""}
              isInvalid={!!errors.image}
              {...register("image")}
            />
          </>
        }
        leftError={errors.image?.message}
      />

      {/* Name Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              disabled
              defaultValue={readData?.name || ""}
            />
          </>
        }
        rightContent={
          <>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              disabled
              defaultValue={readData?.lastname || ""}
            />
          </>
        }
      />

      {/* Birth Date and Sex Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              disabled
              defaultValue={
                readData?.dateOfBirth
                  ? new Date(readData.dateOfBirth).toISOString().split("T")[0]
                  : ""
              }
            />
          </>
        }
        rightContent={
          <>
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              disabled
              defaultValue={readData?.sex?.toString() || ""}
            />
          </>
        }
      />

      {/* Nationality and Permissions Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Nacionalidad</Form.Label>
            <Form.Control disabled defaultValue={readData?.nationality || ""} />
          </>
        }
        rightContent={
          <>
            <Form.Label>Permisos del sistema</Form.Label>
            <Form.Control
              disabled
              defaultValue={readData?.permissions?.toString() || ""}
            />
          </>
        }
      />

      {/* Status and Salary Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Status</Form.Label>
            <Form.Control
              disabled
              defaultValue={readData?.status?.toString() || ""}
            />
          </>
        }
        rightContent={
          <>
            <Form.Label>Salario mensual (USD)</Form.Label>
            <Form.Control
              type="number"
              disabled
              defaultValue={readData?.salary || ""}
            />
          </>
        }
      />

      {/* Job Roles Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Puesto principal</Form.Label>
            <Form.Control
              disabled
              defaultValue={readData?.jobRoles?.[0]?.id || ""}
            />
          </>
        }
        rightContent={
          <>
            <Form.Label>
              Puesto secundario{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              disabled
              defaultValue={readData?.jobRoles?.[1]?.id?.toString() || ""}
            />
          </>
        }
      />

      {/* Primary Contact Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Teléfono principal</Form.Label>
            <Form.Control
              type="tel"
              disabled
              defaultValue={readData?.contacts?.[0]?.phoneNumber || ""}
            />
          </>
        }
        rightContent={
          <>
            <Form.Label>Correo empresarial</Form.Label>
            <Form.Control
              type="email"
              disabled
              defaultValue={readData?.contacts?.[0]?.email || ""}
            />
          </>
        }
      />

      {/* Secondary Contact Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>
              Teléfono secundario{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Formato internacional (opcional)"
              defaultValue={readData?.contacts?.[1]?.phoneNumber || ""}
              isInvalid={!!errors.contacts?.[1]?.phoneNumber}
              {...register("contacts[1].phoneNumber", {
                minLength: {
                  value: 10,
                  message: "Mínimo 10 caracteres",
                },
                maxLength: {
                  value: 25,
                  message: "Máximo 25 caracteres",
                },
                pattern: {
                  value: /^\+?[\d\s\-()]+$/,
                  message: "Formato de teléfono inválido",
                },
                validate: (value) =>
                  !value ||
                  value.length >= 10 ||
                  "Si ingresa un teléfono, debe tener al menos 10 caracteres",
              })}
            />
          </>
        }
        leftError={errors.contacts?.[1]?.phoneNumber?.message}
        rightContent={
          <>
            <Form.Label>
              Correo personal <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo personal (opcional)"
              defaultValue={readData?.contacts?.[1]?.email || ""}
              isInvalid={!!errors.contacts?.[1]?.email}
              {...register("contacts[1].email", {
                minLength: {
                  value: 5,
                  message: "Mínimo 5 caracteres",
                },
                maxLength: {
                  value: 255,
                  message: "Máximo 255 caracteres",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo inválido",
                },
                validate: (value) =>
                  !value ||
                  value.length >= 5 ||
                  "Si ingresa un correo, debe tener al menos 5 caracteres",
              })}
            />
          </>
        }
        rightError={errors.contacts?.[1]?.email?.message}
      />

      {/* Address Street Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la calle (ejemplo: Av. Reforma)"
              defaultValue={readData?.addresses?.[0]?.street || ""}
              isInvalid={!!errors.addresses?.[0]?.street}
              {...register("addresses[0].street", {
                required: "La calle es requerida",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "Máximo 100 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\d\s.,'-]+$/u,
                  message:
                    "La calle solo puede contener letras, números, espacios, puntos, comas, guiones o apóstrofes",
                },
              })}
            />
          </>
        }
        leftError={errors.addresses?.[0]?.street?.message}
        rightContent={
          <>
            <Form.Label>
              Número <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Número exterior/interior (opcional)"
              defaultValue={readData?.addresses?.[0]?.streetNumber || ""}
              isInvalid={!!errors.addresses?.[0]?.streetNumber}
              {...register("addresses[0].streetNumber", {
                maxLength: {
                  value: 20,
                  message: "Máximo 20 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\d\s/-]+$/u,
                  message:
                    "El número solo puede contener letras, números, espacios, guiones o '/'",
                },
              })}
            />
          </>
        }
        rightError={errors.addresses?.[0]?.streetNumber?.message}
      />

      {/* Address Postal Code and City Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Código postal (ejemplo: 75008)"
              defaultValue={readData?.addresses?.[0]?.postalCode || ""}
              isInvalid={!!errors.addresses?.[0]?.postalCode}
              {...register("addresses[0].postalCode", {
                required: "El código postal es requerido",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "Máximo 20 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\d\s\-]+$/u,
                  message: "Solo letras, números, espacios y guiones",
                },
              })}
            />
          </>
        }
        leftError={errors.addresses?.[0]?.postalCode?.message}
        rightContent={
          <>
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la ciudad (ejemplo: Pachuca)"
              defaultValue={readData?.addresses?.[0]?.city || ""}
              isInvalid={!!errors.addresses?.[0]?.city}
              {...register("addresses[0].city", {
                required: "La ciudad es requerida",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\s'-]+$/u,
                  message: "Solo letras, espacios, guiones o apóstrofes",
                },
              })}
            />
          </>
        }
        rightError={errors.addresses?.[0]?.city?.message}
      />

      {/* Address State and Country Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Estado/Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del estado/provincia (ejemplo: Hidalgo)"
              defaultValue={readData?.addresses?.[0]?.countryState || ""}
              isInvalid={!!errors.addresses?.[0]?.countryState}
              {...register("addresses[0].countryState", {
                required: "El estado/provincia es requerido",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\s'-]+$/u,
                  message: "Solo letras, espacios, guiones o apóstrofes",
                },
              })}
            />
          </>
        }
        leftError={errors.addresses?.[0]?.countryState?.message}
        rightContent={
          <>
            <Form.Label>País</Form.Label>
            <Form.Select
              defaultValue={readData?.addresses?.[0]?.country || ""}
              isInvalid={!!errors.addresses?.[0]?.country}
              {...register("addresses[0].country", {
                required: "El país es requerido",
                validate: (value) =>
                  countriesEs.includes(value) || "Seleccione un país válido",
              })}
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
          </>
        }
        rightError={errors.addresses?.[0]?.country?.message}
      />

      {/* Address Reference Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>
              Referencia <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Puntos de referencia cercanos (ejemplo: A 2 cuadras del parque central)"
              defaultValue={readData?.addresses?.[0]?.reference || ""}
              isInvalid={!!errors.addresses?.[0]?.reference}
              {...register("addresses[0].reference", {
                maxLength: {
                  value: 250,
                  message: "Máximo 250 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\d\s.,;:()'"¡!¿?\-#\/]+$/u,
                  message: "Solo texto común: letras, números y signos básicos",
                },
              })}
            />
          </>
        }
        leftError={errors.addresses?.[0]?.reference?.message}
      />
    </Form>
  );
};

export default ProfileForm;
