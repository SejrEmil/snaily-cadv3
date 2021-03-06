import Deputy from "../../interfaces/Deputy";
import MedicalRecord from "../../interfaces/MedicalRecord";
import Logger from "../Logger";
import socket from "../socket";
import lang from "../../language.json";
import { Dispatch } from "react";
import { handleRequest, isSuccess } from "../functions";
import {
  GET_CURRENT_EMS_STATUS,
  GET_MY_EMS_FD,
  SET_EMS_STATUS,
  DELETE_EMS_DEPUTY,
  CREATE_EMS_FD_DEPUTY,
  SEARCH_MEDICAL_RECORD,
  CREATE_EMS_FD_DEPUTY_ERROR,
  SET_MESSAGE,
} from "../types";

interface IDispatch {
  type: string;
  message?: string;
  error?: string;
  deputies?: Deputy[];
  medicalRecords?: MedicalRecord[];
  status?: string;
  status2?: string;
}

export const createEmsFdDeputy = (data: object) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest("/ems-fd/my-deputies", "POST", data);

    if (isSuccess(res)) {
      dispatch({
        type: CREATE_EMS_FD_DEPUTY,
      });
      window.location.href = "/ems-fd/deputies";
    } else {
      dispatch({
        type: CREATE_EMS_FD_DEPUTY_ERROR,
        error: res.data.error,
      });
    }
  } catch (e) {
    Logger.error(CREATE_EMS_FD_DEPUTY, e);
  }
};

export const getMyDeputies = () => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest("/ems-fd/my-deputies", "GET");

    if (isSuccess(res)) {
      dispatch({
        type: GET_MY_EMS_FD,
        deputies: res.data.deputies,
      });
    }
  } catch (e) {
    Logger.error(GET_MY_EMS_FD, e);
  }
};

export const getCurrentEmsStatus = (id: string) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest(`/ems-fd/status/${id}`, "GET");

    if (isSuccess(res)) {
      dispatch({
        type: GET_CURRENT_EMS_STATUS,
        status: res.data.deputy?.status || "off-duty",
        status2: res.data.deputy?.status2 || "-",
      });
    }
  } catch (e) {
    Logger.error(GET_CURRENT_EMS_STATUS, e);
  }
};

export const setEmsStatus = (
  id: string,
  status: "on-duty" | "off-duty" | string,
  status2: string,
) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const data = { id: id, status: status, status2: status2 };
    const res = await handleRequest(`/ems-fd/status/${id}`, "PUT", data);

    if (isSuccess(res)) {
      dispatch({
        type: SET_EMS_STATUS,
        status: res.data.deputy.status,
        status2: res.data.deputy.status2,
      });
      socket.emit("UPDATE_ACTIVE_UNITS");
      localStorage.setItem("on-duty-ems-fd", id);
    }
  } catch (e) {
    Logger.error(SET_EMS_STATUS, e);
  }
};

export const deleteEmsFdDeputy = (id: string) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest(`/ems-fd/my-deputies/${id}`, "DELETE");

    if (isSuccess(res)) {
      dispatch({
        type: DELETE_EMS_DEPUTY,
        deputies: res.data.deputies,
      });
      dispatch({
        type: SET_MESSAGE,
        message: lang.ems_fd.deleted_dept,
      });
    }
  } catch (e) {
    Logger.error(DELETE_EMS_DEPUTY, e);
  }
};

export const searchMedicalRecord = (name: string) => async (dispatch: Dispatch<IDispatch>) => {
  try {
    const res = await handleRequest(`/ems-fd/medical-records/${name}`, "GET");

    if (isSuccess(res)) {
      dispatch({
        type: SEARCH_MEDICAL_RECORD,
        medicalRecords: res.data.medicalRecords,
      });
    }
  } catch (e) {
    Logger.error(SEARCH_MEDICAL_RECORD, e);
  }
};
