import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";
import FormSection from "../FormSection";
import countriesEs from "../../data/constants/countriesEs";
import { useEffect } from "react";

const BuildingForm = ({ mode = "create", readData = null, onSubmit }) => {
  const windowWidth = useWindowWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (mode === "update" && readData) {
      reset(readData);
    }
  }, [mode, readData, reset]);

  const formValues = useWatch({
    control,
  });

  const formValuesToSubmit = {
    ...formValues,
  };

  const handleFormSubmit = () => {
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
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Foto del edificio</Form.Label>
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

      {/* Name and Number of Floors Section  */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Torre Empresarial Continental"
              defaultValue={mode === "update" ? readData?.name || "" : ""}
              isInvalid={!!errors.name}
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es obligatorio",
                },
                minLength: {
                  value: 1,
                  message: "El nombre debe tener al menos 1 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres",
                },
                pattern: {
                  value: /^[\p{L}\d\s'-]+$/u,
                  message:
                    "El nombre solo puede contener letras, números, espacios, guiones y apóstrofes",
                },
              })}
            />
          </>
        }
        leftError={errors.name?.message}
        rightContent={
          <>
            <Form.Label>Número de pisos</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ejemplo: 25"
              defaultValue={
                mode === "update" ? readData?.numberOfFloors || "" : ""
              }
              isInvalid={!!errors.numberOfFloors}
              {...register("numberOfFloors", {
                required: "El número de pisos es obligatorio",
                min: {
                  value: 1,
                  message: "El edificio debe tener al menos 1 piso",
                },
                valueAsNumber: true,
                validate: (value) =>
                  Number.isInteger(Number(value)) ||
                  "Debe ser un número entero",
              })}
            />
          </>
        }
        rightError={errors.numberOfFloors?.message}
      />

      {/* Description */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Descripción del edificio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ejemplo: Edificio corporativo con 25 pisos, acabados de lujo, sistema de seguridad 24/7, áreas comunes amplias y estacionamiento subterráneo."
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

      {/* Address Street Section */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la calle (ejemplo: Av. Reforma)"
              defaultValue={
                mode === "update" ? readData?.address?.street || "" : ""
              }
              isInvalid={!!errors.address?.street}
              {...register("address.street", {
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
        leftError={errors.address?.street?.message}
        rightContent={
          <>
            <Form.Label>
              Número <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Número exterior/interior (opcional)"
              defaultValue={
                mode === "update" ? readData?.address?.streetNumber || "" : ""
              }
              isInvalid={!!errors.address?.streetNumber}
              {...register("address.streetNumber", {
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
        rightError={errors.address?.streetNumber?.message}
      />

      {/* Address Postal Code and City Section */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Código postal (ejemplo: 75008)"
              defaultValue={
                mode === "update" ? readData?.address?.postalCode || "" : ""
              }
              isInvalid={!!errors.address?.postalCode}
              {...register("address.postalCode", {
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
        leftError={errors.address?.postalCode?.message}
        rightContent={
          <>
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la ciudad (ejemplo: Pachuca)"
              defaultValue={
                mode === "update" ? readData?.address?.city || "" : ""
              }
              isInvalid={!!errors.address?.city}
              {...register("address.city", {
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
        rightError={errors.address?.city?.message}
      />

      {/* Address State and Country Section */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Estado/Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del estado/provincia (ejemplo: Hidalgo)"
              defaultValue={
                mode === "update" ? readData?.address?.countryState || "" : ""
              }
              isInvalid={!!errors.address?.countryState}
              {...register("address.countryState", {
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
        leftError={errors.address?.countryState?.message}
        rightContent={
          <>
            <Form.Label>País</Form.Label>
            <Form.Select
              defaultValue={
                mode === "update" ? readData?.address?.country || "" : ""
              }
              isInvalid={!!errors.address?.country}
              {...register("address.country", {
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
        rightError={errors.address?.country?.message}
      />

      {/* Address Reference Section */}
      <FormSection
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
                mode === "update" ? readData?.address?.reference || "" : ""
              }
              isInvalid={!!errors.address?.reference}
              {...register("address.reference", {
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
        leftError={errors.address?.reference?.message}
      />
    </Form>
  );
};

export default BuildingForm;
