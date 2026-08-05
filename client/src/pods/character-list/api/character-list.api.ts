import type {
  CharacterApi,
  CharacterResponseApi,
} from "./character-list.api-model";
import { apiClient } from "@/core/api/axios-client";

// ==========================================
// 1. MÉTODO REST (AXIOS)
// ==========================================

// Obtener la lista de personajes
export const getCharacterListRest = async (
  page: number = 1,
  name: string = "",
): Promise<CharacterResponseApi> => {
  const { data } = await apiClient.get<CharacterResponseApi>("/character", {
    params: { page, name },
  });
  return data;
};

// Obtener un personaje por su ID (para el pod de detalle)
export const getCharacterDetail = async (id: string): Promise<CharacterApi> => {
  const { data } = await apiClient.get<CharacterApi>(`/character/${id}`);
  return data;
};
