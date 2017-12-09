import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as ActionTypes from 'constants/actionTypes';

import { keyByI } from 'helpers/utils';
import { CONFIG } from 'config'
import * as stafleSelectors from 'modules/stafle/stafleSelectors';

import Box from './Box';
import buildActionCreators from 'helpers/buildActionCreators';

import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';


import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class Stafle extends React.Component {
  handleColorChange = ({ hex }, i) => {
    this.props.setBoxProperties({i, props: { color: hex }});
    this.props.updateEvent(i);
  };

  handleNameChange = (i, value) => {
    this.props.setBoxProperties({
      i,
      props: {
        i: `${value}_${Math.floor(Math.random() * (1000000))}`,
        name: value,
        isEditing: false,
      }
    });
  };

  handleLayoutChange = (layout) => {
    this.props.updateLayout(keyByI(layout));
  };

  removeBox = (box) => {
    this.props.removeBox(box.i);
  };

  lockBox = (box) => {
    this.props.setBoxProperties({
      i: box.i,
      props: {
        static: !box.static
      }
    });
  };

  addBox = (ev, width) => {
    if(this.props.isDragging) {
      return;
    }

    const newBox = {
      i: `Box${Math.floor(Math.random() * (1000000))}`,
      x: Math.floor(ev.clientX / (1200 / CONFIG.COLS)), //TODO
      y: Math.floor(ev.clientY / (CONFIG.ROW_HEIGHT + CONFIG.MARGIN[0])),
      h: CONFIG.ROWS_PER_DAY,
      w: 2 * CONFIG.HOUR_WIDTH,
      name: "new box",
      isEditing: true,
      isUnlockable: true,
    };

    this.props.addBox(newBox);
  };

  duplicateBox = (box) => {
    this.props.addBox({
      ...box,
      i: `${box.i}_${Math.floor(Math.random() * (1000000))}`,
      x: box.x + box.w,
    });
  };

  render() {
    const { setDraggingState, layout } = this.props;

    return (
        <div
          className="App"
          onDoubleClick={(ev) => this.addBox(ev, this.props)}
        >
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{lg: 0}}
            layouts={{lg: Object.values(layout)}}
            cols={{lg: CONFIG.COLS}}
            margin={CONFIG.MARGIN}
            containerPadding={CONFIG.CONTAINER_PADDING}
            rowHeight={CONFIG.ROW_HEIGHT}
            compactType='horizontal'
            verticalCompact={false}
            onDragStart={setDraggingState.bind(this, true)}
            onDragStop={setDraggingState.bind(this, false)}
            onLayoutChange={this.handleLayoutChange}
          >
            {
              _.map(layout, item => (
                  <Box
                    key={item.i}
                    item={item}
                    onRemoveBox={this.removeBox}
                    onLockBox={this.lockBox}
                    onColorChanged={this.handleColorChange}
                    onNameChanged={this.handleNameChange}
                    isEditing={item.isEditing}
                    onDoubleClick={this.duplicateBox}
                  />
                )
              )}
          </ResponsiveReactGridLayout>
        </div>
    );
  }
}

Stafle.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  setDraggingState: PropTypes.func.isRequired,
  setBoxProperties: PropTypes.func.isRequired,
  removeBox: PropTypes.func.isRequired,
  updateLayout: PropTypes.func.isRequired,
  addBox: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isDragging: stafleSelectors.getIsDragging(state),
  layout: stafleSelectors.getLayout(state),
});


export default connect(
  mapStateToProps,
  buildActionCreators({
    setDraggingState: ActionTypes.SET_DRAGGING_STATE,
    setBoxProperties: ActionTypes.SET_BOX_PROPERTIES,
    removeBox: ActionTypes.REMOVE_BOX,
    updateLayout: ActionTypes.UPDATE_LAYOUT,
    addBox: ActionTypes.ADD_BOX,
    updateEvent: ActionTypes.UPDATE_EVENT,
  })
)(Stafle);
