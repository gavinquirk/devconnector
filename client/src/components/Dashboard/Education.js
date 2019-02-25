import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };

  render() {
    const education = this.props.education.map(education => (
      <tr key={education._id}>
        <td>{education.school}</td>
        <td>{education.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{education.from}</Moment> -{' '}
          {education.to === null ? (
            'Now'
          ) : (
            <Moment format="YYYY/MM/DD">{education.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.onDeleteClick(education.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
