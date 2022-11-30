import { actions } from "./action";

const initialState = {
  preview_data: "",
  show_modal:false,
  template_list:[]
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PREVIEW_DATA:
      return {
        ...state,
        preview_data: action.data,
      };
      case actions.SHOW_MODAL:
        return {
          ...state,
          show_modal: action.data,
        };
        case actions.TEMPLATE_LIST:
        return {
          ...state,
          template_list: action.data,
        };
    default:
      return state;
  }
};
export default appReducer;