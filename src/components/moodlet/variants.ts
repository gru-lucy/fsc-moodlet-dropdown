/**
 *  Colour + background definitions for every visual state.
 *  Each “button” entry **must** include hover colours so
 *  we can style :hover on a <span>.
 */
export type Variant =
  | 'primary'
  | 'inactive'
  | 'secondary'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'placeholder'
  | 'disabled';

export interface VariantStyle {
  border: string;
  color: string;
  bg: string;
  hoverBorder: string;
  hoverColor: string;
  hoverBg: string;
}

export const VARIANT_STYLES: Record<
  Variant,
  { readonly: VariantStyle; button: VariantStyle }
> = {
  primary: {
    readonly: {
      border: '#824DFF',
      color: '#824DFF',
      bg: '#E2DEED',
      hoverBorder: '#824DFF',
      hoverColor: '#824DFF',
      hoverBg: '#E2DEED',
    },
    button: {
      border: '#824DFF',
      color: '#FFFFFF',
      bg: '#824DFF',
      hoverBorder: '#6D0EF1',
      hoverColor: '#FFFFFF',
      hoverBg: '#6D0EF1',
    },
  },
  inactive: {
    readonly: {
      border: '#808080',
      color: '#808080',
      bg: '#D3CEE3',
      hoverBorder: '#808080',
      hoverColor: '#808080',
      hoverBg: '#D3CEE3',
    },
    button: {
      border: '#998DBF',
      color: '#FFFFFF',
      bg: '#998DBF',
      hoverBorder: '#6E5CA3',
      hoverColor: '#FFFFFF',
      hoverBg: '#6E5CA3',
    },
  },
  secondary: {
    readonly: {
      border: '#09A7AA',
      color: '#09A7AA',
      bg: '#CCFFE9',
      hoverBorder: '#09A7AA',
      hoverColor: '#09A7AA',
      hoverBg: '#CCFFE9',
    },
    button: {
      border: '#09A7AA',
      color: '#FFFFFF',
      bg: '#09A7AA',
      hoverBorder: '#007780',
      hoverColor: '#FFFFFF',
      hoverBg: '#007780',
    },
  },
  blue: {
    readonly: {
      border: '#0B94D8',
      color: '#0B94D8',
      bg: '#B2E5FF',
      hoverBorder: '#0B94D8',
      hoverColor: '#0B94D8',
      hoverBg: '#B2E5FF',
    },
    button: {
      border: '#0B94D8',
      color: '#FFFFFF',
      bg: '#0B94D8',
      hoverBorder: '#005580',
      hoverColor: '#FFFFFF',
      hoverBg: '#005580',
    },
  },
  green: {
    readonly: {
      border: '#319B31',
      color: '#319B31',
      bg: '#D6F6D6',
      hoverBorder: '#319B31',
      hoverColor: '#319B31',
      hoverBg: '#D6F6D6',
    },
    button: {
      border: '#319B31',
      color: '#FFFFFF',
      bg: '#319B31',
      hoverBorder: '#247524',
      hoverColor: '#FFFFFF',
      hoverBg: '#247524',
    },
  },
  red: {
    readonly: {
      border: '#D22D5C',
      color: '#D22D5C',
      bg: '#F6D6E4',
      hoverBorder: '#D22D5C',
      hoverColor: '#D22D5C',
      hoverBg: '#F6D6E4',
    },
    button: {
      border: '#D22D5C',
      color: '#FFFFFF',
      bg: '#D22D5C',
      hoverBorder: '#A82443',
      hoverColor: '#FFFFFF',
      hoverBg: '#A82443',
    },
  },
  yellow: {
    readonly: {
      border: '#C39100',
      color: '#C39100',
      bg: '#FEFFCF',
      hoverBorder: '#C39100',
      hoverColor: '#C39100',
      hoverBg: '#FEFFCF',
    },
    button: {
      border: '#FFD116',
      color: '#000000',
      bg: '#FFD116',
      hoverBorder: '#C39100',
      hoverColor: '#000000',
      hoverBg: '#C39100',
    },
  },
  placeholder: {
    readonly: {
      border: '#824DFF',
      color: '#824DFF',
      bg: '#BDB2FF',
      hoverBorder: '#824DFF',
      hoverColor: '#824DFF',
      hoverBg: '#BDB2FF',
    },
    button: {
      border: '#824DFF',
      color: '#824DFF',
      bg: '#BDB2FF',
      hoverBorder: '#824DFF',
      hoverColor: '#824DFF',
      hoverBg: '#BDB2FF',
    },
  },
  disabled: {
    readonly: {
      border: '#998DBF',
      color: '#998DBF',
      bg: '#E2DEED',
      hoverBorder: '#998DBF',
      hoverColor: '#998DBF',
      hoverBg: '#E2DEED',
    },
    button: {
      border: '#998DBF',
      color: '#998DBF',
      bg: '#E2DEED',
      hoverBorder: '#998DBF',
      hoverColor: '#998DBF',
      hoverBg: '#E2DEED',
    },
  },
};
