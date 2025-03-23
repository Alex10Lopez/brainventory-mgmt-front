import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";
import countries from "../../data/constants/countries";
import jobRoles from "../../data/database/jobRoles";
import { useEffect } from "react";

const EmployeeForm = ({ setFormValues }) => {
  const windowWidth = useWindowWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  /*const { fields: addressFields, append: appendAddress } = useFieldArray({
    control,
    name: "addresses",
  });

  const addAddress = () => {
    appendAddress({
      street: "",
      streetNumber: "",
      postalCode: "",
      city: "",
      countryState: "",
      country: "",
      reference: "",
    });
  };*/

  const formValues = useWatch({
    control,
  });

  useEffect(() => {
    if (formValues.name && formValues.lastname) {
      const name = formValues.name.trim().toLowerCase();
      const lastnames = formValues.lastname.trim().toLowerCase().split(" ");

      let email = "";
      if (lastnames.length === 1) {
        email = `${name}.${lastnames[0]}@brainventory.com`;
      } else {
        const secondLastName = lastnames[1];
        const secondInitials =
          secondLastName.length > 1
            ? secondLastName.slice(0, 2)
            : secondLastName;
        email = `${name}.${lastnames[0]}${secondInitials}@brainventory.com`;
      }

      setValue("contacts[0].email", email);
    }
  }, [formValues.name, formValues.lastname, setValue]);

  const filteredFormValues = {
    ...formValues,
    jobRoles: (formValues.jobRoles || []).filter((role) => role.id !== ""),
    contacts: (formValues.contacts || []).filter(
      (contact) => contact.phoneNumber || contact.email
    ),
  };

  const onSubmit = () => {
    setFormValues(filteredFormValues);
    console.log(JSON.stringify(filteredFormValues, null, 2)); // Aquí verás el salario y el id de jobRoles correctamente convertidos
  };

  return (
    <>
      <Form className="form-modal" onSubmit={handleSubmit(onSubmit)}>
        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>Foto del empleado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la URL de la foto."
              {...register("image")}
            />
          </Form.Group>

          <Container
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          ></Container>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>Nombre del empleado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del empleado"
              {...register("name", {
                required: {
                  value: true,
                  message: "Por favor, ingrese el nombre del empleado.",
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
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>Apellido del empleado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el apellido del empleado"
              {...register("lastname", {
                required: {
                  value: true,
                  message: "Por favor, ingrese el apellido del empleado.",
                },
                minLength: {
                  value: 3,
                  message: "El apellido debe tener al menos 3 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El apellido no debe exceder los 50 caracteres.",
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
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
          >
            <Form.Label>Fecha de nacimiento del empleado</Form.Label>
            <Form.Control
              type="date"
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message:
                    "Por favor, seleccione la fecha de nacimiento del empleado.",
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
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>Sexo del empleado</Form.Label>
            <Form.Select
              {...register("sex", {
                required: {
                  value: true,
                  message: "Por favor, seleccione el sexo del empleado.",
                },
              })}
              defaultValue=""
            >
              <option disabled value="">
                Seleccione el sexo
              </option>
              <option value="MALE">Masculino</option>
              <option value="FEMALE">Femenino</option>
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
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
          >
            <Form.Label>País del empleado</Form.Label>
            <Form.Select
              {...register("nationality", {
                required: {
                  value: true,
                  message: "Por favor, ingrese el país del empleado.",
                },
              })}
              defaultValue=""
            >
              <option disabled selected value="">
                Seleccione el país
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
              <option value="usa">United States</option>
            </Form.Select>
            {errors.nationality && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.nationality.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>Permisos del empleado</Form.Label>
            <Form.Select
              {...register("permissions", {
                required: {
                  value: true,
                  message: "Por favor, seleccione el tipo de permisos.",
                },
              })}
              defaultValue=""
            >
              <option disabled selected value="">
                Seleccione el tipo de permisos
              </option>
              <option value="GLOBAL_ADMIN">Administrador global</option>
              <option value="ASSETS_ADMIN">Administrador de activos</option>
            </Form.Select>
            {errors.permissions && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.permissions.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
          >
            <Form.Label>Estado del empleado</Form.Label>
            <Form.Select
              {...register("status", {
                required: {
                  value: true,
                  message: "Por favor, seleccione el estado del empleado.",
                },
              })}
              defaultValue=""
            >
              <option disabled selected value="">
                Seleccione el estado
              </option>
              <option value="ACTIVE">Activo</option>
              <option value="ON_VACATION">De vacaciones</option>
            </Form.Select>
            {errors.status && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.status.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>Salario mensual del empleado en USD</Form.Label>
            <Form.Control
              type="text"
              step="0.01"
              placeholder="Ingrese el salario en USD"
              {...register("salary", {
                required: {
                  value: true,
                  message:
                    "Por favor, ingrese el salario mensual del empleado.",
                },
              })}
            />
            {errors.salary && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.salary.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
          >
            <Form.Label>Puesto de trabajo principal</Form.Label>
            <Form.Select
              {...register("jobRoles[0].id", {
                required: {
                  value: true,
                  message:
                    "Por favor, seleccione el puesto de trabajo principal.",
                },
              })}
              defaultValue=""
            >
              <option disabled selected value="">
                Seleccione el puesto de trabajo
              </option>
              {jobRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
            {errors.jobRoles?.[0]?.id && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.jobRoles[0].idmessage}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>
              Puesto de trabajo secundario{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Select {...register("jobRoles[1].id")} defaultValue="">
              <option disabled selected value="">
                Seleccione el puesto de trabajo
              </option>
              {jobRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
          >
            <Form.Label>Número de teléfono principal</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ejemplo: +52 55 1234 5678"
              {...register("contacts[0].phoneNumber", {
                required: {
                  value: true,
                  message: "Por favor, ingrese el número de teléfono.",
                },
                minLength: {
                  value: 10,
                  message:
                    "El número de teléfono debe tener al menos 10 digitos.",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El número de teléfono no debe exceder los 50 digitos.",
                },
                pattern: {
                  value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                  message: "El formato del número de teléfono no es válido.",
                },
              })}
            />
            {errors.contacts?.[0]?.phoneNumber && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.contacts[0].phoneNumber.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>Correo electrónico empresarial</Form.Label>
            <Form.Control
              type="email"
              disabled
              placeholder="No aplica (se genera automáticamente)	"
              {...register("contacts[0].email")}
            />
            {errors.contacts?.[0]?.email && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.contacts[0].email.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
          >
            <Form.Label>
              Número de teléfono secundario{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ejemplo: +52 55 1234 5678"
              {...register("contacts[1].phoneNumber", {
                minLength: {
                  value: 10,
                  message:
                    "El número de teléfono debe tener al menos 10 digitos.",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El número de teléfono no debe exceder los 50 digitos.",
                },
                pattern: {
                  value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                  message: "El formato del número de teléfono no es válido.",
                },
              })}
            />
            {errors.contacts?.[1]?.phoneNumber && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.contacts[1].phoneNumber.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>
              Correo electrónico personal{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Ejemplo: nombre@ejemplo.com"
              {...register("contacts[1].email", {
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
                  message: "El formato del correo electrónico no es válido.",
                },
              })}
            />
            {errors.contacts?.[1].email && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.contacts[1].email.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Av. Reforma"
              {...register("addresses[0].street", {
                required: {
                  value: true,
                  message: "Por favor, ingrese la calle.",
                },
              })}
            />
            {errors.addresses?.[0]?.street && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.addresses[0].street.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>
              Número de la calle{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: 102-B"
              {...register("addresses[0].streetNumber")}
            />
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: 75008"
              {...register("addresses[0].postalCode", {
                required: {
                  value: true,
                  message: "Por favor, ingrese el código postal.",
                },
              })}
            />
            {errors.addresses?.[0]?.postalCode && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.addresses[0].postalCode.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>Cuidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Pachuca"
              {...register("addresses[0].city", {
                required: {
                  value: true,
                  message: "Por favor, ingrese la ciudad del empleado.",
                },
              })}
            />
            {errors.addresses?.[0]?.city && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.addresses[0].city.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>Estado/Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Hidalgo"
              {...register("addresses[0].countryState", {
                required: {
                  value: true,
                  message: "Por favor, ingrese el estado/provincia.",
                },
              })}
            />
            {errors.addresses?.[0]?.countryState && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.addresses[0].countryState.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          >
            <Form.Label>País</Form.Label>
            <Form.Select
              {...register("addresses[0].country", {
                required: {
                  value: true,
                  message: "Por favor, seleccione el país.",
                },
              })}
              defaultValue=""
            >
              <option disabled selected value="">
                Seleccione el país
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
            {errors.addresses?.[0]?.country && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.addresses[0].country.message}
              </Alert>
            )}
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>
              Referencia <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Cerca del parque"
              {...register("addresses[0].reference")}
            />
          </Form.Group>
        </Container>

        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la contraseña"
              {...register("password")}
            />
            {errors.password && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.password.message}
              </Alert>
            )}
          </Form.Group>

          <Container
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          ></Container>
        </Container>

        <pre>{JSON.stringify(filteredFormValues, null, 2)}</pre>
      </Form>
    </>
  );
};

export default EmployeeForm;
