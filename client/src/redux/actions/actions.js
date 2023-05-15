import axios from "axios";
import { server } from "../store";

export const uploadFile = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "uploadImgRequest"
        });

        const { data } = await axios.post(`${server}/api/files`, formData);

        dispatch({
            type: "uploadImgSuccess",
            payload: data.id
        });
    } catch (error) {
        dispatch({
            type: "uploadImgFail",
            payload: error.response.data.message || error.message
        });
    }
}

export const showFile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "showImgRequest"
        });

        const { data } = await axios.get(`${server}/files/${id}`);

        dispatch({
            type: "showImgSuccess",
            payload: data.url
        });
    } catch (error) {
        dispatch({
            type: "showImgFail",
            payload: error.response.data.message
        });
    }
}

export const sendMail = (uuid, emailTo, emailFrom) => async (dispatch) => {
    try {
        dispatch({
            type: "showMailRequest"
        });

        const { data } = await axios.post(`${server}/api/files/send`, {
            uuid, emailTo, emailFrom
        });

        dispatch({
            type: "showMailSuccess",
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: "showMailFail",
            payload: error.response.data.message
        });
    }
}