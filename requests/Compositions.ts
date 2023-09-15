import { Composition } from "../models/Composition";

export const GetCompositions = async (
  userId: string,
  accessToken: string,
  ehrId: string
): Promise<Composition[]> => {
  let compositions: Composition[] = [];
  const getCompositionsReq = await fetch(
    process.env.externalApiUrl + `ehr/${ehrId}/composition`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        AuthUserId: userId,
        EhrSystemId: process.env.ehrSystemId || "",
      },
    }
  );
  if (getCompositionsReq.ok) {
    compositions = await getCompositionsReq.json();
  }
  return compositions;
};
