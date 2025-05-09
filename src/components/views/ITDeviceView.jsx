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

  const URL_IMAGE = "http://localhost:9010";

  return (
    <>
      <InventoryViewSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <strong>Foto/imagen del dispositivo</strong>
            <div className="mt-2">
              <img
                src={
                  itDeviceData.image
                    ? `${URL_IMAGE}${itDeviceData.image}`
                    : `${URL_IMAGE}/images/assets/it-device.png`
                }
                alt={
                  itDeviceData.image
                    ? "Foto del dispositivo"
                    : "Imagen predeterminada del dispositivo"
                }
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "4px",
                  opacity: itDeviceData.image ? 1 : 0.6,
                }}
              />
              {!itDeviceData.image && (
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
              {itDeviceData.hardwareDetails?.purchaseDate ? (
                new Date(
                  itDeviceData.hardwareDetails.purchaseDate
                ).toLocaleDateString("es-ES", {
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
            <strong>Fin de garantía</strong>
            <p>
              {itDeviceData.hardwareDetails?.warrantyEndDate ? (
                new Date(
                  itDeviceData.hardwareDetails.warrantyEndDate
                ).toLocaleDateString("es-ES", {
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
