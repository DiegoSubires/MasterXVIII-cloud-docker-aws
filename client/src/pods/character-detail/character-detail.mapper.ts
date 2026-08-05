import * as apiModel from "./api/character-detail.api-model";
import * as viewModel from "./character-detail.vm";

export const mapCharacterFromApiToVm = (
  character: apiModel.CharacterDetailApi,
): viewModel.CharacterDetailVm => ({
  id: character.id?.toString() ?? "",
  name: character.name ?? "",
  status: character.status ?? "Unknown",
  species: character.species ?? "Unknown",
  type: character.type || "N/A",
  gender: character.gender ?? "Unknown",
  origin: character.origin?.name || "Desconocido",
  location: character.location?.name || "Desconocido",
  image: character.image || "",
  // Soporta tanto el array de strings de REST como los objetos { id } de GraphQL
  episodesCount: Array.isArray(character.episode)
    ? character.episode.length
    : 0,
  bestSentence: character.bestSentence || "",
});

export const mapCharacterFromVmToApi = (
  characterVm: viewModel.CharacterDetailVm,
  originalApiCharacter: apiModel.CharacterDetailApi,
): apiModel.CharacterDetailApi => ({
  ...originalApiCharacter,
  bestSentence: characterVm.bestSentence,
});
