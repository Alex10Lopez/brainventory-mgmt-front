import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import { RoomTypesEnum } from "../../data/enums/roomEnums";

const RoomView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const roomData = readData;

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
          <strong>Foto de la sala/espacio</strong>
          <p>
            {roomData.image || (
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
          <strong>Tipo de sala/espacio</strong>
          <p>
            {roomData.roomType ? (
              RoomTypesEnum[roomData.roomType]
            ) : (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Nombre identificador</strong>
          <p>
            {roomData.name || (
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
          <strong>Número de sala</strong>
          <p>
            {roomData.number || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Capacidad máxima de personas</strong>
          <p>
            {roomData.capacityMax || (
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
          <strong>Edificio</strong>
          <p>
            {roomData.building?.name || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Nivel/Piso</strong>
          <p>
            {roomData.floorLabel || (
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
          <strong>Descripción detallada</strong>
          <p>
            {roomData.description || (
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
          <strong>Departamentos/Áreas</strong>
          {roomData.departments.length > 0 ? (
            <ul>
              {roomData.departments.map((dept, index) => (
                <li key={index}>{dept.name}</li>
              ))}
            </ul>
          ) : (
            <p>
              <span className="text-secondary">No disponible</span>
            </p>
          )}
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        ></div>
      </Container>
    </>
  );
};

export default RoomView;
