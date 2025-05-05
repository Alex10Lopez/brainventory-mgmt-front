import useWindowWidth from "../components/hooks/useWindowWidth";
import ProfileForm from "../components/forms/ProfileForm";
import { useQuery } from "@tanstack/react-query";
import ContentFormSection from "../components/ContentFormSection";
import { Alert, Spinner } from "react-bootstrap";
import getFieldFromJwt from "../components/helpers/getFieldFromJwt";
import { findByEmail } from "../api/authAdmin/profileService";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmployeeProfile = () => {
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();

  const email = getFieldFromJwt("sub");

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const {
    isPending,
    isError,
    data: readData,
    error,
  } = useQuery({
    queryKey: ["readData", email],
    queryFn: () => findByEmail(email),
    retry: false,
    onError: (error) => {
      if (error?.response?.status !== 200) {
        navigate("/login");
      }
    },
  });

  return (
    <>
      <NavigationBar />
      <ContentFormSection
        windowWidth={windowWidth}
        contentHeader={
          <h1 className="card-header-admin-register text-center text-primary">
            Perfil del Empleado
          </h1>
        }
        contentBody={
          <>
            {readData && <ProfileForm readData={readData.data} />}

            {isPending && (
              <div className="d-flex justify-content-center align-items-center">
                <Alert variant="info" className="text-center">
                  <Spinner animation="border" size="sm" className="me-2" />{" "}
                  Cargando...
                </Alert>
              </div>
            )}

            {isError && (
              <div className="d-flex justify-content-center align-items-center">
                <Alert variant="danger" className="text-center" dismissible>
                  Error:{" "}
                  {error?.message || "Ocurrió un error al ver información."}
                </Alert>
              </div>
            )}
          </>
        }
      />
    </>
  );
};

export default EmployeeProfile;
