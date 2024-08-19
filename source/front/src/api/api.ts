import CONFIG from "./../../../config/config.json";
class Api {
  constructor(private baseUrl: string) {}

  // Обработка ответа сервера
  _checkResponse(res: any) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  // Общий запрос
  // async fetch(data: WSQuery) {
  //   const res = await fetch(`${this._baseUrl}/api`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });
  //   const dt = await this._checkResponse(res);
  //   return await APP_STORAGE.onWSData(dt);
  // }
  fetch(data: any) {
    return fetch(`${this.baseUrl}/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
}

export const api = new Api(
  `http://${CONFIG.server_config.host}:${CONFIG.server_config.port}`
);
