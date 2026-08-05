import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterRest, saveCharacter } from "./api/character-detail.api";
import type { CharacterDetailApi } from "./api/character-detail.api-model";
import {
  mapCharacterFromApiToVm,
  mapCharacterFromVmToApi,
} from "./character-detail.mapper";
import {
  type CharacterDetailVm,
  createEmptyCharacterDetail,
} from "./character-detail.vm";
import { CharacterDetailComponent } from "./character-detail.component";

export const CharacterDetailPod: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [characterVm, setCharacterVm] = React.useState<CharacterDetailVm>(
    createEmptyCharacterDetail(),
  );
  const [rawApiData, setRawApiData] = React.useState<CharacterDetailApi | null>(
    null,
  );

  // 1. Inicializamos en true si hay un id presente
  const [loading, setLoading] = React.useState<boolean>(Boolean(id));

  React.useEffect(() => {
    let isMounted = true;

    if (id) {
      // 2. Eliminamos la línea setLoading(true); de aquí para evitar el render en cascada
      getCharacterRest(id)
        .then((apiData) => {
          if (isMounted && apiData) {
            setRawApiData(apiData);
            setCharacterVm(mapCharacterFromApiToVm(apiData));
          }
        })
        .catch((error) => {
          console.error("Error al cargar el personaje:", error);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSave = async (updatedVm: CharacterDetailVm) => {
    if (!rawApiData) return;

    try {
      const apiToSave = mapCharacterFromVmToApi(updatedVm, rawApiData);
      const success = await saveCharacter(apiToSave);

      if (success) {
        setCharacterVm(updatedVm);

        alert("¡Frase guardada correctamente!");
      }
    } catch (error) {
      console.error("Error al guardar la frase:", error);
    }
  };

  if (loading) {
    return <div style={{ color: "#fff", padding: "2rem" }}>Cargando...</div>;
  }

  return (
    <CharacterDetailComponent
      key={characterVm.id}
      character={characterVm}
      onBack={() => navigate("/")}
      onSave={handleSave}
    />
  );
};
