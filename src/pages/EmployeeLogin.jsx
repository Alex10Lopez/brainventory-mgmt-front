import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useForm, useWatch } from "react-hook-form";

function EmployeeLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const showPassword = useWatch({
    control,
    name: "showPassword",
    defaultValue: false,
  });

  const onSubmit = handleSubmit((data) => {
    const { showPassword, ...loginData } = data;
    console.log(loginData);
  });

  return (
    <>
      <Container
        fluid
        className="container-employee-login d-flex flex-column justify-content-center align-items-center w-100 mt-3"
      >
        <Card className="card-login bg-body-tertiary">
          <Card.Header>
            <h1 className="card-header-login text-center text-primary">
              Inicio de sesión de empleado
            </h1>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit} className="form-login">
              <Form.Group
                className="form-group-1 mb-3"
                controlId="form-control-id-1"
              >
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu correo electrónico.",
                    },
                    minLength: {
                      value: 5,
                      message:
                        "El correo electrónico debe tener al menos 3 caracteres.",
                    },
                    maxLength: {
                      value: 254,
                      message:
                        "El correo electrónico no debe exceder los 254 caracteres.",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message:
                        "El formato del correo electrónico no es válido.",
                    },
                  })}
                />
                {errors.email && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.email.message}
                  </Alert>
                )}
              </Form.Group>

              <Form.Group
                className="form-group-2 mb-3"
                controlId="form-control-id-2"
              >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu contraseña.",
                    },
                    minLength: {
                      value: 8,
                      message:
                        "La contraseña debe tener al menos 8 caracteres.",
                    },
                    maxLength: {
                      value: 128,
                      message:
                        "La contraseña no debe exceder los 128 caracteres.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/,
                      message:
                        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.",
                    },
                  })}
                />
                {errors.password && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.password.message}
                  </Alert>
                )}
              </Form.Group>

              <Form.Group
                className=" form-group-3 mb-3"
                controlId="form-control-id-3"
              >
                <Form.Label>Mostrar contraseña</Form.Label>
                <Form.Check type="checkbox" {...register("showPassword")} />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Iniciar sesión
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default EmployeeLogin;
