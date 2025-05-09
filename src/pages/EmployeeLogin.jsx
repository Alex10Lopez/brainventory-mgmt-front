import { Button, Card, Alert, Container, Spinner } from "react-bootstrap";
import { login } from "../api/authAdmin/authService";
import LoginForm from "../components/forms/LoginForm";
import useWindowWidth from "../components/hooks/useWindowWidth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ContentFormSection from "../components/ContentFormSection";
import { useNavigate } from "react-router-dom";
import getFieldFromJwt from "../components/helpers/getFieldFromJwt";

const EmployeeLogin = () => {
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
    mutationFn: login,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["employeeLogin"]);
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
          Inicio de Sesión
        </h1>
      }
      contentBody={
        <>
          {isErrorMutation && (
            <div className="d-flex justify-content-center align-items-center">
              <Alert variant="danger" className="text-center">
                {typeof error?.response?.data?.error === "string" ? (
                  <>{JSON.stringify(error.response.data)}</>
                ) : (
                  "No se pudo iniciar sesión. Verifica las credenciales"
                )}
              </Alert>
            </div>
          )}
          <LoginForm onSubmit={handleCreate} />
        </>
      }
      contentFooter={
        <Button
          variant="primary"
          type="submit"
          form="login-form"
          className="w-100"
          disabled={isPendingMutation}
        >
          {isPendingMutation ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Iniciando Sesión...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      }
    />
  );
};

export default EmployeeLogin;
