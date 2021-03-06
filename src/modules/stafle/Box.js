import React from 'react';

import * as ColorPickers from 'react-color';

import onClickOutside from "react-onclickoutside";

class CardSMF extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      colorPickerVisible: false,
      isEditing: props.isEditing
    }
  }
  
  handleClickOutside = evt => {
    this.setState({
      colorPickerVisible: false,
      isEditing: false,
    });
  };
  
  render() {
    const {
      item,
      onColorChanged,
      onRemoveBox,
      onLockBox,
      onNameChanged,
      onDoubleClick,
      style
    } = this.props;
    return (
      <div
        {...this.props}
        style={{
          ...style,
          backgroundColor: item.color,
        }}
        onClick={(ev) => {
          ev.stopPropagation();
          //ev.preventDefault();
        }}
        onDoubleClick={(ev) => {
          onDoubleClick(item);
          ev.stopPropagation();
          
        }}
      >
        {this.props.children}
        <div style={{
          padding: 5,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'clip'
        }}>
          {
            !item.static &&
            <div>
              <button
                className="color-picker"
                onClick={() => this.setState({ colorPickerVisible: !this.state.colorPickerVisible })}
              >
                &#127912;
              </button>
              { this.state.colorPickerVisible && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                }}>
                  <ColorPickers.TwitterPicker
                    colors={[
                      '#FF6900',
                      '#FCD900',
                      '#ea2C25',
                      '#50c024',
                      '#8ED1FC',
                      '#2683E3',
                      '#ABB8C3',
                      '#EB144C',
                      '#F78DA7',
                      '#9900EF'
                    ]}
                    onMouseDown={ev => {
                      ev.preventDefault();
                      ev.stopPropagation();
                    }}
                    onMouseClick={ev => {
                      ev.preventDefault();
                      ev.stopPropagation();
                    }}
                    onChangeComplete={ ({hex}) => {
                      this.setState({colorPickerVisible: false});
                      onColorChanged({hex}, item.i)
                    }}
                  />
                </div>
              ) }
            </div>
          }
      
          
          <button
            className="close"
            onClick={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
              onRemoveBox(item)
            }}
          >
            &#128299;
          </button>
          { item.isUnlockable &&
          <button
            className="lock"
            onClick={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
              onLockBox(item)
            }}
          >
            { item.static ? <span>&#128274;</span> : <span>&#128275;</span> }
          </button>
          }
          {this.state.isEditing ?
            <form
              onSubmit={ev => {
                ev.preventDefault();
                onNameChanged(item.i, this.refs.newItem.value)
              }}
            >
              <input
                ref="newItem"
                placeholder="Name..."
                style={{width: "100%"}}
                onClick={(ev) => ev.stopPropagation()}
                autoFocus
              />
              <button type="submit" style={{ display: 'none' }}/>
            </form>
            : item.name }
        </div>
      </div>
    );
  }
}

export default onClickOutside(CardSMF);

