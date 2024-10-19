const api = (() => {
  const BASE_URL = "https://public-api.delcom.org/api/v1";

  // Helper untuk fetch dengan Auth
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

  // Register API
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
    if (!success) {
      throw new Error(message);
    }
    return message;
  }

  // Login API
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
    if (!success) {
      throw new Error(message);
    }
    const {
      data: { token },
    } = responseJson;
    return token;
  }

  // Get current user
  async function getMe() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (!success) {
      throw new Error(message);
    }
    const {
      data: { user },
    } = responseJson;
    return user;
  }

  // Upload profile photo
  async function postChangePhotoProfile({ photoFile }) {
    const formData = new FormData();
    formData.append("photo", photoFile);
    const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (!success) {
      throw new Error(message);
    }
    return message;
  }

  // Add Aucation with FormData
  async function postAddAucation({
    title,
    description,
    start_bid,
    closed_at,
    cover,
  }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("start_bid", start_bid);
    formData.append("closed_at", closed_at);
    formData.append("cover", cover);

    formData.forEach((value, key) => {
      console.log(`${key}:`, value); // Optional logging for debugging
    });

    const response = await _fetchWithAuth(`${BASE_URL}/aucations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: formData,
    });

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to create Aucation");
    }

    return responseJson.data.Aucation_id;
  }

  // Change Aucation Cover
  async function postChangeCoverAucation({ id, cover }) {
    const formData = new FormData();
    formData.append("cover", cover);
    const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}/cover`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    const { success, message } = responseJson;
    if (!success) {
      throw new Error(message);
    }
    return message;
  }

  // Add Bid to Aucation
  async function postAddBid({ aucationId, amount }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/aucations/${aucationId}/bids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      }
    );

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  // Update Aucation
  async function putUpdateAucation({ id, title, description, start_bid, closed_at }) {
    const bodyData = new URLSearchParams({
      title,
      description,
      start_bid,
      closed_at,
    });
  
    const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}`, { // Pastikan id di sini adalah string
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyData,
    });
  
    const responseJson = await response.json();
  
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to update Aucation");
    }
  
    return responseJson;
  }
  

  // Delete Aucation
  async function deleteAucation(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }
    return responseJson.message;
  }

  // Get all Aucations
  async function getAllAucations() {
    const response = await _fetchWithAuth(`${BASE_URL}/aucations`);
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }
    return responseJson.data.aucations;
  }

  // Get Detail Aucation
  async function getDetailAucation(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}`);
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }
    return responseJson.data.aucation;
  }

  return {
    putAccessToken,
    getAccessToken,
    postAuthRegister,
    postAuthLogin,
    getMe,
    postChangePhotoProfile,
    postAddAucation,
    postChangeCoverAucation,
    postAddBid, // Tambahkan fungsi
    putUpdateAucation,
    deleteAucation,
    getAllAucations,
    getDetailAucation,
  };
})();

export default api;
