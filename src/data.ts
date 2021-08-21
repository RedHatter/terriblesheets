import { derived, writable, Readable } from "svelte/store";
import { mapObjectValues } from "./utils";

export interface Commit {
  readonly origin: string;
  readonly changes: ReadonlyArray<Change>;
}

export enum ChangeType {
  text,
  numeric,
  ability,
  proficiency,
  array
}

export interface Change {
  readonly type: ChangeType;
  readonly key: keyof Data;
  readonly value: any;
}

export interface TextChange extends Change {
  readonly type: ChangeType.text;
  readonly key: "name" | "class" | "background" | "race" | "alignment";
  readonly value: string;
}

export interface NumericChange extends Change {
  readonly type: ChangeType.numeric;
  readonly key: "health" | "level" | "exp" | "speed";
  readonly value: number;
}

export interface AbilityChange extends Change {
  readonly type: ChangeType.ability;
  readonly key: "abilityScores";
  readonly subkey: keyof AbilityScores;
  readonly value: number;
}

export interface ProficiencyChange extends Change {
  readonly type: ChangeType.proficiency;
  readonly key: "savingThrows" | "skills";
  readonly subkey: string;
  readonly value: ProficiencyType;
}

export interface ArrayChange extends Change {
  readonly type: ChangeType.array;
  readonly key: "features";
  readonly value: ReadonlyArray<Feature>;
  readonly isRemove?: boolean;
}

export interface AbilityScores {
  readonly strength: number;
  readonly dexterity: number;
  readonly constitution: number;
  readonly intelligence: number;
  readonly wisdom: number;
  readonly charisma: number;
}

export enum ProficiencyType {
  None,
  Proficient,
  Expertise,
  JackOfAllTrades
}

export interface Proficiency {
  readonly ability: keyof AbilityScores;
  readonly proficient: ProficiencyType;
}

export interface Feature {
  readonly name: string;
  readonly description: string;
}

interface Data {
  readonly name: string;
  readonly class: string;
  readonly level: number;
  readonly background: string;
  readonly race: string;
  readonly alignment: string;
  readonly exp: number;
  readonly speed: number;
  readonly health: number;

  readonly abilityScores: AbilityScores;

  readonly savingThrows: Record<keyof AbilityScores, Proficiency>;
  readonly skills: Record<string, Proficiency>;

  readonly features: ReadonlyArray<Feature>;
}

