import React from "react";
import type { CharacterVm } from "../character-list.vm";
import classes from "./character-card.module.scss";

interface Props {
  character: CharacterVm;
  onSelect: (id: string) => void;
}

export const CharacterCard: React.FC<Props> = ({ character, onSelect }) => {
  const statusClass = character.status.toLowerCase();

  return (
    <div
      className={classes.characterCard}
      onClick={() => onSelect(character.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(character.id);
        }
      }}
    >
      <img src={character.image} alt={character.name} />
      <div className={classes.cardContent}>
        <h3>{character.name}</h3>
        <span
          className={`${classes.statusBadge} ${classes[statusClass] || ""}`}
        >
          {character.status}
        </span>
        <p>
          <strong>Especie:</strong> {character.species}
        </p>
        <p>
          <strong>Origen:</strong> {character.origin}
        </p>
      </div>
    </div>
  );
};
