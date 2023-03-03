// PROD
export const API_URL = "https://cabonorteapi.herokuapp.com/";
export const baseURL = "cabo-norte-hp4fhxa4w-nicandrogmp.vercel.app";

// DEV
/* export const API_URL = "http://localhost/cabonorte-panel/cabo_norte_api_rest/";
 export const baseURL = "localhost:3000/"; */

export const authRole = {
  admin: ["administrador"],
  user: ["user", "admin"],
};

export const RoutePermittedRole = {
  admin: "administrador",
  encargado: "encargado",
  guardia: "guardia",
};
export const defaultUser = {
  displayName: "John Alex",
  email: "demo@example.com",
  token: "access-token",
  role: "admin",
  photoURL: "/assets/images/avatar/A11.jpg",
};
// this url will open after login

export const initialUrl = "/home";
export const trabajadores = "/trabajadores";
export const proveedores = "/proveedores";
