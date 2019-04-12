import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  onShowClick = e =>{
    this.setState({showContactInfo: !this.state.showContactInfo});
  };

  onDeleteClick = async (id, dispatch)=>{
    
    try
    {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );  
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } 
    catch(e) 
    {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
    
    
  };

  render() {
    const { id, name,email,phone } = this.props.contact;
    const { showContactInfo }  = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <FontAwesomeIcon
                  onClick={this.onShowClick}
                  icon={faSortDown}
                  style={{ cursor: "pointer" }}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    cursor: "pointer",
                    float: "right",
                    color: "red"
                  }}
                  onClick={this.onDeleteClick.bind(
                    this,
                    id,
                    dispatch
                  )}
                />
                <Link to={`contact/edit/${id}`}>
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>

    )
  }
}

Contact.propTypes = {
  contact:            PropTypes.object.isRequired
};

export default Contact;