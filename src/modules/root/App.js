import React from 'react';

import './App.css';

import Stafle from 'modules/stafle/Stafle'
import FileManagement from 'modules/fileManagement/fileManagement';
import GCalIntegration from 'modules/gCalendar/gcalIntegration';



class App extends React.Component {
  render() {
    return (
      <div>
        <Stafle />
        <FileManagement />
        <GCalIntegration />
      </div>
    );
  }
}

export default App;
