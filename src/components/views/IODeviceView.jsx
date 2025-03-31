import React from "react";
import { Container } from "react-bootstrap";
import useWindowWidth from "../hooks/useWindowWidth";
import {
  OperationalStatusEnum,
  PhysicalStatusEnum,
} from "../../data/enums/hardwareEnums";
import { RoomTypesEnum } from "../../data/enums/roomEnums";

const IODeviceView = ({ readData }) => {
  const windowWidth = useWindowWidth();

  const ioDeviceData = readData;

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
          <strong>Foto</strong>
          <p>
            {ioDeviceData.image || (
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
          <strong>Nombre</strong>
          <p>
            {ioDeviceData.hardwareDetails?.hardwareName.name || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Marca</strong>
          <p>
            {ioDeviceData.hardwareDetails?.hardwareBrand.brand || (
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
          <strong>Linea de la marca</strong>
          <p>
            {ioDeviceData.hardwareDetails?.hardwareLine.lineName || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Serie de la linea</strong>
          <p>
            {ioDeviceData.hardwareDetails?.hardwareSerie.serie || (
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
          <strong>Número de serie</strong>
          <p>
            {ioDeviceData.hardwareDetails?.serialNumber || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Descripción</strong>
          <p>
            {ioDeviceData.hardwareDetails?.description || (
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
          <strong>Estado físico</strong>
          <p>
            {ioDeviceData.hardwareDetails?.physicalStatus ? (
              PhysicalStatusEnum[ioDeviceData.hardwareDetails?.physicalStatus]
            ) : (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
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
          <strong>Fecha de compra</strong>
          <p>
            {ioDeviceData.hardwareDetails?.purchaseDate || (
              <span className="text-secondary">No disponible</span>
            )}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        >
          <strong>Fecha de expiración de garantía</strong>
          <p>
            {ioDeviceData.hardwareDetails?.warrantyEndDate || (
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
          <strong>Dispositivo TI enlazado</strong>
          <p>
            {ioDeviceData.itDevice.hardwareDetails.hardwareName.name}{" "}
            {ioDeviceData.itDevice.hardwareDetails.hardwareBrand.brand}{" "}
            {ioDeviceData.itDevice.hardwareDetails.hardwareLine.lineName}{" "}
            {ioDeviceData.itDevice.hardwareDetails.hardwareSerie.serie} -{" "}
            {ioDeviceData.itDevice.hardwareDetails.serialNumber}
          </p>
        </div>

        <div
          className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
        ></div>
      </Container>
    </>
  );
};

export default IODeviceView;
