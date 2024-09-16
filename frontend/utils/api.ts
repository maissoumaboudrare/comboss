import { fetchAPI } from "@/lib/utils";
import { Character } from "@/types/character";
import { User } from "@/types/user";
import { ComboDataForm } from "@/types/combo";
import { AvatarValues, PasswordValues } from "@/app/(pages)/dashboard/_components/AccountManagerForm";

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    return await fetchAPI("/api/characters", { method: "GET" });
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    return await fetchAPI("/api/users", { method: "GET" });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (userID: number | undefined) => {
  return await fetchAPI(`/api/users/${userID}`, { method: "DELETE" });
};

export const changePassword = async (userID: number | undefined, passwordValues: PasswordValues) => {
  return await fetchAPI(`/api/users/${userID}/password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(passwordValues),
  });
};

export const changeAvatar = async (userID: number | undefined, avatarUrl: AvatarValues) => {
  return await fetchAPI(`/api/users/${userID}/avatar`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(avatarUrl),
  });
};

export const fetchCombos = async (characterID: number) => {
  return await fetchAPI(`/api/combos/character/${characterID}`, {
    method: "GET",
  });
};

export const addCombo = async (combo: ComboDataForm) => {
  return await fetchAPI("/api/combos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(combo),
    // credentials: "include",
  });
};

export const deleteCombo = async (comboID: number) => {
  return await fetchAPI(`/api/combos/${comboID}`, { method: "DELETE" });
};

export const toggleLike = async (comboID: number, method: string) => {
  return await fetchAPI(`/api/likes/${comboID}`, { method });
};

export const toggleFavorite = async (comboID: number, method: string) => {
  return await fetchAPI(`/api/favorites/${comboID}`, { method });
};
