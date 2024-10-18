const api = (() => {
  const BASE_URL = "https://public-api.delcom.org/api/v1";
  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }
  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // API Auth => https://public-api.delcom.org/docs/1.0/api-auth
  async function postAuthRegister({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  async function postAuthLogin({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { token },
    } = responseJson;
    return token;
  }

  // API Users => https://public-api.delcom.org/docs/1.0/apiusers
  async function getMe() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { user },
    } = responseJson;
    return user;
  }

  async function postChangePhotoProfile({ photoFile }) {
    const formData = new FormData();
    formData.append("photo", photoFile);
    const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  // API Todos => https://public-api.delcom.org/docs/1.0/apitodos
  async function postAddAucation({ title, description }) {
    const response = await _fetchWithAuth(`${BASE_URL}/aucations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cover,
        title,
        description,
        start_bid,
        closed_at,
      }),
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { aucation_id },
    } = responseJson;
    return aucation_id;
  }

  async function postChangeCoverTodo({ id, cover }) {
    const formData = new FormData();
    formData.append("cover", cover);
    const response = await _fetchWithAuth(`${BASE_URL}/todos/${id}/cover`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  async function putUpdateAucation({
    cover,
    id,
    title,
    description,
    start_bid,
    closed_at,
    is_closed,
  }) {
    console.log("Updating todo:", {
      cover,
      id,
      title,
      description,
      start_bid,
      closed_at,
      is_closed,
    });

    const response = await _fetchWithAuth(`${BASE_URL}/aucation/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cover,
        title,
        description,
        start_bid,
        closed_at,
      }),
    });

    const responseJson = await response.json();
    console.log("API response:", responseJson); // Log the entire API response

    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message); // Handle error message if success is false
    }

    return message;
  }

  async function deleteAucation(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/aucation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    return message;
  }

  async function getAllAucations() {
    const response = await _fetchWithAuth(`${BASE_URL}/aucations`);
    const responseJson = await response.json();

    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { aucations },
    } = responseJson;
    return aucations;
  }

  async function getDetailAucation(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}`);
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (success !== true) {
      throw new Error(message);
    }
    const {
      data: { aucation },
    } = responseJson;
    return aucation;
  }

  return {
    putAccessToken,
    getAccessToken,
    postAuthRegister,
    postAuthLogin,
    getMe,
    postChangePhotoProfile,
    postAddAucation,
    postChangeCoverTodo,
    putUpdateAucation,
    deleteAucation,
    getAllAucations,
    getDetailAucation,
  };
})();

export default api;
