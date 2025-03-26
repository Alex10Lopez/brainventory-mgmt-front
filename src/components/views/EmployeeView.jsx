import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import {
  SexEnum,
  PermissionsEnum,
  StatusEnum,
} from "../../data/enums/employeeEnums";

const EmployeeView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const employeeData = readData;

  return (
    <>
      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Foto del empleado</strong>
          <p>
            {employeeData.image || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Nombre del empleado</strong>
          <p>
            {employeeData.name || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Apellido del empleado</strong>
          <p>
            {employeeData.lastname || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Fecha de nacimiento del empleado</strong>
          <p>
            {employeeData.dateOfBirth || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Sexo del empleado</strong>
          <p>
            {employeeData.sex ? (
              SexEnum[employeeData.sex]
            ) : (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Nacionalidad del mpleado</strong>
          <p>
            {employeeData.nationality || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Permisos del empleado</strong>
          <p>
            {employeeData.permissions ? (
              PermissionsEnum[employeeData.permissions]
            ) : (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Status del empleado</strong>
          <p>
            {employeeData.status ? (
              StatusEnum[employeeData.status]
            ) : (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Salario mensual del empleado</strong>
          <p>
            {employeeData.salary ? (
              `$${employeeData.salary}`
            ) : (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Puesto de trabajo principal</strong>
          <p>
            {employeeData.jobRoles?.[0]?.name || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Puesto de trabajo secundario</strong>
          <p>
            {employeeData.jobRoles?.[1]?.name || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Número de teléfono principal</strong>
          <p>
            {employeeData.contacts?.[0]?.phoneNumber || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Correo electrónico empresarial</strong>
          <p>
            {employeeData.contacts?.[0]?.email || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Número de teléfono secundario</strong>
          <p>
            {employeeData.contacts?.[1]?.phoneNumber || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Correo electrónico personal</strong>
          <p>
            {employeeData.contacts?.[1]?.email || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Calle</strong>
          <p>
            {employeeData.addresses?.[0]?.street || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Número exterior</strong>
          <p>
            {employeeData.addresses?.[0]?.streetNumber || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Código Postal</strong>
          <p>
            {employeeData.addresses?.[0]?.postalCode || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Cuidad</strong>
          <p>
            {employeeData.addresses?.[0]?.city || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Estado/Provincia</strong>
          <p>
            {employeeData.addresses?.[0]?.countryState || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>País</strong>
          <p>
            {employeeData.addresses?.[0]?.country || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>

      <Container
        fluid
        className={`details-section d-flex ${
          windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
        } px-0 w-100`}
      >
        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
        >
          <strong>Referencia</strong>
          <p>
            {employeeData.addresses?.[0]?.reference || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>
    </>
  );
};

export default EmployeeView;
