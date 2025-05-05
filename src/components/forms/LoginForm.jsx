import { Form, Alert, Container } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";

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
      <Container fluid className="px-0 mb-3">
        <Form.Group className="w-100">
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
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.email.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Container>

      <Container fluid className="px-0 mb-3">
        <Form.Group className="w-100">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            isInvalid={!!errors.password}
            {...register("password", {
              required: "La contraseña es requerida",
            })}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Container>

      <Container fluid className="px-0 mb-3">
        <Form.Group className="w-100">
          <Form.Label>Mostrar contraseña</Form.Label>
          <Form.Check type="checkbox" {...register("showPassword")} />
        </Form.Group>
      </Container>
    </Form>
  );
};

export default LoginForm;
