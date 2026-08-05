export interface CharacterDetailVm {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
  episodesCount: number;
  bestSentence?: string;
}

export const createEmptyCharacterDetail = (): CharacterDetailVm => ({
  id: "",
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  origin: "",
  location: "",
  image: "",
  episodesCount: 0,
  bestSentence: "",
});
