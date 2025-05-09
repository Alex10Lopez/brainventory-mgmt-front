import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import InventoryViewSection from "../InventoryViewSection";

const BuildingView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const buildingData = readData;

  const URL_IMAGE = "http://localhost:9000";

  return (
    <>
      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Foto del edificio</strong>
            <div className="mt-2">
              <img
                src={
                  buildingData.image
                    ? `${URL_IMAGE}${buildingData.image}`
                    : `${URL_IMAGE}/images/infrastructure/building.png`
                }
                alt={
                  buildingData.image
                    ? "Foto del dispositivo"
                    : "Imagen predeterminada del edificio"
                }
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "4px",
                  opacity: buildingData.image ? 1 : 0.6,
                }}
              />
              {!buildingData.image && (
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
              {buildingData.name || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Número de pisos</strong>
            <p>
              {buildingData.numberOfFloors || (
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
            <strong>Descripción del edificio</strong>
            <p>
              {buildingData.description || (
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
              {buildingData.address?.street || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Número</strong>
            <p>
              {buildingData.address?.streetNumber || (
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
              {buildingData.address?.postalCode || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Cuidad</strong>
            <p>
              {buildingData.address?.city || (
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
              {buildingData.address?.countryState || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>País</strong>
            <p>
              {buildingData.address?.country || (
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
              {buildingData.address?.reference || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />
    </>
  );
};

export default BuildingView;
