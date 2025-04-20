import {
  FC,
  // PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

interface Option {
  id: string;
  label: string;
  /** optional moodlet element */
  prefix?: ReactNode;
  disabled?: boolean;
}

interface Props {
  options: Option[];
  value?: string;
  onChange?: (id: string) => void;
}

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

const useOutside = (ref: React.RefObject<HTMLElement | null>, cb: () => void) => {
  useEffect(() => {
    const handler = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && cb();
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, cb]);
};

export const Dropdown: FC<Props> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const isMobile = window.matchMedia('(max-width: 600px)').matches;

  useOutside(root, () => setOpen(false));

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    onChange?.(id);
    setOpen(false);
  };

  const selected = options.find((o) => o.id === value);

  return (
    <div ref={root} style={{ position: 'relative', display: 'inline-block' }}>
      <Trigger onClick={() => setOpen((o) => !o)}>
        {selected?.prefix}
        <span>{selected?.label ?? 'Select…'}</span>
      </Trigger>
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
