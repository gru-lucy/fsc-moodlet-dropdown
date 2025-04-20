import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { VARIANT_STYLES, Variant } from './variants';

interface Props {
  /** visual variant */
  variant?: Variant;
  /** read‑only pill (no pointer events) */
  readOnly?: boolean;
  /** pill contents: letter, word, icon(s)… */
  children: ReactNode;
  /** left‑click */
  onClick?: () => void;
  /** right‑click */
  onContextMenu?: (e: React.MouseEvent) => void;
  /** disabled state */
  disabled?: boolean;
  className?: string;
}

const Pill = styled.span<{
  $styles: ReturnType<typeof getStyles>;
  $interactive: boolean;
}>`
  display: inline-flex;
  align-items: center;
  user-select: none;
  height: 14px;
  padding: 0 4px;
  gap: 3px;
  border-radius: 1000px;
  font-size: 10px;
  line-height: 1;
  border: 1px solid ${(p) => p.$styles.border};
  background: ${(p) => p.$styles.bg};
  color: ${(p) => p.$styles.color};
  width: fit-content;
  ${(p) =>
    p.$interactive &&
    css`
      cursor: pointer;
      &:hover {
        border-color: ${p.$styles.hoverBorder};
        background: ${p.$styles.hoverBg};
        color: ${p.$styles.hoverColor};
      }
    `}
  ${(p) =>
    !p.$interactive &&
    css`
      cursor: default;
    `}
  transition: all 0.15s ease;
  /* make the span keyboard‑focusable like a button */
  outline: none;
  &:focus-visible {
    box-shadow: 0 0 0 2px #6d0ef1;
  }
`;

const getStyles = (v: Variant, readOnly: boolean) =>
  readOnly ? VARIANT_STYLES[v].readonly : VARIANT_STYLES[v].button;

export const Moodlet: FC<Props> = ({
  variant = 'primary',
  readOnly = false,
  children,
  onClick,
  onContextMenu,
  disabled,
  className,
}) => {
  const interactive = !readOnly && !disabled;
  const styles = getStyles(variant, !interactive);

  return (
    <Pill
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      $styles={styles}
      $interactive={!!interactive}
      onClick={interactive ? onClick : undefined}
      onContextMenu={onContextMenu}
      className={className}
    >
      {children}
    </Pill>
  );
};
