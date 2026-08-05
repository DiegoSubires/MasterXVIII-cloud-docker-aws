// ==========================================
// 1. MODELOS COMUNES / BASE
// ==========================================
export interface InfoApi {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterApi {
  id: number | string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url?: string;
  };
  location?: {
    name: string;
    url?: string;
  };
  image: string;
  episode?: string[];
  url?: string;
  created?: string;
}

// ==========================================
// 2. RESPUESTAS Y PARAMETROS REST API
// ==========================================
export interface CharacterResponseApi {
  info: InfoApi;
  results: CharacterApi[];
}

export interface GetCharactersRestParams {
  page?: number;
  name?: string;
}
