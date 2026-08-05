import axios from "axios";
import type { CharacterDetailApi } from "./character-detail.api-model";
import { apiClient } from "@/core/api/axios-client";

const REST_URL = "http://localhost:3000/characters";

// ==========================================
// 1. MÉTODO REST (AXIOS)
// ==========================================
export const getCharacterRest = async (
  id: string,
): Promise<CharacterDetailApi> => {
  const { data } = await apiClient.get<CharacterDetailApi>(`/character/${id}`);
  return data;
};
// ==========================================
// 2. GUARDADO LOCAL (PUT REST)
// ==========================================
export const saveCharacter = async (
  character: CharacterDetailApi,
): Promise<boolean> => {
  // Guardamos o actualizamos de forma limpia la frase célebre en el servidor local
  await axios
    .patch(`${REST_URL}/${character.id}`, {
      id: character.id,
      bestSentence: character.bestSentence,
    })
    .catch(async (error) => {
      // Si el personaje no existe en json-server (404 al hacer PATCH), hacemos POST
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        await axios.post(REST_URL, {
          id: character.id,
          bestSentence: character.bestSentence,
        });
      } else {
        throw error;
      }
    });

  return true;
};
