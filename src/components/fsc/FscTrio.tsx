/**
 * FscTrio.tsx
 * ----------------------------------------------------------------------------
 * Convenience wrapper that shows the full “F S C” trio in a single row.
 *
 * FEATURES
 * --------
 * • Each pill is an independent <FscMoodlet>, so every one keeps its own
 *   state machine (required → current → completed / notRequired) exactly as
 *   described in the FSC spec.
 * • Optional `wordMode` prop swaps the single‑letter codes for the full words
 *   “FUELLING”, “SERVICING”, “CLEANING”.
 *
 * PROPS
 * -----
 * | Prop     | Type    | Default | Description                                   |
 * |----------|---------|---------|-----------------------------------------------|
 * | wordMode | boolean | false   | `true` → render full words instead of letters |
 *
 * USAGE
 * -----
 * ```tsx
 * // Letter version
 * <FscTrio />
 *
 * // Word version
 * <FscTrio wordMode />
 * ```
 *
 * DEPENDS ON
 * ----------
 * • FscMoodlet.tsx – the single‑pill component containing the FSC FSM logic
 */

import { FC } from 'react';
import styled from 'styled-components';
import { FscMoodlet } from './FscMoodlet';

/* ------------------------------------------------------------------------- */
/* Layout helper                                                             */
/* ------------------------------------------------------------------------- */

const Row = styled.div`
  display: flex;
  gap: 4px;
`;

/* ------------------------------------------------------------------------- */
/* Component                                                                 */
/* ------------------------------------------------------------------------- */

interface Props {
  /** true → show full words, false → single letters */
  wordMode?: boolean;
}

export const FscTrio: FC<Props> = ({ wordMode }) => (
  <Row>
    <FscMoodlet label={wordMode ? 'FUELLING' : 'F'} asWord={wordMode} />
    <FscMoodlet label={wordMode ? 'SERVICING' : 'S'} asWord={wordMode} />
    <FscMoodlet label={wordMode ? 'CLEANING' : 'C'} asWord={wordMode} />
  </Row>
);
