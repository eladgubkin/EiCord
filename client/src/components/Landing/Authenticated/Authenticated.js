import React, { Component } from 'react';
import LeftPanel from '../../LeftPanel/LeftPanel';
import RightPanel from '../../RightPanel/RightPanel';
import MainArea from '../../MainArea/MainArea';
import '../Landing.css';

class Authenticated extends Component {
  render() {
    return (
      // <div>
      //   <div id="Landing">
      //     <div id="isAuth">
      //       <div className="main-area">
      //         <Row style={{ background: '#263238' }}>
      //           <Col md="3" style={{ paddingRight: '0' }}>
      //             <LeftPanel />
      //           </Col>
      //           <Col md="6" className="nopadding">
      //             <Chat />
      //           </Col>
      //           <Col md="3" className="nopadding">
      //             <RightPanel />
      //           </Col>
      //         </Row>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div id="Landing">
        <div id="isAuthenticated">
          <div className="LeftPanel">
            <LeftPanel />
          </div>
          <div className="MainArea">
            <MainArea />
          </div>
          <div className="RightPanel">
            <RightPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default Authenticated;
