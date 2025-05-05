function getFieldFromJwt(fieldName) {
  const jwt = localStorage.getItem("jwtToken");
  if (!jwt) return null;

  const payloadBase64 = jwt.split(".")[1];
  const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
  const payload = JSON.parse(payloadJson);

  return payload[fieldName];
}

export default getFieldFromJwt;
