import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import {
  OperationalStatusEnum,
  PhysicalStatusEnum,
} from "../../data/enums/hardwareEnums";
import InventoryFormSection from "../InventoryFormSection";
import InventoryViewSection from "../InventoryViewSection";

const IODeviceView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const ioDeviceData = readData;

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
                  ioDeviceData.image
                    ? `http://localhost:9010${ioDeviceData.image}`
                    : "http://localhost:9010/images/assets/io-device.png"
                }
                alt={
                  ioDeviceData.image
                    ? "Foto del dispositivo"
                    : "Imagen predeterminada del dispositivo"
                }
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "4px",
                  opacity: ioDeviceData.image ? 1 : 0.6,
                }}
              />
              {!ioDeviceData.image && (
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
              {ioDeviceData.hardwareDetails?.hardwareName.name || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Marca del dispositivo</strong>
            <p>
              {ioDeviceData.hardwareDetails?.hardwareBrand.brand || (
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
              {ioDeviceData.hardwareDetails?.hardwareLine.lineName || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Serie del dispositivo</strong>
            <p>
              {ioDeviceData.hardwareDetails?.hardwareSerie.serie || (
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
              {ioDeviceData.hardwareDetails?.serialNumber || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Descripción</strong>
            <p>
              {ioDeviceData.hardwareDetails?.description || (
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
              {ioDeviceData.hardwareDetails?.physicalStatus ? (
                PhysicalStatusEnum[ioDeviceData.hardwareDetails?.physicalStatus]
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
              {ioDeviceData.hardwareDetails?.operationalStatus ? (
                OperationalStatusEnum[
                  ioDeviceData.hardwareDetails?.operationalStatus
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
              {ioDeviceData.hardwareDetails?.purchaseDate ? (
                new Date(
                  ioDeviceData.hardwareDetails.purchaseDate
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
              {ioDeviceData.hardwareDetails?.warrantyEndDate ? (
                new Date(
                  ioDeviceData.hardwareDetails.warrantyEndDate
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
            <strong>Dispositivo TI asociado</strong>
            <p>
              {ioDeviceData.itDevice?.hardwareDetails?.hardwareName?.name ? (
                <>
                  {ioDeviceData.itDevice.hardwareDetails.hardwareName.name}{" "}
                  {ioDeviceData.itDevice.hardwareDetails.hardwareBrand?.brand}{" "}
                  {ioDeviceData.itDevice.hardwareDetails.hardwareLine?.lineName}{" "}
                  {ioDeviceData.itDevice.hardwareDetails.hardwareSerie?.serie} -{" "}
                  {ioDeviceData.itDevice.hardwareDetails.serialNumber}
                </>
              ) : (
                <span className="text-secondary">Ninguno</span>
              )}
            </p>
          </>
        }
      />
    </>
  );
};

export default IODeviceView;
