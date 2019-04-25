import React, { Component } from 'react';
import './index.css';
import styled from 'styled-components';

import USBDropdown from './components/USBDropdown';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 600px;
  width: 600px;
  padding: 100px 0;
  margin: 0 auto;
  border: 4px solid navy;
  border-radius: 10px;
  background-color: white;

  .block {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.dark {
      background-color: #0C2074;
    }
  }
`;


class App extends Component {
  constructor() {
    super();

    this.testRef = React.createRef();
  }

  render() {
    return (
      <Container>

        <USBDropdown
          dropdownPlaceholder="Dropdown"
          items={ ["Item 1", "Item 2", "Item 3", "Item 4"] }
        />

      </Container>
    );
  }
}

export default App;
