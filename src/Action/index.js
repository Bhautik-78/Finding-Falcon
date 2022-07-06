import axios from "axios";
import appConfig from "../Config";

export const getPlanetDetail = async () => {
    let result = {};
    try {
        const res = await axios.get(`${appConfig.appUrl}/planets`);
        result = res.data || [];
        return {success: true, data: result};
    } catch (err) {
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
};

export const getVehiclesDetail = async () => {
    let result = {};
    try {
        const res = await axios.get(`${appConfig.appUrl}/vehicles`);
        result = res.data || [];
        return {success: true, data: result};
    } catch (err) {
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
};

export const findToken = async () => {
    let result = {};
    try {
        const res = await axios.post(`${appConfig.appUrl}/token`, {}, {
            headers: {
                Accept: "application/json"
            }
        });
        result = res.data || [];
        return {success: true, data: result};
    } catch (err) {
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
};

export const findFalcon = async (planetsList, vehiclesList) => {
    let result = {};
    try {
        const res = await findToken();
        if (res.success) {
            const body = {
                "token": res.data.token,
                "planet_names": planetsList,
                "vehicle_names": vehiclesList
            };
            const response = await axios.post(`${appConfig.appUrl}/find`, body, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                result = response.data || {};
                return {success: true, data: result};
            } else {
                return {
                    success: false,
                    message: "something went wrong"
                };
            }
        } else {
            return {
                success: false,
                message: "something went wrong"
            };
        }
    } catch (err) {
        return {
            success: true,
            message: (err) || "something went wrong"
        };
    }
};
