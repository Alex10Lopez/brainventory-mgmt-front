import { Form, Alert } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";
import demonymEs from "../../data/constants/demonymEs";
import { SexEnum } from "../../data/enums/employeeEnums";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import InventoryFormSection from "../InventoryFormSection";
import { findAllJobRole } from "../../api/humanResources/jobRoleService";

const GlobalAdminForm = ({ onSubmit }) => {
  const windowWidth = useWindowWidth();
  const imageInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    getValues,
  } = useForm();

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

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const showPassword = useWatch({
    control,
    name: "showPassword",
    defaultValue: false,
  });

  // Auto-generate email when in create mode
  useEffect(() => {
    if (formValues.name && formValues.lastname) {
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
  }, [formValues.name, formValues.lastname, setValue]);

  const handleFormSubmit = () => {
    const formData = getValues();
    const imageFile = formData.imageFile;

    const adminData = {
      ...formData,
      password: formData.password || undefined,
      verifyPassword: undefined,
      showPassword: undefined,
      imageFile: undefined,
    };

    onSubmit({ admin: adminData, image: imageFile });
  };

  return (
    <Form
      id="global-admin-form"
      className="form-modal"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Name Section */}
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
            <Form.Control defaultValue="Administrador Global" disabled />
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
            <Form.Control defaultValue="Activo" disabled />
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
              placeholder="Se generará automáticamente"
              {...register("contacts[0].email")}
            />
          </>
        }
      />

      {/* Password Section */}
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

export default GlobalAdminForm;
