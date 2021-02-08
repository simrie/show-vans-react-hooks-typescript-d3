import React, { Dispatch }  from "react";
import { Action } from "../functions/svgStateReducer";

export const DispatchContext = React.createContext<{ dispatch: Dispatch<Action> }>({dispatch: ()=> null});
