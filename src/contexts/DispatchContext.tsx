import React, { Dispatch }  from "react";
import { Action } from "../functions/StateReducer";

export const DispatchContext = React.createContext<{ dispatch: Dispatch<Action> }>({dispatch: ()=> null});
