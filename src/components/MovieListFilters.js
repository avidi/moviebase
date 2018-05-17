import React from 'react';
import { connect } from 'react-redux';
import { setSearchQuery, setSearchBy } from '../actions/filters';

class MovieListFilters extends React.Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  render() {
    return (
      <div>
        <input 
          placeholder="Query"
          type="text" 
          value={this.props.filters.query} 
          onChange={(e) => {
            this.props.dispatch(setSearchQuery(e.target.value));
          }} 
        />
        <select
          value={this.props.filters.searchBy}
          onChange={(e) => {
            const searchBy = e.target.value;
            this.props.filters.query = '';
            this.props.dispatch(setSearchBy(searchBy));
          }}>
          <option value="title">Search by Title</option>
          <option value="year">Search by Year</option>
          <option value="genre">Search by Genre</option>
          <option value="rating">Search by Rating</option>
          <option value="actors">Search by Actors</option>
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(MovieListFilters);