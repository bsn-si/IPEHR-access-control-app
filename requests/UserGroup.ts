import { UserGroup } from "../models/UserGroup";

export const GetUserGroups = async (
  userId: string,
  accessToken: string
): Promise<UserGroup[]> => {
  let userGroups: UserGroup[] = [];
  const getGroupsReq = await fetch(process.env.externalApiUrl + `user/group`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      AuthUserId: userId,
      EhrSystemId: process.env.ehrSystemId,
    },
  });
  if (getGroupsReq.ok) {
    userGroups = await getGroupsReq.json();
  } else if (getGroupsReq.status === 403) {
    window.location.replace("/login");
  }
  return userGroups;
};

export const AddUserToGroup = async (
  accessToken: string,
  ownerId: string,
  groupId: string,
  userId: string
): Promise<Response> => {
  const addDoctorReq = await fetch(
    process.env.externalApiUrl +
      `user/group/${groupId}/user_add/${userId}/read`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        AuthUserId: ownerId,
        EhrSystemId: process.env.ehrSystemId,
      },
    }
  );
  return addDoctorReq;
};

export const RemoveUserFromGroup = async (
  accessToken: string,
  ownerId: string,
  groupId: string,
  userId: string
): Promise<Response> => {
  const removeDoctorReq = await fetch(
    process.env.externalApiUrl + `user/group/${groupId}/user_remove/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        AuthUserId: ownerId,
        EhrSystemId: process.env.ehrSystemId,
      },
    }
  );
  return removeDoctorReq;
};
