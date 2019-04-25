import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`

  .usb-dropdown {
    width: 200px;

    .dropdown-btn {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 2px;
      background-color: white;
      padding: 8px 10px;
      min-width: 200px;
      min-height: 32px;
      -webkit-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.5);
      -moz-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.5);
      box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.5);

      &.selected-active {
        font-weight: 600;
      }

      svg {
        position: absolute;
        right: 10px;
        height: 12px;
        width: 12px;
        fill: #5a5a5a
      }
    }

    .dropdown-list {
      position: relative;
      padding: 0;
      margin: 0;
      border: none;
      list-style-type: none;
      max-height: 0;
      overflow: hidden;

      &.expanded {
        max-height: 1000px;
        border: 1px solid #cccccc;
        border-top: none;
        -webkit-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.5);
        -moz-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.5);
        box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.5);
      }

      .item {

        button {
          display: flex;
          justify-content: flex-start;
          width: 100%;
          padding: 10px;
          background-color: white;
          border: none;

          &:hover, &.selected {
            background-color: #F7F7FB;
            color: #0A41C5;
          }
        }
      }
    }
  }
`;


class USBDropdown extends Component {
  constructor() {
    super();

    this.state = {
      dropdownExpanded: false,
      selectedItem: null
    }

    this.firstItemRef = React.createRef();
    this.dropdownBtnRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener("keydown", (e) => this.handleWindowKeys(e));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener("keydown", (e) => this.handleWindowKeys(e));
  }

  /**
   * Disable arrow keys, HOME, and END window scrolling while inside dropdown list
   */
  handleWindowKeys = (e) => {
    // space and arrow keys
    if (this.state.dropdownExpanded) {
      if([32, 35, 36, 38, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }
    if (e.keyCode === 27) {
      this.setState({ dropdownExpanded: false });
    }
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  /**
   * Collapse dropdown if clicked outside of dropdown
   */
  handleClickOutside = (e) => {
    const clickedElement = e.target;

    if (!clickedElement.classList.contains('item-btn') && 
        !clickedElement.classList.contains('dropdown-btn')) {
      this.setState({ dropdownExpanded: false });
    }
  }

  toggleDropdown = () => {
    const firstItem = this.firstItemRef.current;

    this.setState({ 
      dropdownExpanded: !this.state.dropdownExpanded 
    }, () => {
      if (this.state.dropdownExpanded) {
        firstItem.focus();
      }
    });
  }

  handleItemClick = (item) => {
    const dropDownBtn = this.dropdownBtnRef.current;
    dropDownBtn.focus();

    this.setState({ 
      dropdownExpanded: false,
      selectedItem: item
    });
  }

  handleItemKeyUp = (e) => {
    const keyUp = e.keyCode;
    const UP = 38;
    const DOWN = 40; 
    const END = 35;
    const HOME = 36;

    const dropdownItems = Array.from(document.querySelectorAll(".item-btn"));
    let activeElement = document.activeElement;
    let currentIndex = dropdownItems.indexOf(activeElement);
    
    // Handle dropdown arrow key movement
    switch(keyUp) {
      case DOWN:
        if (currentIndex === dropdownItems.length - 1) {
          // Add focus to first button
          dropdownItems[0].focus();
        } else {
          // Add focus to next accordion
          let nextIndex = ++currentIndex;
          dropdownItems[nextIndex].focus();
        }
        break;
      case UP:
        if (currentIndex === 0) {
          // Add focus to last accordion
          dropdownItems[dropdownItems.length - 1].focus();
        } else {
          // Add focus to previous accordion
          let prevIndex = --currentIndex;
          dropdownItems[prevIndex].focus();
        }
        break;
      case END:
        // Add focus to last dropdown item
        dropdownItems[dropdownItems.length - 1].focus();
        break;
      case HOME:
        // Add focus to first dropdown item
        dropdownItems[0].focus();
        break;
      default:
        break;
    }
  }
  
  render() {
    const { dropdownPlaceholder, items } = this.props;
    const { dropdownExpanded, selectedItem } = this.state;

    return (
      <Container>
        
        <div className="usb-dropdown" ref={this.setWrapperRef}>
          <button ref={this.dropdownBtnRef}
            className={selectedItem ? "dropdown-btn selected-active" : "dropdown-btn"}
            aria-haspopup="listbox"
            aria-labelledby="exp_button"
            aria-expanded={dropdownExpanded}
            id="exp_button"
            onClick={this.toggleDropdown}
          >
            { selectedItem ? selectedItem : dropdownPlaceholder }
            <svg id='Working_area' data-name='Working area' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs />
              <polyline className='cls-1' points='32 48.54 61.5 18.98 57.98 15.46 32 41.51 6.02 15.46 2.5 18.98 32 48.54'/>
            </svg>
          </button>
          <ul className={dropdownExpanded ? "dropdown-list expanded" : "dropdown-list"}
              id="dropdown_item_list"
              tabIndex="-1"
              role="listbox"
          >
            { 
              items.map((item, i) => {
                return (
                  <li className="item" key={i}>
                    <button id="exp_elem_Np" role="option"
                      aria-selected={selectedItem === item}
                      className={selectedItem === item ? "item-btn selected" : "item-btn"}
                      ref={i === 0 ? this.firstItemRef : null}
                      onClick={() => this.handleItemClick(item)}
                      onKeyUp={this.handleItemKeyUp}
                    >
                      { item }
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </div>

      </Container>
    );
  }
}

export default USBDropdown;

USBDropdown.propTypes = {
  dropdownPlaceholder: PropTypes.string,
  items: PropTypes.array
}

USBDropdown.defaultProps = {
  dropdownPlaceholder: "",
  items: ["Item 1", "Item 2", "Item 3"] 
}