import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Select = styled.div`
    position: relative;
`;

const SelectedVal = styled.div`
    height: 60px;
    padding: 20px;
    background: #F2F2F2;
`;

const DropdownList = styled.ul`
    position: absolute;
    list-style-type: none;
    padding: 0;
    margin: 0px;
    width: 100%;
    border: 1px solid #E3E3E3;
    border-top: 0;
    display: none;
    ${props => (props.height !== 'auto') && `
      height: ${props.height}px;
      overflow-y: auto;
    `};

    &.open {
        display: block;
    }
`;

const DropdownItems = styled.li`
    padding: 10px 20px;

    &.active {
        background-color: #007d8d;
        color: #fff;
    }
`;

const Icon = styled.span`
    float: right;

    &::before {
      border-style: solid;
      border-width: 3px 3px 0 0;
      content: '';
      display: inline-block;
      height: 10px;
      left: 0.15em;
      position: relative;
      vertical-align: top;
      width: 10px;
      top: 0;
      transform: rotate(135deg);
      color: ${props => props.color};
    }
`;

class SelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    const { data, labelToShow } = this.props;
    let items = [];
    const dataType = typeof(data[0]);
    if(dataType !== 'object') {
      data.forEach(element => {
        items.push({label: element, value: element})
      });
    } else {
      items = data
    }
    this.state = {
      open: false,
      items,
      word: '',
      selectedWordIndex: -1,
      selectedVal: 'Select',
      label: labelToShow,
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.closeDropdown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeDropdown);
  }

  toggleDropdown = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    }, () => {
      if (open) {
        window.removeEventListener('keydown', this.myCustomSelect);
      } else {
        window.addEventListener('keydown', this.myCustomSelect);
      }
    });
  }

  closeDropdown = (e) => {
    const { open } = this.state;
    if (open) {
      const acc = document.getElementsByClassName('dropdown');
      if (!acc[0].contains(e.target)) {
        this.setState({
          open: false,
        }, () => {
          window.removeEventListener('keydown', this.myCustomSelect);
        });
      }
    }
  }

  myCustomSelect = (e) => {
    e.preventDefault();
    const { word, items, selectedWordIndex, label } = this.state;
    const pressedKey = e.key;
    const { keyCode } = e;
    if (keyCode === 13) { //Enter key Hander
      this.clickHandler();
      return;
    }
    const newWord = word + pressedKey;
    this.setState({
      word: newWord,
    });
    let newSelectedWordIndex = items.findIndex(x => x[label].toLowerCase().indexOf(newWord) > -1);
    if (keyCode === 38 && selectedWordIndex !== -1) { //Up Arrow Handler
      newSelectedWordIndex = selectedWordIndex - 1;
    }
    if (keyCode === 40 && selectedWordIndex < items.length - 1) { // Down Arrow Handler
      newSelectedWordIndex = selectedWordIndex + 1;
    }
    this.setState({
      selectedWordIndex: newSelectedWordIndex,
    });
    if (newSelectedWordIndex === -1) {
      newSelectedWordIndex = items.findIndex(x => x[label].toLowerCase().indexOf(pressedKey) > -1);
      if (newSelectedWordIndex === -1) {
        this.setState({
          word: '',
        });
      } else {
        this.setState({
          word: pressedKey,
          selectedWordIndex: newSelectedWordIndex,
        });
      }
    }
    this.scrollHandling(newSelectedWordIndex);
  }

  scrollHandling(index) {
    const scrollAreaRef = document.getElementById('scrollable_area')
    const itemHeight = scrollAreaRef.children[0].getBoundingClientRect().height;
    scrollAreaRef.scrollTop = (Number(index)*itemHeight) - itemHeight;
  }

  hoverItem(index) {
    this.setState({
      selectedWordIndex: index,
    });
  }

  clickHandler() {
    const { items, selectedWordIndex , label} = this.state;
    const  { getData } = this.props
    const selectedLabel = items[selectedWordIndex][label];
    this.setState({
      selectedVal: selectedLabel,
      word: '',
      selectedWordIndex: -1,
      open: false,
    });
    getData(items[selectedWordIndex]);
  }

  render() {
    const { className, height, arrowColor } = this.props;
    const {
      open, items, selectedWordIndex, selectedVal, label
    } = this.state;
    return (
      <Select className={`dropdown ${className}`}>
        <SelectedVal onClick={this.toggleDropdown}>
          {selectedVal}
          <Icon color={arrowColor} />
        </SelectedVal>
        <DropdownList id="scrollable_area" height={height} className={open && 'open'}>
          {items.map((item, index) => (
            <DropdownItems className={(selectedWordIndex === index) && 'active'}
              index={index} key={item.value} onMouseMove={() => this.hoverItem(index)}
              onClick={() => {this.clickHandler()}}>
                {item[label]}
            </DropdownItems>
          ))}
        </DropdownList>
      </Select>
    );
  }
}

SelectDropdown.propTypes = {
  className: PropTypes.string,
  labelToShow: PropTypes.string,
  getData: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  height: PropTypes.string,
  arrowColor: PropTypes.string,
};

SelectDropdown.defaultProps = {
  className: '',
  labelToShow: 'label',
  height: 'auto',
  arrowColor: '#000',
};

export default SelectDropdown;