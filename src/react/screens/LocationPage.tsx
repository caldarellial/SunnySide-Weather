import React from 'react';
import ReactDOM from 'react-dom';

import { Card, Section } from '../components/Card/Card';

export function LocationPage(props: any) {
  return (
    <Card>
      <Section borderBottom>

      </Section>
      <Section>

      </Section>
    </Card>
  );
}

ReactDOM.render(<LocationPage />, document.getElementById('locationDetails'));