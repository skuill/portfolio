import React from 'react';
import { Jumbotron } from './migration';
import {
  Container,
  Row,
} from "react-bootstrap";
import { Chrono } from "react-chrono";

const Experience = ({ experiences }) => {
  return (
    <section className="section">
      <Container>
        <Jumbotron id="experience" className="bg-white">
          <h2 className="display-4 mb-5 text-center">
            {experiences.heading}
          </h2>
          <Row >
            <Chrono items={experiences.data} 
              mediaHeight="170"
              highlightCardsOnHover 
              mode="VERTICAL_ALTERNATING" 
              disableToolbar 
              mediaSettings={{ align: 'center', imageFit: 'contain' }}
              theme={{
                primary: '#212529',
                secondary: '#e9ecef',
                titleColor: '#083c87',
                titleColorActive: '#09639e',
                cardTitleColor: '#083c87',
                nestedCardTitleColor: '#083c87'
              }}
              fontSizes={{
                cardSubtitle: '1rem',
                cardText: '0.95rem',
                cardTitle: '1.1rem',
                title: '1.1rem',
              }}
              scrollable={{ scrollbar: true }}
            />
          </Row>
        </Jumbotron>
      </Container>
    </section>
  );
}

export default Experience;