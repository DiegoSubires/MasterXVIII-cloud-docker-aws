import React from "react";
import heroImage from "@/assets/hero.png";
import { CharacterCard } from "./components/character-card.component";
import type { CharacterVm } from "./character-list.vm";
import classes from "./character-list.module.scss";

interface Props {
  characters: CharacterVm[];
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onPageChange: (page: number) => void;
  onCharacterClick: (id: string) => void;
}

export const CharacterListComponent: React.FC<Props> = ({
  characters,
  currentPage,
  totalPages,
  searchTerm,
  onSearchChange,
  onPageChange,
  onCharacterClick,
}) => {
  return (
    <div className={classes.characterListContainer}>
      {/* Banner procesado mediante SCSS */}
      <img
        src={heroImage}
        alt="Rick and Morty Banner"
        className={classes.heroBanner}
      />

      {/* Búsqueda */}
      <div className={classes.searchBar}>
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Listado con imágenes del CDN externo */}
      <div className={classes.gridContainer}>
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onSelect={onCharacterClick}
          />
        ))}
      </div>

      {/* Paginación */}
      <div className={classes.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
