import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import InventoryViewSection from "../InventoryViewSection";

const BuildingView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const buildingData = readData;

  return (
    <>
      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Foto del edificio</strong>
            <p>
              {buildingData.image || (
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
