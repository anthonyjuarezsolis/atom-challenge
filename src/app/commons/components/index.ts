export * from "./atoms";
export * from "./molecules";

import { ATOMS_COMPONENT } from "./atoms";
import { MOLECULES_COMPONENT } from "./molecules";

export const AtomComponents = [...ATOMS_COMPONENT, ...MOLECULES_COMPONENT];
