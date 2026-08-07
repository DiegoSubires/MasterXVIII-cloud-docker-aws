import axios from "axios";
import type { CharacterDetailApi } from "./character-detail.api-model";
import { apiClient } from "@/core/api/axios-client";

// ==========================================
// CON SERVIDOR LOCAL EN DESARROLLO
// ==========================================

/*
const REST_URL = "http://localhost:3000/characters";

// 1. MÉTODO REST (AXIOS)


export const getCharacterRest = async (
  id: string,
): Promise<CharacterDetailApi> => {
  const { data } = await apiClient.get<CharacterDetailApi>(`/character/${id}`);
  return data;
};

// 2. GUARDADO LOCAL (PUT REST)

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
};*/

// ==========================================
// CON FRONTEND Y SERVIDOR EN RENDER
// ==========================================

/*
// 1. OBTENER PERSONAJE + FRASE CÉLEBRE

export const getCharacterRest = async (
  id: string,
): Promise<CharacterDetailApi> => {
  // Petición 1: Trae los datos base del personaje (Rick y Morty API)
  const characterResponse = await apiClient.get<CharacterDetailApi>(
    `/character/${id}`,
  );
  const characterData = characterResponse.data;

  try {
    // Petición 2: Trae la frase guardada en nuestro Express de Render
    const sentenceResponse = await axios.get(`/api/character/${id}/sentence`);

    // Asignamos la frase al modelo que consumirá el componente
    characterData.bestSentence = sentenceResponse.data.sentence;
  } catch (error) {
    console.error(
      "No se pudo obtener la frase célebre del servidor Express:",
      error,
    );
    characterData.bestSentence = "";
  }

  return characterData;
};

// 2. GUARDAR FRASE EN EL SERVIDOR EXPRESS

export const saveCharacter = async (
  character: CharacterDetailApi,
): Promise<boolean> => {
  // Enviamos la frase directamente a nuestro endpoint POST en Express
  await axios.post(`/api/character/${character.id}/sentence`, {
    sentence: character.bestSentence,
  });

  return true;
};
*/

// ==========================================
// CON FRONTEND EN GITHUB PAGES Y SERVIDOR EN RENDER
// ==========================================

/*
// URL base del servidor Express alojado en Render
const RENDER_BACKEND_URL =
  "https://masterxviii-cloud-manual-deploy.onrender.com";

// 1. OBTENER PERSONAJE + FRASE CÉLEBRE
export const getCharacterRest = async (
  id: string,
): Promise<CharacterDetailApi> => {
  const characterResponse = await apiClient.get<CharacterDetailApi>(
    `/character/${id}`,
  );
  const characterData = characterResponse.data;

  try {
    const sentenceResponse = await axios.get(
      `${RENDER_BACKEND_URL}/api/character/${id}/sentence`,
    );
    characterData.bestSentence = sentenceResponse.data.sentence;
  } catch (error) {
    console.error("No se pudo obtener la frase célebre de Render:", error);
    characterData.bestSentence = "";
  }

  return characterData;
};

// 2. GUARDAR FRASE EN EL SERVIDOR EXPRESS
export const saveCharacter = async (
  character: CharacterDetailApi,
): Promise<boolean> => {
  await axios.post(
    `${RENDER_BACKEND_URL}/api/character/${character.id}/sentence`,
    {
      sentence: character.bestSentence,
    },
  );

  return true;
};
*/

// ===================================================================
// ENTORNO MONOLÍTICO ACTUAL (DOCKER / FULLSTACK) ---
// Al compilarse e incluirse el front dentro del contenedor, usamos rutas relativas.
// ===================================================================

// 1. OBTENER PERSONAJE + FRASE CÉLEBRE
export const getCharacterRest = async (
  id: string,
): Promise<CharacterDetailApi> => {
  const characterResponse = await apiClient.get<CharacterDetailApi>(
    `/character/${id}`,
  );
  const characterData = characterResponse.data;

  try {
    const sentenceResponse = await axios.get(`/api/character/${id}/sentence`);

    characterData.bestSentence = sentenceResponse.data.sentence;
  } catch (error) {
    console.error(
      "No se pudo obtener la frase célebre del servidor Express:",
      error,
    );
    characterData.bestSentence = "";
  }

  return characterData;
};

// 2. GUARDAR FRASE EN EL SERVIDOR EXPRESS
export const saveCharacter = async (
  character: CharacterDetailApi,
): Promise<boolean> => {
  await axios.post(`/api/character/${character.id}/sentence`, {
    sentence: character.bestSentence,
  });

  return true;
};
