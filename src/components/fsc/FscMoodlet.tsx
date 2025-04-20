/**
 * FscMoodlet.tsx
 * ----------------------------------------------------------------------------
 * Single FSC moodlet ( Fuelling | Servicing | Cleaning ) that follows the
 * required state‑machine described in the product spec.
 *
 * STATE MACHINE
 * -------------
 * ┌──────────┐   left‑click    ┌──────────┐   left‑click    ┌──────────┐
 * │ required │ ─────────────▶  │ current  │ ─────────────▶ │ completed│
 * └──────────┘                 └──────────┘                 └──────────┘
 *        ▲                          │                             │
 *        │                          └────────────┐                │
 *        │            right‑click (toggle)       │                │
 *        │                                       ▼                │
 *        └───────────────────────────────  ┌───────────┐ ◀────────┘
 *                                          │notRequired│
 *                                          └───────────┘
 *
 * INTERACTIONS
 * ------------
 * • Left‑click
 *      required  → current
 *      current   → completed
 *      completed → current   (cycles between current/completed)
 *
 * • Right‑click (context menu)
 *      any state ⇄ notRequired
 *      *In “notRequired” the pill becomes read‑only; left‑click is ignored.*
 *
 * VISUALS
 * -------
 * required      → "primary"   (purple outline / fill on hover)
 * current       → "blue"      (blue)
 * completed     → "green"     (green)
 * notRequired   → "inactive"  (grey, read‑only)
 *
 * PROPS
 * -----
 * • label   – "F" | "S" | "C" or the full word
 * • asWord  – render full word when true, single letter when false
 *
 * USAGE
 * -----
 * <FscMoodlet label="F" />            // single letter
 * <FscMoodlet label="FUELLING" asWord // full word
 *
 * DEPENDS ON
 * ----------
 * • Moodlet.tsx  – generic pill component with colour variants
 */

import { FC, MouseEvent, useState } from 'react';
import { Moodlet } from '../moodlet/Moodlet';
import { Variant } from '../moodlet/variants';

/* ------------------------------------------------------------------------- */
/* Types & helpers                                                           */
/* ------------------------------------------------------------------------- */

type FscState = 'required' | 'current' | 'completed' | 'notRequired';

/** Forward transition for left‑click */
const nextLeft = (s: FscState): FscState =>
  s === 'required' ? 'current' : s === 'current' ? 'completed' : s === 'completed' ? 'current' : s;

/** Toggle notRequired on right‑click */
const nextRight = (s: FscState): FscState => (s === 'notRequired' ? 'required' : 'notRequired');

/** Map the FSM state to a visual variant defined in variants.ts */
const variantOf = (s: FscState): Variant =>
  s === 'current' ? 'blue' : s === 'completed' ? 'green' : s === 'notRequired' ? 'inactive' : 'primary';

export interface FscProps {
  /** "F" | "S" | "C"  or  "FUELLING" | "SERVICING" | "CLEANING" */
  label: string;
  /** true → render full word, false → single letter (default) */
  asWord?: boolean;
}

/* ------------------------------------------------------------------------- */
/* Component                                                                 */
/* ------------------------------------------------------------------------- */

export const FscMoodlet: FC<FscProps> = ({ label, asWord }) => {
  const [state, setState] = useState<FscState>('required');

  /* --------------------------------------------------------------------- */
  /* Event handlers                                                        */
  /* --------------------------------------------------------------------- */

  /** left‑click advances the state (unless read‑only) */
  const handleClick = () => setState((s) => nextLeft(s));

  /** right‑click toggles notRequired */
  const handleContext = (e: MouseEvent) => {
    e.preventDefault();
    setState((s) => nextRight(s));
  };

  /* --------------------------------------------------------------------- */
  /* Render                                                                */
  /* --------------------------------------------------------------------- */

  const variant = variantOf(state);

  const content = asWord ? (
    <span>{label}</span>
  ) : (
    <span style={{ fontWeight: 700 }}>{label[0]}</span>
  );

  return (
    <Moodlet
      variant={variant}
      onClick={state !== 'notRequired' ? handleClick : undefined}
      readOnly={state === 'notRequired'}
      onContextMenu={handleContext}
    >
      {content}
    </Moodlet>
  );
};
