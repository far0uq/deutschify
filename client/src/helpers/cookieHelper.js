export const isUserLoggedIn = () => {
  const jwtCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("jwt="));


    console.log(document.cookie)
  // Check if the JWT cookie is present
  if (jwtCookie) {
    return true;
  } else {
    return false;
  }
};
