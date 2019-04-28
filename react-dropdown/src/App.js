import React, { Component } from 'react';
import './index.css';
import styled from 'styled-components';

import Dropdown from './components/Dropdown';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 600px;
  width: 60%;
  min-width: 300px;
  padding: 100px 0;
  margin: 0 auto;
  border: 4px solid black;
  border-radius: 10px;
  background-color: white;
`;


class App extends Component {
  constructor() {
    super();

    this.testRef = React.createRef();
  }

  render() {
    return (
      <Container>

        <Dropdown
          dropdownPlaceholder="Dropdown"
          items={ ["Item 1", "Item 2", "Item 3", "Item 4"] }
        />

      </Container>
    );
  }
}

export default App;
