export interface CharacterVm {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  origin: string;
}

export interface CharacterListVm {
  characters: CharacterVm[];
  info: {
    count: number;
    pages: number;
    currentPage: number;
  };
}
