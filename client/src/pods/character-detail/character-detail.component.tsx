import React, { useState } from "react";
import type { CharacterDetailVm } from "./character-detail.vm";
import classes from "./character-detail.module.scss";

interface Props {
  character: CharacterDetailVm;
  onBack: () => void;
  onSave: (character: CharacterDetailVm) => void;
}

export const CharacterDetailComponent: React.FC<Props> = ({
  character,
  onBack,
  onSave,
}) => {
  const [formData, setFormData] = useState<CharacterDetailVm>(character);
  const [prevCharacter, setPrevCharacter] =
    useState<CharacterDetailVm>(character);

  if (character !== prevCharacter) {
    setPrevCharacter(character);
    setFormData(character);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      bestSentence: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const statusClass = (formData.status || "").toLowerCase();

  return (
    <div className={classes.characterDetailContainer}>
      <button className={classes.btnBack} onClick={onBack}>
        ← Volver a la lista
      </button>

      <div className={classes.detailCard}>
        {formData.image ? (
          <img src={formData.image} alt={formData.name} />
        ) : (
          <div className={classes.placeholderImage} />
        )}

        <div className={classes.info}>
          <h2>{formData.name}</h2>
          <span
            className={`${classes.statusBadge} ${classes[statusClass] || ""}`}
          >
            {formData.status}
          </span>

          <div className={classes.infoRow}>
            <p>
              <strong>Especie:</strong> {formData.species}
            </p>
            <p>
              <strong>Género:</strong> {formData.gender}
            </p>
            <p>
              <strong>Tipo:</strong> {formData.type || "N/A"}
            </p>
            <p>
              <strong>Origen:</strong> {formData.origin}
            </p>
            <p>
              <strong>Ubicación actual:</strong> {formData.location}
            </p>
            <p>
              <strong>Episodios en los que aparece:</strong>{" "}
              {formData.episodesCount}
            </p>
          </div>

          <form onSubmit={handleSubmit} className={classes.formContainer}>
            <label htmlFor="bestSentence">
              <strong>Frase célebre:</strong>
            </label>
            <div className={classes.inputGroup}>
              <input
                id="bestSentence"
                type="text"
                value={formData.bestSentence ?? ""}
                onChange={handleChange}
                placeholder="Introduce una frase célebre..."
              />
              <button type="submit" className={classes.btnSave}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
