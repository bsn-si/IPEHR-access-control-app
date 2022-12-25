import { User } from "../models/User";

export const GetUserByCode = async (code: string): Promise<User | null> => {
  const res = await fetch(process.env.externalApiUrl + `user/code/${code}`, {
    method: "GET",
  });
  if (res.ok && res.status === 200) return res.json();
  else return null;
};

export const GetUser = async (userId: string): Promise<User | null> => {
  const res = await fetch(process.env.externalApiUrl + `user/${userId}`, {
    method: "GET",
  });
  if (res.ok && res.status === 200) return res.json();
  else return null;
};
