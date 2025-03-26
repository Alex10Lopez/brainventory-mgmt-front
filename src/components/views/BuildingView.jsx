import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import {
  SexEnum,
  PermissionsEnum,
  StatusEnum,
} from "../../data/enums/employeeEnums";

const BuildingView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const buildingData = readData;

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
          <strong>Foto del edificio</strong>
          <p>
            {buildingData.image || (
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
          <strong>Nombre del edificio</strong>
          <p>
            {buildingData.name || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Número de pisos del edificio</strong>
          <p>
            {buildingData.numberOfFloors || (
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
          <strong>Descripción del edificio</strong>
          <p>
            {buildingData.description || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        ></div>
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
            {buildingData.address?.street || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Número exterior</strong>
          <p>
            {buildingData.address?.streetNumber || (
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
            {buildingData.address?.postalCode || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Cuidad</strong>
          <p>
            {buildingData.address?.city || (
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
            {buildingData.address?.countryState || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>País</strong>
          <p>
            {buildingData.address?.country || (
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
            {buildingData.address?.reference || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>
      </Container>
    </>
  );
};

export default BuildingView;
