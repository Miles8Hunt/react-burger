import { useState, ChangeEvent } from "react";
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '../reducers/index';
import { CONSTRUCTOR_ADD, CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } from '../actions/burgerConstructor';
import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, OPEN_INGREDIENT_INFO } from '../actions/burgerIngredients';
import { AUTH_CHECKED, LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED, GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_FAILED,} from '../actions/user';
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_SEND_MESSAGE, WS_GET_MESSAGE } from '../actions/wsActions';
import { SET_MODAL, RESET_MODAL } from '../actions/ingredientDetails';
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/orderDetails';
import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED } from '../actions/forgotPassword';
import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/register";
import { RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED } from '../actions/reserPassword';


// типизация хранилища
export type RootState = ReturnType<typeof rootReducer>;

// типизация экшенов
export type TApplicationActions = 
    | TConstructorActions
    | TIngredientsActions
    | TIngredientDetailsActions
    | TOrderDetailsActions 
    | TUserActions
    | TForgotPasswordActions
    | TRegistrationActions
    | TResetPasswordActions
    | TWSActions;

// типизация thunk услилителя
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, 
RootState, unknown, TApplicationActions>; 

// типизация метода dispatch для проверки отправляемого экшена
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

// типизация хуков
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch>();

export function useForm(inputValues: IInputData) {
  const [values, setValues] = useState(inputValues);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value, name} = event.target;
			setValues({...values, [name]: value});
		};
	return {values, handleChange, setValues};
};



// Constructor actions 

export interface IConstructorAddAction {
  readonly type: typeof CONSTRUCTOR_ADD;
  readonly payload: IIngredient;
};
export interface IConstructorDeleteAction {
  readonly type: typeof CONSTRUCTOR_DELETE;
  readonly payload: string | undefined;
};
export interface IConstructorResetAction  {
  readonly type: typeof CONSTRUCTOR_RESET;
};
export interface IConstructorReorderAction  {
  readonly type: typeof CONSTRUCTOR_REORDER;
  readonly hoverIndex: number, dragIndex: number;
};

export type TConstructorActions =
  | IConstructorAddAction
  | IConstructorDeleteAction
  | IConstructorResetAction 
  | IConstructorReorderAction;


// Ingredients actions 

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
};
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
};
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};
export interface IOpenIngredientInfo {
  payload: IIngredient | undefined;
  readonly type: typeof OPEN_INGREDIENT_INFO;
};
  
export type TIngredientsActions =
  | IOpenIngredientInfo 
  | IGetIngredientsFailedAction 
  | IGetIngredientsSuccessAction 
  | IGetIngredientsAction;


// User actions 

export interface ILoginAction {
  readonly type: typeof LOGIN;
};
export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: {
    email: string,
    name: string,
  };
};
export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
};
export interface ILogoutAction {
  readonly type: typeof LOGOUT;
};
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
};
export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
};
export interface IGetUserAction {
  readonly type: typeof GET_USER;
};
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: IOwner; 
};
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
};
export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
};
export interface IUpdateUserDataAction {
  readonly type: typeof UPDATE_USER_DATA;
};
export interface IUpdateUserDataSuccessAction {
  readonly type: typeof UPDATE_USER_DATA_SUCCESS;
  readonly payload: {
    email: string,
    name: string,
  };
};
export interface IUpdateUserDataFailedAction {
  readonly type: typeof UPDATE_USER_DATA_FAILED;
};

export type TUserActions = 
  | ILoginAction  
  | ILoginFailedAction
  | ILoginSuccessAction
  | ILogoutAction 
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IGetUserAction 
  | IGetUserSuccessAction
  | IGetUserFailedAction 
  | IAuthCheckedAction 
  | IUpdateUserDataAction 
  | IUpdateUserDataSuccessAction
  | IUpdateUserDataFailedAction;


// ForgotPassword actions 

export interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD;
};
export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  readonly payload: boolean;
};
export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
};

export type TForgotPasswordActions = 
  | IForgotPasswordAction  
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction;


// Registration actions 

export interface IRegistrationAction {
  readonly type: typeof REGISTER;
};
export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: {
    email: string,
    name: string,
  };
};
export interface IRegistrationFailedAction {
  readonly type: typeof REGISTER_FAILED;
};

export type TRegistrationActions = 
  | IRegistrationAction  
  | IRegistrationSuccessAction
  | IRegistrationFailedAction;


// ResetPassword actions 

export interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD;
};
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
};
export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
};

export type TResetPasswordActions = 
  | IResetPasswordAction  
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction;


// IngredientDetails actions 

export interface ISetModalAction {
  readonly type: typeof SET_MODAL;
  readonly payload: IIngredient;
}
export interface IResetModalAction {
  readonly type: typeof RESET_MODAL;
}

export type TIngredientDetailsActions =
  | ISetModalAction
  | IResetModalAction;


// OrderDetails actions 

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: IOrder;
}
export interface IConstructorResetAction {
  readonly type: typeof CONSTRUCTOR_RESET;
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderDetailsActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IConstructorResetAction
  | IGetOrderFailedAction;


// WS actions 

export interface IWebSocket {
  wsStart: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsSend: string;
}
export interface IWsMessage {
  readonly orders: IOrder[]; /*IOrderDetails[];*/ 
  readonly success: boolean;
  readonly total: number;
  readonly totalToday: number;
}
export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage
}

export type TWSActions =
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsSendMessageAction
  | IWsGetMessageAction;


//////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface IWSActions {
  wsStart: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsSend: string;
};

export interface IOwner {
  createdAt?: string;
  name: string;
  email: string;
  updatedAt?: string;
  password?: string;
};

export interface IInputData {
  [name: string]: string; 
};

export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  key?: string;
};

export interface IMainConstructor {
  ingredient: IIngredient;
  index: number;
};

export interface IBurgerDetailsList {
  ingredients: Array<IIngredient>;
};

export interface IBurgerDetailsItem {
  ingredient: IIngredient;
  counter: number;
};

export interface IIngredientsItem {
  ingredient: IIngredient;
};

export interface IModal {
  closeModal: () => void;
  children?: React.ReactNode;
  route?: boolean;
};

export interface IModalOverlay {
  onClick: () => void;
};

export interface IOrderCounters {
  total: number;
  totalToday: number;
  doneList: Array<number>;
  workList: Array<number>;
};

export interface IOrderNumber {
  orderNumber: number;
};

export interface IOrder {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
};

export interface IOrderFeed {
  orders: Array<IOrder>;
  listClassName: boolean | string;
};

export interface IOrderFeedItem {
  order: IOrder;
};

export interface IOrderIconesList {
  ingredients: Array<IIngredient>;
};

export interface IOrderIngredientIcon {
  length: number;
  ingredient: IIngredient;
  showMore: boolean;
  index: number;
};

export interface IProtectRoute {
  element: any;
  anonymous?: boolean;
};

export interface IOrderPage {
  isLogin: boolean;
  getIngredients: () => void;
};

export interface IIngredientDetailsInitialState {
  selectedIngredient: IIngredient | undefined;
}

export interface IOrderStatus {
  doneList: Array<number>;
  workList: Array<number>;
}
