import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";

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
          <strong>Foto de la habitación</strong>
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
          <strong>Tipo de habitación</strong>
          <p>
            {roomData.roomType.typeName || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Nombre de la habitación</strong>
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
          <strong>Capacidad máxima</strong>
          <p>
            {roomData.capacityMax || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Edificio</strong>
          <p>
            {roomData.building?.name || (
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
          <strong>Nivel de piso</strong>
          <p>
            {roomData.floorLabel || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Descripción</strong>
          <p>
            {roomData.description || (
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
          <strong>Dapartamentos presentes</strong>
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
