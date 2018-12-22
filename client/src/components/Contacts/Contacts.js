import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as data from './data';

import './Contacts.css';

class Contacts extends Component {
  render() {
    return (
      <Card id="Contacts">
        <PerfectScrollbar>
          <CardBody style={{ background: '#202225' }}>
            <CardTitle className="text-white">
              Friends{' '}
              <span className="text-muted">{`(${data.messages.length})`}</span>
            </CardTitle>
            <div className="mailbox position-relative">
              <div className="message-center message-body">
                {/*<!-- Message -->*/}
                {data.messages.map((message, index) => {
                  return (
                    <Link to="/" className="message-item" key={index}>
                      <span className="user-img">
                        <img
                          src={message.image}
                          alt="user"
                          className="rounded-circle"
                          width=""
                        />
                        <span
                          className={
                            'profile-status pull-right ' + message.status
                          }
                        />
                      </span>
                      <div className="mail-contnet">
                        <h5 className="message-title">{message.title}</h5>
                        <span className="mail-desc">{message.desc}</span>
                        <span className="time">{message.time}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </CardBody>
        </PerfectScrollbar>
        <Button color="info" className="btn mt-3" size="lg">
          <i className="fas fa-user-plus" /> Add A Friend
        </Button>
      </Card>
    );
  }
}

export default Contacts;
