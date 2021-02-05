import React from "react";
import { SvgState } from "../types/SvgState";

export const SvgContext = React.createContext<{ state: SvgState } | null >(null);