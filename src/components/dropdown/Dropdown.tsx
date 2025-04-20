/**
 * Dropdown.tsx
 * ---------------------------------------------------------------------------
 * A small, fully‑typed dropdown component built with React + styled‑components.
 *
 * ✔ Supports:
 *   • Desktop and mobile sizing
 *   • Plain text options, options prefixed by a moodlet (or any ReactNode)
 *   • Disabled options
 *   • Click‑outside to close
 *
 * Props
 * ---------------------------------------------------------------------------
 * • options   – array of { id, label, prefix?, disabled? }
 * • value     – id of the currently‑selected option
 * • onChange  – callback fired with the id when a new option is picked
 *
 * Usage
 * ---------------------------------------------------------------------------
 * <Dropdown
 *   options={[
 *     { id: '1', label: 'Option 01' },
 *     { id: '2', label: 'Option 02', prefix: <Moodlet variant="primary">F</Moodlet> },
 *   ]}
 *   value={value}
 *   onChange={setValue}
 * />
 */

import {
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

/* ------------------------------------------------------------------------- */
/* Type definitions                                                          */
/* ------------------------------------------------------------------------- */

/** One entry inside the dropdown menu */
interface Option {
  /** Unique identifier returned by onChange */
  id: string;
  /** Text shown to the user */
  label: string;
  /** Optional element placed before the label (e.g. a moodlet) */
  prefix?: ReactNode;
  /** If true, option is greyed‑out and not selectable */
  disabled?: boolean;
}

/** Props accepted by the Dropdown component */
interface Props {
  /** Complete list of selectable options */
  options: Option[];
  /** Currently‑selected option id */
  value?: string;
  /** Callback fired when user picks a new option */
  onChange?: (id: string) => void;
}

/* ------------------------------------------------------------------------- */
/* Styled components                                                         */
/* ------------------------------------------------------------------------- */

/** Button that triggers the menu */
const Trigger = styled.button`
  height: 30px;
  padding: 0 8px;
  border-radius: 12px;
  background: #f8f7fa;
  border: 1px solid #a89dc8;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

/** Menu container; sizing adjusts on mobile */
const Menu = styled.ul<{ $mobile: boolean }>`
  list-style: none;
  margin: 4px 0 0;
  padding: ${(p) => (p.$mobile ? '6px 4px' : '5px 6px')};
  width: 215px;
  max-height: ${(p) => (p.$mobile ? 150 : 113)}px;
  overflow-y: auto;
  border-radius: 4px;
  background: #f8f7fa;
  border: 1px solid #a89dc8;
  box-shadow: 0px 1px 2px 0px #919eab1f;
  position: absolute;
  z-index: 10;
`;

/** Single option row */
const Li = styled.li<{
  $selected: boolean;
  $disabled: boolean;
  $mobile: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  height: ${(p) => (p.$mobile ? 30 : 22)}px;
  padding: ${(p) => (p.$mobile ? '4px 8px' : '2px 4px')};
  border-radius: ${(p) => (p.$mobile ? 12 : 8)}px;
  cursor: ${(p) => (p.$disabled ? 'not-allowed' : 'pointer')};
  background: ${(p) => (p.$selected ? '#E2DEFF' : 'transparent')};

  &:hover {
    background: ${(p) =>
      p.$disabled ? 'transparent' : 'rgba(130, 77, 255, 0.15)'};
  }
`;

/* ------------------------------------------------------------------------- */
/* Helper hook                                                               */
/* ------------------------------------------------------------------------- */

/**
 * useOutside
 * ---------------------------------------------------------------------------
 * Hook that runs `cb` when user clicks outside the referenced element.
 */
const useOutside = (
  ref: React.RefObject<HTMLElement | null>,
  cb: () => void,
) => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, cb]);
};

/* ------------------------------------------------------------------------- */
/* Component                                                                 */
/* ------------------------------------------------------------------------- */

/**
 * Dropdown
 * ---------------------------------------------------------------------------
 * Renders a trigger button and, when open, a list of selectable options.
 */
export const Dropdown: FC<Props> = ({ options, value, onChange }) => {
  /** whether the menu is currently visible */
  const [open, setOpen] = useState(false);

  /** wrapper element so we can detect outside clicks */
  const root = useRef<HTMLDivElement>(null);

  /** simple “mobile” check — re‑evaluates on first render only */
  const isMobile = window.matchMedia('(max-width: 600px)').matches;

  /* close menu when user clicks outside the component */
  useOutside(root, () => setOpen(false));

  /** select an option; ignore if disabled */
  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    onChange?.(id);
    setOpen(false);
  };

  /** currently‑selected option object */
  const selected = options.find((o) => o.id === value);

  return (
    <div
      ref={root}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {/* Trigger button ----------------------------------------------------- */}
      <Trigger onClick={() => setOpen((o) => !o)}>
        {selected?.prefix}
        <span>{selected?.label ?? 'Select…'}</span>
      </Trigger>

      {/* Menu ---------------------------------------------------------------- */}
      {open && (
        <Menu $mobile={isMobile}>
          {options.map((o) => (
            <Li
              key={o.id}
              onClick={() => handleSelect(o.id, o.disabled)}
              $selected={o.id === value}
              $disabled={!!o.disabled}
              $mobile={isMobile}
            >
              {o.prefix}
              <span>{o.label}</span>
            </Li>
          ))}
        </Menu>
      )}
    </div>
  );
};
