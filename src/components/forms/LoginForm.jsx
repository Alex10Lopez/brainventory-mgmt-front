import { Form, Alert } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";
import demonymEs from "../../data/constants/demonymEs";
import { SexEnum } from "../../data/enums/employeeEnums";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import InventoryFormSection from "../InventoryFormSection";
import { findAllJobRole } from "../../api/humanResources/jobRoleService";

const LoginForm = ({ onSubmit }) => {
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
      email: formData.email,
      password: formData.password,
    };

    console.log(JSON.stringify(formValuesToSubmit, null, 2));
    onSubmit(formData);
  };

  return (
    <Form
      id="login-form"
      className="form-modal"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Correo empresarial</Form.Label>
            <Form.Control
              type="email"
              placeholder="Se generará automáticamente"
              {...register("email", {
                required: "El correo empresarial es requerido",
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
        leftError={errors.contacts?.[0]?.email?.message}
        rightContent={
          <>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              isInvalid={!!errors.password}
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
          </>
        }
        rightError={errors.password?.message}
      />

      <InventoryFormSection
        windowWidth={windowWidth}
        leftContent={
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
        leftError={errors.verifyPassword?.message}
        rightContent={
          <>
            <Form.Label>Mostrar contraseña</Form.Label>
            <Form.Check type="checkbox" {...register("showPassword")} />
          </>
        }
      />
    </Form>
  );
};

export default LoginForm;
