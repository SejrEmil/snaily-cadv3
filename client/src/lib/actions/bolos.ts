import Bolo from "../../interfaces/Bolo";
import Logger from "../Logger";
import { CREATE_BOLO, GET_BOLOS, CREATE_BOLO_ERROR, DELETE_BOLO } from "../types";
import { Dispatch } from "react";
import { handleRequest, isSuccess } from "../functions";
import socket from "../socket";

interface IDispatch {
  type: string;
  error?: string;
  bolos?: Bolo[];
}

export const getActiveBolos = () => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest("/dispatch/bolos", "GET");

    if (isSuccess(res)) {
      dispatch({
        type: GET_BOLOS,
        bolos: res.data.bolos,
      });
    }
  } catch (e) {
    Logger.error(GET_BOLOS, e);
  }
};

export const createBolo = (data: object) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest("/dispatch/bolos", "POST", data);

    if (isSuccess(res)) {
      socket.emit("UPDATE_BOLOS");
      dispatch({
        type: CREATE_BOLO,
        bolos: res.data.bolos,
      });
    } else {
      dispatch({
        type: CREATE_BOLO_ERROR,
        error: res.data.error,
      });
    }
  } catch (e) {
    Logger.error(CREATE_BOLO, e);
  }
};

export const deleteBolo = (id: string) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest(`/dispatch/bolos/${id}`, "DELETE");

    if (isSuccess(res)) {
      socket.emit("UPDATE_BOLOS");
      dispatch({
        type: DELETE_BOLO,
        bolos: res.data.bolos,
      });
    }
  } catch (e) {
    Logger.error(DELETE_BOLO, e);
  }
};
