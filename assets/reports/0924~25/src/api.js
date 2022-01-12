import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coinpaprika.com/v1/",
});

const mainApi = {
  prices: () => api.get("tickers"),
  exchanges: () => api.get("exchanges"),
  coins: () => api.get("coins"),
};

export default mainApi;
