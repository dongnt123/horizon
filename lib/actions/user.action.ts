"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";

import { createAdminClient, createSessionClient } from "../server/appwrite";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
}

export const signUp = async (userData: SignUpProps) => {
  try {
    const { email, password, firstName, lastName } = userData;
    const { account } = await createAdminClient();

    const newAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("horizon-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return (parseStringify(newAccount));
  } catch (error) {
    console.error(error);
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();
    
    return parseStringify(result);
  } catch (error) {
    return null;
  }
}

export const logOut = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("horizon-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}