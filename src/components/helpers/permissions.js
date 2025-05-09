import getFieldFromJwt from "./getFieldFromJwt";

export const checkPermission = (requiredPermission) => {
  const permissions = getFieldFromJwt("permissions");

  if (!permissions) return false;

  if (permissions === "GLOBAL_ADMIN") return true;

  switch (requiredPermission) {
    case "HR_ADMIN":
      return permissions === "HR_ADMIN";
    case "INFRASTRUCTURE_ADMIN":
      return permissions === "INFRASTRUCTURE_ADMIN";
    case "ASSETS_ADMIN":
      return permissions === "ASSETS_ADMIN";
    default:
      return false;
  }
};

export const hasAccessToRoute = (path) => {
  const permissions = getFieldFromJwt("permissions");

  if (permissions === "GLOBAL_ADMIN") return true;

  switch (path) {
    case "/human-resources-menu":
    case "/employees-inventory":
      return permissions === "HR_ADMIN";
    case "/infrastructure-menu":
    case "/buildings-inventory":
    case "/rooms-inventory":
      return permissions === "INFRASTRUCTURE_ADMIN";
    case "/assets-menu":
    case "/it-devices-inventory":
    case "/io-devices-inventory":
      return permissions === "ASSETS_ADMIN";
    case "/":
    case "/login":
    case "/register":
      return true;
    default:
      return false;
  }
};
