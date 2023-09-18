const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY ?? "";

export const verifyCaptcha = async (token: string): Promise<void> => {
  const recaptchaVerifyResult = await (
    await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${recaptchaSecretKey}&response=${token}`,
    })
  ).json();

  if (!recaptchaVerifyResult.success) {
    throw new Error("Invalid recaptcha token");
  }
};
