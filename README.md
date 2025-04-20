# FSC Moodlet Demo _(React + Vite + styled‑components)_

A tiny reference implementation of the **FSC Moodlet** interaction pattern plus a reusable dropdown component.  
It demonstrates:

* The full _required → current → completed / not‑required_ state‑machine for each moodlet
* A trio wrapper (`FscTrio`) that renders **Fuelling, Servicing, Cleaning** pills
* Adaptive colouring through a single `Moodlet` core component
* A keyboard‑/mouse‑friendly dropdown that supports:
  * Text options  
  * Options prefixed with moodlets (or any ReactNode)  
  * Disabled items  
  * Desktop / mobile sizing  
  * Click‑outside‑to‑close

---

## 1 · Quick start

```bash
git clone <repo-url> fsc-moodlet-demo
cd fsc-moodlet-demo
npm i          # installs React, Vite, styled-components, etc.
npm run dev    # starts Vite on http://localhost:5173
```

Open the URL above and play with the components.

## 2 · File structure

```bash
src/
  components/
    moodlet/
      Moodlet.tsx          – generic coloured pill
      variants.ts          – colour palettes
    fsc/
      FscMoodlet.tsx       – single FSC pill w/ state machine
      FscTrio.tsx          – convenience trio
    dropdown/
      Dropdown.tsx         – menu component
  App.tsx                  – quick demo page
  main.tsx                 – Vite entry
```

## 3 · Components

### `<Moodlet>`

| Prop | Type | Default | Description |
| -------- | -------- | -------- | -------- |
| variant | `"primary" or "blue" or "green"` … | "primary" | Visual palette (colours + hover) |
| readOnly | boolean | false | Greyed‑out, no pointer events |
| onClick | () => void | – | Left‑click handler |
| onContextMenu | (e) => void | – | Right‑click handler |
| disabled | boolean | false | Same look as readOnly but keyboard‑inaccessible |

### `<FscMoodlet>`

| Prop | Type | Default | Description |
| -------- | -------- | -------- | -------- |
| label | `"F" or "S" or "C"` or full word | - | Letter or word shown inside the pill |
| asWord | boolean | false | Render the full word instead of single letter |

State machine:

* required (start) → left‑click → current

* current → left‑click → completed

* completed → left‑click → current

* any state ⇆ right‑click ⇆ notRequired (read‑only)

### `<FscTrio>`

Renders three independent `<FscMoodlet>` components side by side.

Prop | Type | Default | Description
wordMode | boolean | false | Show full words instead of letters

### `<Dropdown>`

| Prop | Type | Description |
| -------- | -------- | -------- |
| options | { id, label, prefix?, disabled? }[] | Menu data |
| value | string | Currently‑selected option id (default: undefined) |
| onChange | (id: string) => void | Fired when user selects a new option |

## 4 · Styling tokens

All colours come straight from the product palette:

| Variant | Normal | Hover | Background (read‑only) |
| -------- | -------- | -------- | -------- |
| primary | #824DFF | #6D0EF1 | #E2DEED |
| inactive | #998DBF | #6E5CA3 | #D3CEE3 |
| secondary | #09A7AA | #007780 | #CCFFE9 |
| blue | #0B94D8 | #005580 | #B2E5FF |
| green | #319B31 | #247524 | #D6F6D6 |
| red | #D22D5C | #A82443 | #F6D6E4 |
| yellow | #FFD116 | #C39100 | #FEFFCF |

## 5 · Adding to your own project

1. `npm i styled-components @types/styled-components`

2. Copy the `components/` folder into your codebase.

3. Import and use:

```bash
import { FscTrio } from './components/fsc/FscTrio';
import { Dropdown } from './components/dropdown/Dropdown';

function Example() {
  return (
    <>
      <FscTrio wordMode />      {/* full words */}
      <Dropdown
        options={[
          { id: '1', label: 'Low',  prefix: <FscTrio /> },
          { id: '2', label: 'High', prefix: <FscTrio wordMode /> },
        ]}
      />
    </>
  );
}
```

No additional configuration required. Enjoy!
