import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import {
  SexEnum,
  PermissionsEnum,
  StatusEnum,
} from "../../data/enums/employeeEnums";
import InventoryViewSection from "../InventoryViewSection";

const EmployeeView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const employeeData = readData;

  const URL_IMAGE = "http://localhost:8090";

  return (
    <>
      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Foto del empleado</strong>
            <div className="mt-2">
              <img
                src={
                  employeeData.image
                    ? `${URL_IMAGE}${employeeData.image}`
                    : `${URL_IMAGE}/images/human-resources/employee.png`
                }
                alt={
                  employeeData.image
                    ? "Foto del dispositivo"
                    : "Imagen predeterminada del empleado"
                }
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "4px",
                  opacity: employeeData.image ? 1 : 0.6,
                }}
              />
              {!employeeData.image && (
                <div className="text-secondary mt-1">
                  Imagen predeterminada por falta de fotografía real.
                </div>
              )}
            </div>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Nombre</strong>
            <p>
              {employeeData.name || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Apellido</strong>
            <p>
              {employeeData.lastname || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Fecha de nacimiento</strong>
            <p>
              {employeeData.dateOfBirth ? (
                new Date(employeeData.dateOfBirth).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              ) : (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Sexo</strong>
            <p>
              {employeeData.sex ? (
                SexEnum[employeeData.sex]
              ) : (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Nacionalidad</strong>
            <p>
              {employeeData.nationality || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Permisos del sistema</strong>
            <p>
              {employeeData.permissions ? (
                PermissionsEnum[employeeData.permissions]
              ) : (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Status</strong>
            <p>
              {employeeData.status ? (
                StatusEnum[employeeData.status]
              ) : (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Salario mensual (USD)</strong>
            <p>
              {employeeData.salary ? (
                `$${employeeData.salary}`
              ) : (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Puesto principal</strong>
            <p>
              {employeeData.jobRoles?.[0]?.name || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Puesto secundario</strong>
            <p>
              {employeeData.jobRoles?.[1]?.name || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Teléfono principal</strong>
            <p>
              {employeeData.contacts?.[0]?.phoneNumber || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Correo empresarial</strong>
            <p>
              {employeeData.contacts?.[0]?.email || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Teléfono secundario</strong>
            <p>
              {employeeData.contacts?.[1]?.phoneNumber || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Correo personal</strong>
            <p>
              {employeeData.contacts?.[1]?.email || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Calle</strong>
            <p>
              {employeeData.addresses?.[0]?.street || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Número</strong>
            <p>
              {employeeData.addresses?.[0]?.streetNumber || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Código Postal</strong>
            <p>
              {employeeData.addresses?.[0]?.postalCode || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Ciudad</strong>
            <p>
              {employeeData.addresses?.[0]?.city || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Estado/Provincia</strong>
            <p>
              {employeeData.addresses?.[0]?.countryState || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>País</strong>
            <p>
              {employeeData.addresses?.[0]?.country || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />

      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Referencia</strong>
            <p>
              {employeeData.addresses?.[0]?.reference || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />
    </>
  );
};

export default EmployeeView;
