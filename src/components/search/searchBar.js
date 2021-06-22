import React from 'react';

class SearchBar extends React.Component {

	onChange = (e) => {
		this.props.onChange(e);
	}

	onSubmit = (e) => {
		this.props.onSubmit(e);
	}

	render() {
		return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.props.query} // There has got to be a better way to pass down props
            onChange={this.onChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
	}
}

export default SearchBar;