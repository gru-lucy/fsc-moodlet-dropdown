import { useState } from 'react';
import { FscTrio } from './components/fsc/FscTrio';
import { Dropdown } from './components/dropdown/Dropdown';
import { Moodlet } from './components/moodlet/Moodlet';
import { Smile } from 'lucide-react';
import './App.css';

export default function App() {
  const [choice, setChoice] = useState<string | undefined>();

  return (
    <main style={{ padding: 40, display: 'grid', gap: 40 }}>
      <h2>FSC trio (letter)</h2>
      <FscTrio />

      <h2>FSC trio (word)</h2>
      <FscTrio wordMode />

      <h2>Generic moodlets</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Moodlet variant="red">STOP</Moodlet>
        <Moodlet variant="green">OK</Moodlet>
        <Moodlet variant="yellow">WARN</Moodlet>
        <Moodlet variant="primary">F</Moodlet>
        <Moodlet variant="primary" className='p-horizontal-1'>
          <Smile size={12} />
        </Moodlet>
        <Moodlet variant="primary">
          LOR
        </Moodlet>
        <Moodlet variant="primary" className='p-right-1'>
          <Smile size={12} />
          Smile
        </Moodlet>
        <Moodlet variant="primary" className='p-left-1'>
          Smile
          <Smile size={12} />
        </Moodlet>
      </div>

      <h2>Dropdown mixing text + moodlets</h2>
      <Dropdown
        value={choice}
        onChange={setChoice}
        options={[
          {
            id: 'opt1',
            label: 'Option 01',
            prefix: <Moodlet variant="primary">F</Moodlet>,
          },
          {
            id: 'opt2',
            label: 'Option 02',
            prefix: <Moodlet variant="secondary">S</Moodlet>,
          },
          {
            id: 'opt3',
            label: 'Option 03',
            prefix: <Moodlet variant="red">C</Moodlet>,
          },
          { id: 'opt4', label: 'Only text' },
        ]}
      />
    </main>
  );
}
