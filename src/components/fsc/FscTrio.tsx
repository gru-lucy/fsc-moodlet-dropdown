import { FC } from 'react';
import styled from 'styled-components';
import { FscMoodlet } from './FscMoodlet';

const Row = styled.div`
  display: flex;
  gap: 4px;
`;

interface Props {
  /** render with words rather than letters */
  wordMode?: boolean;
}

export const FscTrio: FC<Props> = ({ wordMode }) => (
  <Row>
    <FscMoodlet
      label={wordMode ? 'FUELLING' : 'F'}
      asWord={wordMode}
      // colour="#D22D5C"
    />
    <FscMoodlet
      label={wordMode ? 'SERVICING' : 'S'}
      asWord={wordMode}
      // colour="#319B31"
    />
    <FscMoodlet
      label={wordMode ? 'CLEANING' : 'C'}
      asWord={wordMode}
      // colour="#998DBF"
    />
  </Row>
);
