import { FC, MouseEvent, useState } from 'react';
import { Moodlet } from '../moodlet/Moodlet';

/* ring‑fence possible states */
type FscState = 'required' | 'current' | 'completed' | 'notRequired';

export interface FscProps {
  /** letter "F" | "S" | "C" or word "FUELLING"… */
  label: string;
  /** true: word mode, false: letter mode */
  asWord?: boolean;
  // /** colour identity */
  // colour: string;
}

const nextLeft = (s: FscState): FscState => {
  if (s === 'required') return 'current';
  if (s === 'current') return 'completed';
  if (s === 'completed') return 'current';
  return s;
};

const nextRight = (s: FscState): FscState =>
  s === 'notRequired' ? 'required' : 'notRequired';

export const FscMoodlet: FC<FscProps> = ({ label, asWord }) => {
  const [state, setState] = useState<FscState>('required');

  const handleClick = () => setState((s) => nextLeft(s));
  const handleContext = (e: MouseEvent) => {
    e.preventDefault();
    setState((s) => nextRight(s));
  };

  const variant =
    state === 'completed'
      ? 'green'
      : state === 'current'
        ? 'red'
        : state === 'notRequired'
          ? 'inactive'
          : 'primary';

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
