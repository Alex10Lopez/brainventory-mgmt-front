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

const EmployeeForm = ({ mode = "create", readData = null, onSubmit }) => {
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
    if (mode === "update" && readData) {
      reset(readData);
    }
  }, [mode, readData, reset]);

  const formValues = useWatch({
    control,
  });

  // Fetch job roles
  const {
    isPending: isPendingJobRole,
    isError: isErrorJobRole,
    data: jobRoleReferences,
    error: errorJobRole,
  } = useQuery({
    queryKey: ["jobRoleReferences"],
    queryFn: findAllJobRole,
  });

  const secondaryJobRole = useWatch({ control, name: "jobRoles[1].id" });
  const hasInitialSecondaryRole =
    mode === "update" && readData?.jobRoles?.[1]?.id;
  const disableSecondaryPlaceholder =
    !secondaryJobRole && !hasInitialSecondaryRole;

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const showPassword = useWatch({
    control,
    name: "showPassword",
    defaultValue: false,
  });

  // Auto-generate email when in create mode
  useEffect(() => {
    if (mode === "create" && formValues.name && formValues.lastname) {
      const normalizeText = (text) => {
        return text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ñ/g, "n")
          .replace(/Ñ/g, "N");
      };

      const name = normalizeText(formValues.name.trim().toLowerCase()).split(
        " "
      );
      const lastnames = normalizeText(
        formValues.lastname.trim().toLowerCase()
      ).split(" ");

      const randomNumber = Math.floor(Math.random() * 90) + 10;

      let email = "";
      if (lastnames.length === 1) {
        email = `${name[0]}.${lastnames[0]}.${randomNumber}@brainventory.com`;
      } else {
        const secondLastName = lastnames[1];
        const secondInitials =
          secondLastName.length > 1
            ? secondLastName.slice(0, 2)
            : secondLastName;
        email = `${name[0]}.${lastnames[0]}${secondInitials}.${randomNumber}@brainventory.com`;
      }

      setValue("contacts[0].email", email);
    }
  }, [mode, formValues.name, formValues.lastname, setValue]);

  const handleFormSubmit = () => {
    const formData = getValues();

    const formValuesToSubmit = {
      ...formData,
      ...(mode === "update" && {
        password: formData.password ? formData.password : undefined,
        verifyPassword: undefined,
      }),
      jobRoles: (formData.jobRoles || [])
        .filter((role) => role.id !== "")
        .filter(
          (role, index) => mode === "update" || index === 0 || role.id !== ""
        ),
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
      id={`${mode}-form`}
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
              defaultValue={mode === "update" ? readData?.image || "" : ""}
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
              placeholder="Nombre"
              defaultValue={mode === "update" ? readData?.name || "" : ""}
              isInvalid={!!errors.name}
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es obligatorio",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 70,
                  message: "El nombre no puede exceder los 70 caracteres",
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
        leftError={errors.name?.message}
        rightContent={
          <>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellidos completos"
              defaultValue={mode === "update" ? readData?.lastname || "" : ""}
              isInvalid={!!errors.lastname}
              {...register("lastname", {
                required: {
                  value: true,
                  message: "Los apellidos son obligatorios",
                },
                minLength: {
                  value: 2,
                  message: "Los apellidos deben tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 70,
                  message: "Los apellidos no pueden exceder los 70 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\s'-]+$/u,
                  message:
                    "Los apellidos solo pueden contener letras, espacios, guiones y apóstrofes",
                },
              })}
            />
          </>
        }
        rightError={errors.lastname?.message}
      />

      {/* Birth Date and Sex Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              defaultValue={
                mode === "update" && readData?.dateOfBirth
                  ? new Date(readData.dateOfBirth).toISOString().split("T")[0]
                  : ""
              }
              isInvalid={!!errors.dateOfBirth}
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "La fecha de nacimiento es obligatoria",
                },
                validate: {
                  validDate: (value) => {
                    if (!value) return true;
                    const birthDate = new Date(value);
                    const today = new Date();
                    const minDate = new Date();
                    minDate.setFullYear(today.getFullYear() - 100);

                    if (birthDate > today) {
                      return "No puede ser una fecha futura";
                    }
                    if (birthDate < minDate) {
                      return "La edad máxima permitida es 100 años";
                    }

                    // Calcular edad exacta
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    if (
                      monthDiff < 0 ||
                      (monthDiff === 0 && today.getDate() < birthDate.getDate())
                    ) {
                      age--;
                    }

                    if (age < 16) {
                      return "Debe tener al menos 16 años de edad";
                    }
                    return true;
                  },
                },
              })}
            />
          </>
        }
        leftError={errors.dateOfBirth?.message}
        rightContent={
          <>
            <Form.Label>Sexo</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.sex?.toString() || "" : ""
              }
              isInvalid={!!errors.sex}
              {...register("sex", {
                required: "El sexo es obligatorio",
              })}
            >
              <option disabled value="">
                Seleccione una opción
              </option>
              {Object.entries(SexEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </>
        }
        rightError={errors.sex?.message}
      />

      {/* Nationality and Permissions Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Nacionalidad</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.nationality || "" : ""
              }
              isInvalid={!!errors.nationality}
              {...register("nationality", {
                required: "La nacionalidad es obligatoria",
                validate: (value) =>
                  demonymEs.includes(value) ||
                  "Seleccione una nacionalidad válida",
              })}
            >
              <option disabled value="">
                Seleccione la nacionalidad
              </option>
              {demonymEs.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
          </>
        }
        leftError={errors.nationality?.message}
        rightContent={
          <>
            <Form.Label>Permisos del sistema</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.permissions?.toString() || "" : ""
              }
              isInvalid={!!errors.permissions}
              {...register("permissions", {
                required: "Los permisos son obligatorios",
              })}
            >
              <option disabled value="">
                Seleccione el tipo de permisos
              </option>
              {Object.entries(PermissionsEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </>
        }
        rightError={errors.permissions?.message}
      />

      {/* Status and Salary Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Status</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.status?.toString() || "" : ""
              }
              isInvalid={!!errors.status}
              {...register("status", {
                required: "El estado es obligatorio",
              })}
            >
              <option disabled value="">
                Seleccione el estado
              </option>
              {Object.entries(StatusEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </>
        }
        leftError={errors.status?.message}
        rightContent={
          <>
            <Form.Label>Salario mensual (USD)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              max="99999999.99"
              placeholder="Monto en USD (ejemplo: 1500.00)"
              defaultValue={mode === "update" ? readData?.salary || "" : ""}
              isInvalid={!!errors.salary}
              {...register("salary", {
                required: "El salario es requerido",
                min: {
                  value: 0,
                  message: "El salario no puede ser negativo",
                },
                max: {
                  value: 99999999.99,
                  message: "El salario no puede exceder 99,999,999.99",
                },
                validate: (value) =>
                  /^\d{1,8}(\.\d{1,2})?$/.test(value) ||
                  "Formato inválido (máximo 8 enteros y 2 decimales)",
              })}
            />
          </>
        }
        rightError={errors.salary?.message}
      />

      {/* Job Roles Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Puesto principal</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.jobRoles?.[0]?.id || "" : ""
              }
              isInvalid={!!errors.jobRoles?.[0]?.id}
              {...register("jobRoles[0].id", {
                required: "El puesto principal es obligatorio",
                validate: (value) =>
                  value !== "" || "Seleccione un puesto principal válido",
              })}
            >
              <option disabled value="">
                {isPendingJobRole
                  ? "Cargando puestos..."
                  : "Seleccione el puesto principal"}
              </option>
              {!isPendingJobRole &&
                !isErrorJobRole &&
                jobRoleReferences.data?.map((jobRole) => (
                  <option key={jobRole.id} value={jobRole.id}>
                    {jobRole.name}
                  </option>
                ))}
            </Form.Select>
            {isErrorJobRole && (
              <Alert variant="warning" className="mt-2 p-2">
                Error al cargar los puestos: {errorJobRole.message}
              </Alert>
            )}
          </>
        }
        leftError={errors.jobRoles?.[0]?.id?.message}
        rightContent={
          <>
            <Form.Label>
              Puesto secundario{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Select
              defaultValue={
                mode === "update"
                  ? readData?.jobRoles?.[1]?.id?.toString() || ""
                  : ""
              }
              isInvalid={!!errors.jobRoles?.[1]?.id}
              {...register("jobRoles[1].id")}
            >
              <option disabled={disableSecondaryPlaceholder} value="">
                {isPendingJobRole
                  ? "Cargando puestos..."
                  : secondaryJobRole || hasInitialSecondaryRole
                  ? "Quitar puesto secundario"
                  : "Seleccione el puesto secundario"}
              </option>
              {!isPendingJobRole &&
                !isErrorJobRole &&
                jobRoleReferences.data?.map((jobRole) => (
                  <option key={jobRole.id} value={jobRole.id}>
                    {jobRole.name}
                  </option>
                ))}
            </Form.Select>
            {isErrorJobRole && (
              <Alert variant="warning" className="mt-2 p-2">
                Error al cargar los puestos: {errorJobRole.message}
              </Alert>
            )}
          </>
        }
        rightError={errors.jobRoles?.[1]?.id?.message}
      />

      {/* Primary Contact Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Teléfono principal</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Formato internacional (ejemplo: +52 55 1234 5678)"
              defaultValue={
                mode === "update"
                  ? readData?.contacts?.[0]?.phoneNumber || ""
                  : ""
              }
              isInvalid={!!errors.contacts?.[0]?.phoneNumber}
              {...register("contacts[0].phoneNumber", {
                required: "El teléfono principal es requerido",
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
              })}
            />
          </>
        }
        leftError={errors.contacts?.[0]?.phoneNumber?.message}
        rightContent={
          <>
            <Form.Label>Correo empresarial</Form.Label>
            <Form.Control
              type="email"
              disabled
              placeholder={"Se generará automáticamente"}
              defaultValue={
                mode === "update" ? readData?.contacts?.[0]?.email || "" : ""
              }
              {...register("contacts[0].email")}
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
              defaultValue={
                mode === "update"
                  ? readData?.contacts?.[1]?.phoneNumber || ""
                  : ""
              }
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
              defaultValue={
                mode === "update" ? readData?.contacts?.[1]?.email || "" : ""
              }
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
              defaultValue={
                mode === "update" ? readData?.addresses?.[0]?.street || "" : ""
              }
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
              defaultValue={
                mode === "update"
                  ? readData?.addresses?.[0]?.streetNumber || ""
                  : ""
              }
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
              defaultValue={
                mode === "update"
                  ? readData?.addresses?.[0]?.postalCode || ""
                  : ""
              }
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
              defaultValue={
                mode === "update" ? readData?.addresses?.[0]?.city || "" : ""
              }
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
              defaultValue={
                mode === "update"
                  ? readData?.addresses?.[0]?.countryState || ""
                  : ""
              }
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
              defaultValue={
                mode === "update" ? readData?.addresses?.[0]?.country || "" : ""
              }
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
              defaultValue={
                mode === "update"
                  ? readData?.addresses?.[0]?.reference || ""
                  : ""
              }
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

      {/* Password Section */}
      {mode === "create" ? (
        <>
          <InventoryFormSection
            windowWidth={windowWidth}
            leftContent={
              <>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  isInvalid={!!errors.password}
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 8,
                      message: "Mínimo 8 caracteres",
                    },
                    maxLength: {
                      value: 255,
                      message: "Máximo 255 caracteres",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Debe contener mayúsculas, minúsculas, números y caracter especial",
                    },
                  })}
                />
              </>
            }
            leftError={errors.password?.message}
            rightContent={
              <>
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Repita la contraseña"
                  isInvalid={!!errors.verifyPassword}
                  {...register("verifyPassword", {
                    required: "La confirmación es requerida",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                />
              </>
            }
            rightError={errors.verifyPassword?.message}
          />
        </>
      ) : (
        <>
          <InventoryFormSection
            windowWidth={windowWidth}
            leftContent={
              <>
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Opcional - mínimo 8 caracteres"
                  isInvalid={!!errors.password}
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "Mínimo 8 caracteres (opcional)",
                    },
                    maxLength: {
                      value: 255,
                      message: "Máximo 255 caracteres",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Debe contener mayúsculas, minúsculas, números y caracter especial",
                    },
                  })}
                />
                {errors.password && (
                  <Form.Text className="text-muted">
                    {errors.password.message}
                  </Form.Text>
                )}
              </>
            }
            leftError={errors.password?.message}
            rightContent={
              <>
                <Form.Label>Confirmar nueva contraseña</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Repita solo si cambió la contraseña"
                  isInvalid={!!errors.verifyPassword}
                  {...register("verifyPassword", {
                    validate: (value) =>
                      !password ||
                      value === password ||
                      "Las contraseñas no coinciden",
                  })}
                />
              </>
            }
            rightError={errors.verifyPassword?.message}
          />
        </>
      )}

      {/* Show Password Checkbox - sin cambios */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Mostrar contraseña</Form.Label>
            <Form.Check type="checkbox" {...register("showPassword")} />
          </>
        }
      />
    </Form>
  );
};

export default EmployeeForm;
