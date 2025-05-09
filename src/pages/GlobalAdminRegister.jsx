import { Button, Card, Alert, Container, Spinner } from "react-bootstrap";
import { register } from "../api/authAdmin/authService";
import GlobalAdminForm from "../components/forms/GlobalAdminForm";
import useWindowWidth from "../components/hooks/useWindowWidth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ContentFormSection from "../components/ContentFormSection";
import { useNavigate } from "react-router-dom";

const GlobalAdminRegister = () => {
  const windowWidth = useWindowWidth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending: isPendingMutation,
    isError: isErrorMutation,
    error,
    mutate,
    reset,
  } = useMutation({
    mutationFn: register,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["globalAdminRegister"]);
      navigate("/");
    },
  });

  const handleCreate = (data) => {
    mutate(data);
  };

  return (
    <ContentFormSection
      windowWidth={windowWidth}
      contentHeader={
        <h1 className="card-header-admin-register text-center text-light">
          Registro de Administrador Global
        </h1>
      }
      contentBody={
        <>
          <GlobalAdminForm onSubmit={handleCreate} />
          {isErrorMutation && (
            <div className="d-flex justify-content-center align-items-center">
              <Alert variant="danger" className="text-center" dismissible>
                {error?.response && <>{JSON.stringify(error.response.data)}</>}
              </Alert>
            </div>
          )}
        </>
      }
      contentFooter={
        <Button
          variant="primary"
          type="submit"
          form="global-admin-form"
          className="w-100"
          disabled={isPendingMutation}
        >
          {isPendingMutation ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Registrando...
            </>
          ) : (
            "Registrar"
          )}
        </Button>
      }
    />
  );
};

export default GlobalAdminRegister;
