const appConfig = {
    appUrl: "https://findfalcone.herokuapp.com",
    token: localStorage.getItem("token") || "",
    xToken:localStorage.getItem("refresh_token") || "",
};

export default appConfig
