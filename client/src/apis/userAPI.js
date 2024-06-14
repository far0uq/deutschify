import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_SERVER_URL;

export async function handleTokenValidation(token) {
  try {
    const response = await axios.post(
      `${API_URL}/user/token-validation/${token}`
    );
    return response.data;
  } catch (error) {
    console.error("Token validation failed:", error); // Log the error
    throw new Error("Token validation failed. Please try again."); // Throw a generic error
  }
}

// export async function handleTokenValidation(token) {
//   const response = await axios.post(
//     `${API_URL}/user/token-validation/${token}`
//   );
//   return response.data;
// }

export async function handleRegister(values) {
  try {
    const response = await axios.post(`${API_URL}/user/register`, values, {
      withCredentials: true, // Important for including cookies in the request
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return response.data.error || "Registration failed.";
    }
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    return "Invalid Credential.";
  }
}

// export async function handleRegister(values) {
//   try {
//     const response = await axios.post(`${API_URL}/user/register`, values, {
//       withCredentials: true, // Important for including cookies in the request
//     });
//     const statusCode = response.status;
//     if (statusCode === 200 || statusCode === 201) {
//       return true;
//     } else {
//       const data = response.data;
//       return data.error;
//     }
//   } catch (err) {
//     return "Invalid Credential.";
//   }
// }

// export async function handleLogin(values) {
//   try {
//     const response = await axios.post(`${API_URL}/user/login`, values, {
//       withCredentials: true, // Important for including cookies in the request
//     });
//     console.log(response.data);
//     const statusCode = response.status;
//     console.log(
//       "🚀 ~ file: userAPI.js:37 ~ handleLogin ~ statusCode:",
//       statusCode
//     );

//     if (statusCode === 200 || statusCode === 201) {
//       localStorage.setItem("username", response.data.username);
//       return true;
//     } else {
//       const data = response.data;
//       return data.error;
//     }
//   } catch (err) {
//     return "Invalid Credential.";
//   }
// }

export async function handleLogin(values) {
  try {
    const response = await axios.post(`${API_URL}/user/login`, values, {
      withCredentials: true, // Important for including cookies in the request
    });
    console.log(response);
    if (response.status === 200 || response.status === 201) {
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem(
        "proficiency_level",
        response.data.proficiency_level
      );
      return true;
    } else {
      return response.data.error || "Login failed.";
    }
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    return "Invalid Credential.";
  }
}

export async function handleLogout(values) {
  try {
    const response = await axios.post(`${API_URL}/user/logout`, values, {
      withCredentials: true, // Important for including cookies in the request
    });
    const statusCode = response.status;

    if (statusCode === 200 || statusCode === 201) {
      localStorage.removeItem("username");
      return true;
    } else {
      const data = response.data;
      return data.error;
    }
  } catch (err) {
    throw new Error(
      "Login failed due to server connection issue. Could not establish connection to the server."
    );
  }
}

export async function handleResetPassword(values, token) {
  try {
    const response = await axios.post(
      `${API_URL}/user/reset-password/${token}`,
      values
    );
    const data = response.data;
    if (data.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(
      "Could not validate you due to failed server connection. Could not establish connection to the server."
    );
  }
}

export async function handleForgotPassword(values) {
  try {
    const response = await axios.post(
      `${API_URL}/user/forgot-password`,
      values
    );
    const data = response.data;
    if (data.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(
      "There was an error in trying to reach your email. Could not establish connection to the server."
    );
  }
}

export async function handleUpdateProficiencyLevel(values) {
  try {
    const response = await axios.post(
      `${API_URL}/user/update-proficiency-level`,
      values
    );

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(
      "Could not update proficiency level due to server connection issue. Could not establish connection to the server."
    );
  }
}
