class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _customFetch = ({ url, method, data }) =>
    fetch(url, {
      method,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));

  getInitialCards = () => this._customFetch({ url: `${this._baseUrl}/cards` });

  getUserInfo = () => this._customFetch({ url: `${this._baseUrl}/users/me` });

  updateUserInfo = (userData) => this._customFetch({ url: `${this._baseUrl}/users/me`, method: "PATCH", data: { name: userData.name, about: userData.about } });

  setNewCard = (cardData) => this._customFetch({ url: `${this._baseUrl}/cards`, method: "POST", data: { name: cardData.name, link: cardData.link } });

  deleteCard = (cardId) => this._customFetch({ url: `${this._baseUrl}/cards/${cardId}`, method: "DELETE" });

  changeLikeStatus = (cardId, isLiked) => {
    return this._customFetch({ url: `${this._baseUrl}/cards/likes/${cardId}`, method: isLiked ? "DELETE" : "PUT" });
  };

  setUserAvatar = (avatarLink) => this._customFetch({ url: `${this._baseUrl}/users/me/avatar`, method: "PATCH", data: { avatar: avatarLink.avatar } });
}

const api = new Api("https://around.nomoreparties.co/v1/group-12", "3e63b17a-6497-4226-90cf-4d7937b7aba1");
export default api;
