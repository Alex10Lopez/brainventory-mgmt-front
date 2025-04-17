import { Form } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import useWindowWidth from "../hooks/useWindowWidth";
import { useEffect } from "react";
import {
  findAllITDeviceNames,
  findAllHardwareBrands,
  findAllITDeviceLines,
  findAllHardwareSeries,
} from "../../api/assets/hardwareService";
import { findAllRooms } from "../../api/infrastructure/roomService";
import {
  PhysicalStatusEnum,
  OperationalStatusEnum,
} from "../../data/enums/hardwareEnums";
import { useQuery } from "@tanstack/react-query";
import FormSection from "../FormSection";

const ITDeviceForm = ({ mode = "create", readData = null, onSubmit }) => {
  const windowWidth = useWindowWidth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

  // Reset form with initial data when in update mode
  useEffect(() => {
    if (mode === "update" && readData) {
      reset(readData);
    }
  }, [mode, readData, reset]);

  const formValues = useWatch({
    control,
  });

  const {
    isPending: isPendingITDeviceName,
    isError: isErrorITDeviceName,
    data: iTDeviceNameReferences,
    error: errorITDeviceName,
  } = useQuery({
    queryKey: ["iTDeviceNamesReferences"],
    queryFn: findAllITDeviceNames,
  });

  const {
    isPending: isPendingHardwareBrand,
    isError: isErrorHardwareBrand,
    data: hardwareBrandReferences,
    error: errorHardwareBrand,
  } = useQuery({
    queryKey: ["hardwareBrandsReferences"],
    queryFn: findAllHardwareBrands,
  });

  const {
    isPending: isPendingITDeviceLine,
    isError: isErrorITDeviceLine,
    data: iTDeviceLineReferences,
    error: errorITDeviceLine,
  } = useQuery({
    queryKey: ["iTDeviceLineReferences"],
    queryFn: findAllITDeviceLines,
  });

  const {
    isPending: isPendingHardwareSerie,
    isError: isErrorHardwareSerie,
    data: hardwareSerieReferences,
    error: errorHardwareSerie,
  } = useQuery({
    queryKey: ["hardwareSerieReferences"],
    queryFn: findAllHardwareSeries,
  });

  const {
    isPending: isPendingRoom,
    isError: isErrorRoom,
    data: roomReferences,
    error: errorRoom,
  } = useQuery({
    queryKey: ["roomReferences"],
    queryFn: findAllRooms,
  });

  const formValuesToSubmit = {
    ...formValues,
  };

  const handleFormSubmit = () => {
    onSubmit(formValuesToSubmit);
  };

  return (
    <Form
      id={`${mode}-form`}
      className="form-modal"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Photo Section  */}
      <FormSection
        windowWidth={windowWidth}
        leftContent={
          <>
            <Form.Label>Foto del dispositivo TI</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen (ejemplo: https://ejemplo.com/foto.jpg)"
              defaultValue={mode === "update" ? readData?.image || "" : ""}
              isInvalid={!!errors.image}
              {...register("image")}
            />
          </>
        }
        leftError={errors.image?.message}
      />
    </Form>
  );
};

export default ITDeviceForm;
