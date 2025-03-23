import error404 from "../images/error404.jpg";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

function Error404() {
  return (
    <Container className="container-404 d-flex flex-column justify-content-center align-items-center mt-5 col-4">
      <h1 className="text-center text-primary">Error 404: Not found</h1>

      <Image src={error404} alt="Error 404" thumbnail />
    </Container>
  );
}

export default Error404;
