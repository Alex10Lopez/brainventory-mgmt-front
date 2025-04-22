import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import {
  OperationalStatusEnum,
  PhysicalStatusEnum,
} from "../../data/enums/hardwareEnums";
import { RoomTypesEnum } from "../../data/enums/roomEnums";
import InventoryViewSection from "../InventoryViewSection";

const ITDeviceView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const itDeviceData = readData;

  return (
    <>
      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Imagen del dispositivo</strong>
            <p>
              {itDeviceData.image || (
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
            <strong>Tipo de dispositivo</strong>
            <p>
              {itDeviceData.hardwareDetails?.hardwareName.name || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Marca del dispositivo</strong>
            <p>
              {itDeviceData.hardwareDetails?.hardwareBrand.brand || (
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
            <strong>Línea del dispositivo</strong>
            <p>
              {itDeviceData.hardwareDetails?.hardwareLine.lineName || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Serie del dispositivo</strong>
            <p>
              {itDeviceData.hardwareDetails?.hardwareSerie.serie || (
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
            <strong>Número de serie</strong>
            <p>
              {itDeviceData.hardwareDetails?.serialNumber || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Descripción</strong>
            <p>
              {itDeviceData.hardwareDetails?.description || (
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
            <strong>Estado físico</strong>
            <p>
              {itDeviceData.hardwareDetails?.physicalStatus ? (
                PhysicalStatusEnum[itDeviceData.hardwareDetails?.physicalStatus]
              ) : (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Estado operativo</strong>
            <p>
              {itDeviceData.hardwareDetails?.operationalStatus ? (
                OperationalStatusEnum[
                  itDeviceData.hardwareDetails?.operationalStatus
                ]
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
            <strong>Fecha de compra</strong>
            <p>
              {itDeviceData.hardwareDetails?.purchaseDate || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Fin de garantía</strong>
            <p>
              {itDeviceData.hardwareDetails?.warrantyEndDate || (
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
            {" "}
            <strong>Ubicación (Habitación)</strong>
            <p>
              {itDeviceData.room?.roomType ? (
                `${RoomTypesEnum[itDeviceData.room?.roomType]}${
                  itDeviceData.room.name ? ` - ${itDeviceData.room.name}` : ""
                }${
                  itDeviceData.room.number
                    ? ` - ${itDeviceData.room.number}`
                    : ""
                }`
              ) : (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
      />
    </>
  );
};

export default ITDeviceView;
