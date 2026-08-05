import type { CharacterApi } from "./api/character-list.api-model";
import type { CharacterVm } from "./character-list.vm";

export const mapCharacterFromApiToVm = (
  character: CharacterApi,
): CharacterVm => ({
  id: character.id.toString(),
  name: character.name,
  status: character.status,
  species: character.species,
  image: character.image,
  gender: character.gender,
  origin: character.origin?.name ?? "Desconocido",
});

export const mapCharacterListFromApiToVm = (
  characterList: CharacterApi[],
): CharacterVm[] =>
  Array.isArray(characterList)
    ? characterList.map(mapCharacterFromApiToVm)
    : [];
