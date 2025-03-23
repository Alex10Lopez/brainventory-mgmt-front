import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

function AdminRegister() {
  const [isSmallerScreen, setIsSmallerScreen] = useState(window.innerWidth);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const password = useWatch({ control, name: "password", defaultValue: "" });

  const showPassword = useWatch({
    control,
    name: "showPassword",
    defaultValue: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSmallerScreen(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallerScreen]);

  const onSubmit = handleSubmit((data) => {
    const { showPassword, verifyPassword, ...registerData } = data;
    console.log(registerData);
  });

  return (
    <>
      <Container
        fluid
        className="container-admin-register d-flex flex-column justify-content-center align-items-center w-100 mt-3"
      >
        <Card
          className={`bg-body-tertiary ${
            isSmallerScreen < 768
              ? "w-100"
              : isSmallerScreen < 1200
              ? "card-form-60w"
              : "card-form-40w"
          }`}
        >
          <Card.Header>
            <h1 className="card-header-admin-register text-center text-primary">
              Registro de administrador
            </h1>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit} className="form-admin-register">
              <Container
                fluid
                className={`fields-container d-flex ${
                  isSmallerScreen < 576
                    ? "flex-column"
                    : "flex-row justify-content-between"
                } px-0 w-100`}
              >
                <Form.Group
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "pe-2"
                  } w-100`}
                  controlId="form-control-id-1"
                >
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu nombre.",
                      },
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 caracteres.",
                      },
                      maxLength: {
                        value: 50,
                        message: "El nombre no debe exceder los 50 caracteres.",
                      },
                      pattern: {
                        value: /^[A-Za-zÁáÉéÍíÓóÚúÑñüÜ\s-]{3,50}$/,
                        message: "El formato del nombre no es válido.",
                      },
                    })}
                  />
                  {errors.name && (
                    <Alert key="danger" variant="danger" className="mt-2 p-2">
                      {errors.name.message}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "ps-2"
                  } w-100`}
                >
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu apellido"
                    {...register("lastname", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu apellido.",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "El apellido debe tener al menos 3 caracteres.",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "El apellido no debe exceder los 50 caracteres.",
                      },
                      pattern: {
                        value: /^[A-Za-zÁáÉéÍíÓóÚúÑñüÜ\s-]{3,50}$/,
                        message: "El formato del apellido no es válido.",
                      },
                    })}
                  />
                  {errors.lastname && (
                    <Alert key="danger" variant="danger" className="mt-2 p-2">
                      {errors.lastname.message}
                    </Alert>
                  )}
                </Form.Group>
              </Container>

              <Container
                fluid
                className={`fields-container d-flex ${
                  isSmallerScreen < 576
                    ? "flex-column"
                    : "flex-row justify-content-between"
                } px-0 w-100`}
              >
                <Form.Group
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "pe-2"
                  } w-100`}
                >
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("dateOfBirth", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu fecha de nacimiento.",
                      },
                      validate: (value) => {
                        const valueDate = new Date(value);
                        const currentDate = new Date();

                        const age =
                          currentDate.getFullYear() - valueDate.getFullYear();

                        if (age < 18 || age > 100)
                          return "La fecha de nacimiento no es válida.";
                      },
                    })}
                  />
                  {errors.dateOfBirth && (
                    <Alert key="danger" variant="danger" className="mt-2 p-2">
                      {errors.dateOfBirth.message}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "ps-2"
                  } w-100`}
                >
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select
                    {...register("sex", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu sexo.",
                      },
                    })}
                    defaultValue="Selecciona tu sexo"
                  >
                    <option disabled value="">
                      Selecciona tu sexo
                    </option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </Form.Select>
                  {errors.sex && (
                    <Alert key="danger" variant="danger" className="mt-2 p-2">
                      {errors.sex.message}
                    </Alert>
                  )}
                </Form.Group>
              </Container>

              <Container
                fluid
                className={`fields-container d-flex ${
                  isSmallerScreen < 576
                    ? "flex-column"
                    : "flex-row justify-content-between"
                } px-0 w-100`}
              >
                <Form.Group
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "pe-2"
                  } w-100`}
                >
                  <Form.Label>Domicilio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu domicilio"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu domicilio.",
                      },
                      minLength: {
                        value: 8,
                        message:
                          "El domicilio debe tener al menos 8 caracteres.",
                      },
                      maxLength: {
                        value: 254,
                        message:
                          "El domicilio no debe exceder los 254 caracteres.",
                      },
                    })}
                  />
                  {errors.address && (
                    <Alert key="danger" variant="danger" className="mt-2 p-2">
                      {errors.address.message}
                    </Alert>
                  )}
                </Form.Group>

                <Form.Group
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "ps-2"
                  } w-100`}
                >
                  <Form.Label>Número de teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ingresa tu número de teléfono"
                    {...register("phoneNumber", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu número de teléfono.",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "El número de teléfono debe tener al menos 3 digitos.",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "El número de teléfono no debe exceder los 50 digitos.",
                      },
                      pattern: {
                        value:
                          /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                        message:
                          "El formato del número de teléfono no es válido.",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <Alert key="danger" variant="danger" className="mt-2 p-2">
                      {errors.phoneNumber.message}
                    </Alert>
                  )}
                </Form.Group>
              </Container>

              <Container
                fluid
                className={`fields-container d-flex ${
                  isSmallerScreen < 576
                    ? "flex-column"
                    : "flex-row justify-content-between"
                } px-0 w-100`}
              >
                <Form.Group
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "pe-2"
                  } w-100`}
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
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "ps-2"
                  } w-100`}
                >
                  <Form.Label>Verificar contraseña</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    {...register("verifyPassword", {
                      required: {
                        value: true,
                        message: "Por favor ingresa tu contraseña.",
                      },
                      validate: (value) =>
                        value === password || "Las contraseñas no coinciden.",
                    })}
                  />
                  {errors.verifyPassword && (
                    <Alert key="danger" variant="danger" className="mt-2 p-2">
                      {errors.verifyPassword.message}
                    </Alert>
                  )}
                </Form.Group>
              </Container>

              <Container
                fluid
                className={`fields-container d-flex ${
                  isSmallerScreen < 576
                    ? "flex-column"
                    : "flex-row justify-content-between"
                } px-0 w-100`}
              >
                <Form.Group
                  className={`form-group-1 mb-3 ${
                    isSmallerScreen >= 576 && "pe-2"
                  } w-100`}
                >
                  <Form.Label>Mostrar contraseña</Form.Label>
                  <Form.Check type="checkbox" {...register("showPassword")} />
                </Form.Group>
              </Container>

              <Button variant="primary" type="submit" className="w-100">
                Enviar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AdminRegister;