const defaults: Data = {
  name: "",
  class: "",
  level: 1,
  background: "",
  race: "",
  alignment: "True Neutral",
  exp: 0,
  speed: 30,
  health: 0,
  abilityScores: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  },
  savingThrows: {
    strength: {
      ability: "strength",
      proficient: ProficiencyType.None
    },
    dexterity: {
      ability: "dexterity",
      proficient: ProficiencyType.None
    },
    constitution: {
      ability: "constitution",
      proficient: ProficiencyType.None
    },
    intelligence: {
      ability: "intelligence",
      proficient: ProficiencyType.None
    },
    wisdom: {
      ability: "wisdom",
      proficient: ProficiencyType.None
    },
    charisma: {
      ability: "charisma",
      proficient: ProficiencyType.None
    }
  },
  skills: {
    acrobatics: {
      ability: "dexterity",
      proficient: ProficiencyType.None
    },
    "animal handling": {
      ability: "wisdom",
      proficient: ProficiencyType.None
    },
    arcana: {
      ability: "intelligence",
      proficient: ProficiencyType.None
    },
    athletics: {
      ability: "strength",
      proficient: ProficiencyType.None
    },
    deception: {
      ability: "charisma",
      proficient: ProficiencyType.None
    },
    history: {
      ability: "intelligence",
      proficient: ProficiencyType.None
    },
    insight: {
      ability: "wisdom",
      proficient: ProficiencyType.None
    },
    intimidation: {
      ability: "charisma",
      proficient: ProficiencyType.None
    },
    investigation: {
      ability: "intelligence",
      proficient: ProficiencyType.None
    },
    medicine: {
      ability: "wisdom",
      proficient: ProficiencyType.None
    },
    nature: {
      ability: "intelligence",
      proficient: ProficiencyType.None
    },
    perception: {
      ability: "wisdom",
      proficient: ProficiencyType.None
    },
    performance: {
      ability: "charisma",
      proficient: ProficiencyType.None
    },
    persuasion: {
      ability: "charisma",
      proficient: ProficiencyType.None
    },
    religion: {
      ability: "intelligence",
      proficient: ProficiencyType.None
    },
    "sleight of hand": {
      ability: "dexterity",
      proficient: ProficiencyType.None
    },
    stealth: {
      ability: "dexterity",
      proficient: ProficiencyType.None
    },
    survival: {
      ability: "wisdom",
      proficient: ProficiencyType.None
    }
  },
  features: []
};
export const commits = writable<ReadonlyArray<Commit>>(
  JSON.parse(localStorage.getItem("playerSheet")) ?? []
);
commits.subscribe(sheet =>
  localStorage.setItem("playerSheet", JSON.stringify(sheet))
);
export const base = derived(commits, commits =>
  commits
    .flatMap(commit => commit.changes)
    .reduce((data, change) => {
      let value: any;
      switch (change.type) {
        case ChangeType.text: {
          const _change = change as TextChange;
          value = data[_change.key];
        }

        case ChangeType.numeric: {
          const _change = change as NumericChange;
          value = data[_change.key] + _change.value;
          break;
        }

        case ChangeType.ability: {
          const _change = change as AbilityChange;
          value = {
            ...data[_change.key],
            [_change.subkey]: data[_change.key][_change.subkey] + _change.value
          };
          break;
        }

        case ChangeType.proficiency: {
          const _change = change as ProficiencyChange;
          value = { ...data[_change.key], [_change.subkey]: _change.value };
          break;
        }

        case ChangeType.array: {
          const _change = change as ArrayChange;
          const _value = data[_change.key];
          value = _change.isRemove
            ? _value.filter(o => !_change.value.includes(o))
            : _value.concat(_change.value);
          break;
        }
      }

      return { ...data, [change.key]: value };
    }, defaults)
);

interface DerivedAbilityScore {
  readonly base: number;
  readonly modifier: number;
}

type DerivedProficiency = Proficiency & {
  readonly modifier: number;
};

export interface DerivedData {
  readonly name: string;
  readonly class: string;
  readonly level: number;
  readonly background: string;
  readonly race: string;
  readonly alignment: string;
  readonly exp: number;
  readonly speed: number;
  readonly health: number;
  readonly armorClass: number;
  readonly initiative: number;
  readonly proficiencyBonus: number;
  readonly passivePerception: number;
  readonly abilityScores: Record<keyof AbilityScores, DerivedAbilityScore>;
  readonly savingThrows: Record<keyof AbilityScores, DerivedProficiency>;
  readonly skills: Record<string, DerivedProficiency>;
  readonly features: ReadonlyArray<Feature>;
}

function abilityScore(value: number): DerivedAbilityScore {
  return {
    base: value,
    modifier: Math.floor((value - 10) / 2)
  };
}

export const data = derived<Readable<Data>, DerivedData>(base, data => {
  const abilityScores = mapObjectValues(data.abilityScores, abilityScore);

  function proficiency(value: Proficiency): DerivedProficiency {
    return {
      ...value,
      modifier: abilityScores[value.ability].modifier
    };
  }

  const skills = mapObjectValues(data.skills, proficiency);

  return {
    ...data,
    armorClass: 10 + abilityScores.dexterity.modifier,
    initiative: abilityScores.dexterity.modifier,
    proficiencyBonus: Math.ceil(data.level / 4) + 1,
    passivePerception: 10 + skills.perception.modifier,
    abilityScores,
    savingThrows: mapObjectValues(data.savingThrows, proficiency),
    skills
  };
});

interface Item {
  readonly name: string;
  readonly weight: number;
  readonly count: number;
  readonly description: string;
}

interface Status {
  readonly health: number;
  readonly inventory: ReadonlyArray<Item>;
}

export const status = writable<Status>(
  JSON.parse(localStorage.getItem("playerStatus")) ?? {
    health: 0,
    inventory: []
  }
);

status.subscribe(status =>
  localStorage.setItem("playerStatus", JSON.stringify(status))
);
