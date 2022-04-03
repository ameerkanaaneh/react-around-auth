import API from "../components/API";

export const api = new API({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "82cfb778-0110-4074-beef-5e31af26dd47",
  },
});
