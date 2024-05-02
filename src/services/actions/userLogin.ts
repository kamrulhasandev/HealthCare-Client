"use server";
export const userLogin = async (formData: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_RUL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    }
  );

  const userInfo = await res.json();

  return userInfo;
};
