"use server";

import { signIn } from "@/auth";

export const doSocialLogin = async (formData) => {
  const action = formData.get("action");
  await signIn(action, { callbackUrl: "/courses" });
};
