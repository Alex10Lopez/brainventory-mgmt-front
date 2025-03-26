import { Alert, Container, Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../../hooks/useWindowWidth";
import countriesEs from "../../../data/constants/countriesEs";
import demonymEs from "../../../data/constants/demonymEs";
import jobRoles from "../../../data/database/jobRoles";
import {
  SexEnum,
  PermissionsEnum,
  StatusEnum,
} from "../../../data/enums/employeeEnums";
import { useEffect } from "react";

const EmployeeCreateForm = ({ onSubmit }) => {
  const windowWidth = useWindowWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
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

  useEffect(() => {
    if (formValues.name && formValues.lastname) {
      const normalizeText = (text) => {
        return text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ñ/g, "n")
          .replace(/Ñ/g, "N");
      };

      const name = normalizeText(formValues.name.trim().toLowerCase());
      const lastnames = normalizeText(
        formValues.lastname.trim().toLowerCase()
      ).split(" ");

      const randomNumber = Math.floor(Math.random() * 90) + 10;

      let email = "";
      if (lastnames.length === 1) {
        email = `${name}.${lastnames[0]}.${randomNumber}@brainventory.com`;
      } else {
        const secondLastName = lastnames[1];
        const secondInitials =
          secondLastName.length > 1
            ? secondLastName.slice(0, 2)
            : secondLastName;
        email = `${name}.${lastnames[0]}${secondInitials}.${randomNumber}@brainventory.com`;
      }

      setValue("contacts[0].email", email);
    }
  }, [formValues.name, formValues.lastname, setValue]);

  const formValuesToSubmit = {
    ...formValues,
    jobRoles: (formValues.jobRoles || []).filter((role) => role.id !== ""),
    contacts: (formValues.contacts || []).filter(
      (contact) => contact.phoneNumber || contact.email
    ),
    showPassword: undefined,
    verifyPassword: undefined,
  };

  const handleFormSubmit = () => {
    onSubmit(formValuesToSubmit);
  };

  return (
    <>
      <Form
        id="create-form"
        className="form-modal"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {/*<pre>{JSON.stringify(formValuesToSubmit, null, 2)}</pre>*/}
        <Container
          fluid
          className={`fields-container d-flex ${
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="employeePhotoInput"
          >
            <Form.Label>Foto del empleado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la URL de la foto."
              {...register("image")}
            />
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          ></Form.Group>
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="employeeNameInput"
          >
            <Form.Label>Nombre del empleado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del empleado"
              {...register("name")}
            />
            {errors.name && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.name.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="employeeLastNameInput"
          >
            <Form.Label>Apellido del empleado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el apellido del empleado"
              {...register("lastname")}
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="employeeBirthDateInput"
          >
            <Form.Label>Fecha de nacimiento del empleado</Form.Label>
            <Form.Control type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.dateOfBirth.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="employeeSexSelect"
          >
            <Form.Label>Sexo del empleado</Form.Label>
            <Form.Select {...register("sex")} defaultValue="">
              <option disabled value="">
                Seleccione el sexo
              </option>
              {Object.entries(SexEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="employeeNationalitySelect"
          >
            <Form.Label>Nacionalidad del empleado</Form.Label>
            <Form.Select {...register("nationality")} defaultValue="">
              <option disabled value="">
                Seleccione la nacionalidad
              </option>
              {demonymEs.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
            {errors.nationality && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.nationality.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="employeePermissionsSelect"
          >
            <Form.Label>Permisos del empleado</Form.Label>
            <Form.Select {...register("permissions")} defaultValue="">
              <option disabled value="">
                Seleccione el tipo de permisos
              </option>
              {Object.entries(PermissionsEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="employeeStatusSelect"
          >
            <Form.Label>Estado del empleado</Form.Label>
            <Form.Select {...register("status")} defaultValue="">
              <option disabled value="">
                Seleccione el estado
              </option>
              {Object.entries(StatusEnum).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
            {errors.status && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.status.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="employeeSalaryInput"
          >
            <Form.Label>Salario mensual del empleado en USD</Form.Label>
            <Form.Control
              type="text"
              step="0.01"
              placeholder="Ingrese el salario en USD"
              {...register("salary")}
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="primaryJobRoleSelect"
          >
            <Form.Label>Puesto de trabajo principal</Form.Label>
            <Form.Select {...register("jobRoles[0].id")} defaultValue="">
              <option disabled value="">
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
                {errors.jobRoles[0].id.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-group-1 mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="secondaryJobRoleSelect"
          >
            <Form.Label>
              Puesto de trabajo secundario{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Select {...register("jobRoles[1].id")} defaultValue="">
              <option disabled value="">
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="primaryPhoneNumberInput"
          >
            <Form.Label>Número de teléfono principal</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ejemplo: +52 55 1234 5678"
              {...register("contacts[0].phoneNumber")}
            />
            {errors.contacts?.[0]?.phoneNumber && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.contacts[0].phoneNumber.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="companyEmailInput"
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="secondaryPhoneNumberInput"
          >
            <Form.Label>
              Número de teléfono secundario{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ejemplo: +52 55 1234 5678"
              {...register("contacts[1].phoneNumber")}
            />
            {errors.contacts?.[1]?.phoneNumber && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.contacts[1].phoneNumber.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="personalEmailInput"
          >
            <Form.Label>
              Correo electrónico personal{" "}
              <span className="text-secondary">(Opcional)</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Ejemplo: nombre@ejemplo.com"
              {...register("contacts[1].email")}
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="addressStreetInput"
          >
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Av. Reforma"
              {...register("addresses[0].street")}
            />
            {errors.addresses?.[0]?.street && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.addresses[0].street.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="addressStreetNumberInput"
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="addressPostalCodeInput"
          >
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: 75008"
              {...register("addresses[0].postalCode")}
            />
            {errors.addresses?.[0]?.postalCode && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.addresses[0].postalCode.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="addressCityInput"
          >
            <Form.Label>Cuidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Pachuca"
              {...register("addresses[0].city")}
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
          controlId="addressStateInput"
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="form-control-id-1"
          >
            <Form.Label>Estado/Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Hidalgo"
              {...register("addresses[0].countryState")}
            />
            {errors.addresses?.[0]?.countryState && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.addresses[0].countryState.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="addressCountrySelect"
          >
            <Form.Label>País</Form.Label>
            <Form.Select {...register("addresses[0].country")} defaultValue="">
              <option disabled value="">
                Seleccione el país
              </option>
              {countriesEs.map((country, index) => (
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="addressReferenceInput"
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

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
          ></Form.Group>
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
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="accountPasswordInput"
          >
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese la contraseña"
              {...register("password")}
            />
            {errors.password && (
              <Alert key="danger" variant="danger" className="mt-2 p-2">
                {errors.password.message}
              </Alert>
            )}
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="accountPasswordConfirmationInput"
          >
            <Form.Label>Verificar contraseña</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Verifique la contraseña"
              {...register("verifyPassword", {
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
            windowWidth < 576
              ? "flex-column"
              : "flex-row justify-content-between"
          } px-0 w-100`}
        >
          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "pe-2"
            } w-100`}
            controlId="togglePasswordVisibilityCheckbox"
          >
            <Form.Label>Mostrar contraseña</Form.Label>
            <Form.Check type="checkbox" {...register("showPassword")} />
          </Form.Group>

          <Form.Group
            className={`form-section mb-3 ${
              windowWidth >= 576 && "ps-2"
            } w-100`}
            controlId="formSex"
          ></Form.Group>
        </Container>
      </Form>
    </>
  );
};

export default EmployeeCreateForm;
