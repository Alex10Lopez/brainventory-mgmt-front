import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import { RoomTypesEnum } from "../../data/enums/roomEnums";
import InventoryViewSection from "../InventoryViewSection";

const RoomView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const roomData = readData;

  const URL_IMAGE = "http://localhost:9000";

  return (
    <>
      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Foto de la sala/espacio</strong>
            <div className="mt-2">
              <img
                src={
                  roomData.image
                    ? `${URL_IMAGE}${roomData.image}`
                    : `${URL_IMAGE}/images/infrastructure/room.png`
                }
                alt={
                  roomData.image
                    ? "Foto del dispositivo"
                    : "Imagen predeterminada de la sala/espacio"
                }
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "4px",
                  opacity: roomData.image ? 1 : 0.6,
                }}
              />
              {!roomData.image && (
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
            <strong>Tipo de sala/espacio</strong>
            <p>
              {roomData.roomType ? (
                RoomTypesEnum[roomData.roomType]
              ) : (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Nombre identificador</strong>
            <p>
              {roomData.name || (
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
            <strong>Número de sala</strong>
            <p>
              {roomData.number || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Capacidad máxima de personas</strong>
            <p>
              {roomData.capacityMax || (
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
            <strong>Edificio</strong>
            <p>
              {roomData.building?.name || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Nivel/Piso</strong>
            <p>
              {roomData.floorLabel || (
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
            <strong>Descripción detallada</strong>
            <p>
              {roomData.description || (
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
          </>
        }
        rightContent={<></>}
      />
    </>
  );
};

export default RoomView;
