import api from "./api";

async function create() {
  try {
    const response = await api.post("/draft/");
    if (response.data.draftId) {
      window.location.href = "/" + response.data.draftId;
    } else {
      alert(response.data.message);
    }
  } catch {
    localStorage.clear();
  }
}

async function get(draftId) {
  try {
    const response = await api.post("/draft/get/", { draftId });
    return response.data.draft ? response.data.draft : {};
  } catch {
    localStorage.clear();
  }
}

async function save(draftId, heading, content) {
  try {
    await api.post("/draft/save/", { draftId, heading, content });
  } catch {
    localStorage.clear();
  }
}

const draft = { create, get, save };

export default draft;
