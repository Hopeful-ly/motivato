"use server";

import { signIn, signOut } from "@/auth";
import { LoginMethod } from "../../utils";

export const signInAction = async (method: LoginMethod) => {
  await signIn(method);
};

export const signOutAction = async () => {
  await signOut();
};
