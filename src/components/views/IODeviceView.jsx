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
            <strong>Foto del dispositivo</strong>
            <p>
              {ioDeviceData.image || (
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
              {ioDeviceData.hardwareDetails?.purchaseDate || (
                <span className="text-secondary">No disponible</span>
              )}
            </p>
          </>
        }
        rightContent={
          <>
            <strong>Fin de garantía</strong>
            <p>
              {ioDeviceData.hardwareDetails?.warrantyEndDate || (
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
