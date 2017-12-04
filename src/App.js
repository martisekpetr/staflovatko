import React from 'react';
import fileDownload from 'js-file-download';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardText} from 'material-ui/Card';

import * as utils from './utils';
import { CONFIG } from './config'

import './App.css';
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";

import CardSMF from './CardSMF';

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      layout: [
        ...utils.generateTimeLabels(),
        ...utils.generateDayLabels(),
        ...utils.generateReccurringEvent('R.', 7, 0.5, CONFIG.COLORS.WORKOUT),
        ...utils.generateReccurringEvent('Sň', 7.5, 0.5, CONFIG.COLORS.FOOD),
        ...utils.generateReccurringEvent('Oběd', 12, 1.75, CONFIG.COLORS.FOOD),
        ...utils.generateReccurringEvent('Večeře', 18, 1, CONFIG.COLORS.FOOD),
      ],
      width: undefined,
      isDragging: false,
    };
  }
  
  handlePropertyChange = (i, props) => {
    const index = this.state.layout.findIndex(obj => obj.i === i);
    console.log(i, props, index);
    this.setState({
      layout: [
        ...this.state.layout.slice(0, index),
        {
          ...this.state.layout[index],
          ...props,
        },
        ...this.state.layout.slice(index + 1)
      ]});
  };
  
  handleColorChange = ({ hex }, i) => {
    this.handlePropertyChange(i, { color: hex });
  };
  
  handleNameChange = (i, value) => {
    this.handlePropertyChange(i, {
      i: `${value}_${Math.floor(Math.random() * (1000000))}`,
      name: value,
      isEditing: false,
    });
  };
  
  handleLayoutChange = (layout) => {
    this.setState({
      layout: this.state.layout.map(
        item => ({
          ...item,
          ...(layout.find(it => it.i === item.i))
        })
      )});
  };
  
  removeCard = (ev, key) => {
    const index = this.state.layout.findIndex(obj => obj.i === key);
    this.setState({layout: [
      ...this.state.layout.slice(0, index),
      ...this.state.layout.slice(index + 1)
    ]});
    ev.stopPropagation();
  };
  
  lockCard = (ev, key) => {
    ev.stopPropagation();
    ev.preventDefault();
    
    const index = this.state.layout.findIndex(obj => obj.i === key);
    this.setState({layout: [
      ...this.state.layout.slice(0, index),
      {
        ...this.state.layout[index],
        static: !this.state.layout[index].static
      },
      ...this.state.layout.slice(index + 1)
    ]});
    
  };
  
  addCard = (ev, width) => {
    if(this.state.isDragging) {
      return;
    }
    const newCard = {
      i: `Card${Math.floor(Math.random() * (1000000))}`,
      x: Math.floor(ev.clientX / (1200 / CONFIG.COLS)), //TODO
      y: Math.floor(ev.clientY / (CONFIG.ROW_HEIGHT + CONFIG.MARGIN[0])),
      h: CONFIG.ROWS_PER_DAY,
      w: 2 * CONFIG.HOUR_WIDTH,
      name: "new Card",
      isEditing: true,
      isUnlockable: true,
    };
    this.setState({
      layout: [
        ...this.state.layout,
        newCard
      ]
    });
    console.log(newCard);
  };
  
  duplicateCard = (key) => {
    const index = this.state.layout.findIndex(obj => obj.i === key);
    this.setState({layout: [
      ...this.state.layout,
      {
        ...this.state.layout[index],
        i: `Card${Math.floor(Math.random() * (1000000))}`
      }
    ]});
  };
  
  handleFileUpload = (evt) => {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
    const fr = new FileReader();
    fr.onload = () => {
      this.setState({layout: JSON.parse(fr.result.toString())});
    };
    fr.readAsText(evt.target.files[0]);
  };
  
  handleFileDownload = () => {
    fileDownload(JSON.stringify(this.state.layout), 'layout.json');
  };
  
  render() {
    return (
      <MuiThemeProvider>
        <div>
        <div
          className="App"
          onDoubleClick={(ev) => this.addCard(ev, this.props)}
        >
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{lg: 0}}
            layouts={{lg: this.state.layout}}
            cols={{lg: CONFIG.COLS}}
            margin={CONFIG.MARGIN}
            containerPadding={CONFIG.CONTAINER_PADDING}
            rowHeight={CONFIG.ROW_HEIGHT}
            compactType='horizontal'
            verticalCompact={false}
            onDragStart={() => this.setState({ isDragging: true})}
            onDragStop={() => this.setState({ isDragging: false})}
            onLayoutChange={this.handleLayoutChange}
          >
            {
              this.state.layout.map(item => (
                <CardSMF
                  key={item.i}
                  item={item}
                  onRemoveCard={this.removeCard}
                  onLockCard={this.lockCard}
                  onColorChanged={this.handleColorChange}
                  onNameChanged={this.handleNameChange}
                  isEditing={item.isEditing}
                  onDoubleClick={this.duplicateCard}
                />
              )
            )}
          </ResponsiveReactGridLayout>
        </div>
        <input type="file" accept=".json" onChange={this.handleFileUpload}/>
        <button onClick={this.handleFileDownload}>Download layout</button>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
