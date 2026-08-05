import React from "react";
import { useNavigate } from "react-router-dom";
import { getCharacterListRest } from "./api/character-list.api";
import { mapCharacterListFromApiToVm } from "./character-list.mapper";
import { CharacterListComponent } from "./character-list.component";
import type { CharacterVm } from "./character-list.vm";

const ITEMS_PER_PAGE = 15;

const useDebounce = <T,>(value: T, delay: number = 400): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const CharacterListPod: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const apiPage = Math.floor(((currentPage - 1) * ITEMS_PER_PAGE) / 20) + 1;

  const [characters, setCharacters] = React.useState<CharacterVm[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  React.useEffect(() => {
    getCharacterListRest(apiPage, debouncedSearchTerm)
      .then((response) => {
        const mapped = mapCharacterListFromApiToVm(response.results);
        setCharacters(mapped.slice(0, ITEMS_PER_PAGE));
        setTotalPages(
          Math.ceil((response.info?.count ?? 0) / ITEMS_PER_PAGE) || 1,
        );
      })
      .catch(() => setCharacters([]));
  }, [apiPage, debouncedSearchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCharacterClick = (id: string) => {
    navigate(`/character/${id}`);
  };

  return (
    <CharacterListComponent
      characters={characters}
      currentPage={currentPage}
      totalPages={totalPages}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onPageChange={setCurrentPage}
      onCharacterClick={handleCharacterClick}
    />
  );
};
