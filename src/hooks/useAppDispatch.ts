// src/hooks/useAppDispatch.ts
import { useDispatch } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../redux/store/index";

export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<RootState, unknown, Action<string>>>();
