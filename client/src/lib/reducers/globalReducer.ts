import CadInfo from "../../interfaces/CadInfo";
import { UPDATE_AOP, GET_AOP, SET_MESSAGE, GET_CAD_INFO } from "../types";

const initState = {
  aop: null,
  message: null,
  cadInfo: {},
};

type Actions =
  | {
      type: typeof UPDATE_AOP;
      aop: string;
    }
  | {
      type: typeof GET_AOP;
      aop: string;
    }
  | {
      type: typeof GET_CAD_INFO;
      cadInfo: CadInfo;
    }
  | {
      type: typeof SET_MESSAGE;
      message: string;
    };

export default function globalReducer(state = initState, action: Actions) {
  switch (action.type) {
    case "GET_AOP":
      return {
        ...state,
        aop: action.aop,
      };
    case "UPDATE_AOP":
      return {
        ...state,
        aop: action.aop,
      };
    case "GET_CAD_INFO":
      return {
        ...state,
        cadInfo: action.cadInfo,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.message,
      };
    default:
      return {
        ...state,
      };
  }
}
