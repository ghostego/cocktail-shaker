import React from 'react';

class SearchBar extends React.Component {

  onAdd = (e) => {
    this.props.onAdd(e)
  }

	onChange = (e) => {
		this.props.onChange(e);
	}

	onSubmit = (e) => {
		this.props.onSubmit(e);
	}

	render() {
		return (
      <div>
        <form onSubmit={this.onAdd}>
          <input
            type="text"
            value={this.props.input} // There has got to be a better way to pass down props
            onChange={this.onChange}
          />
          <input type="submit" value="Add" />
        </form>
        <form onSubmit={this.onSubmit}>
          <input type="submit" value="Search" />
        </form>
        {this.props.query.map(v => <div>{v}</div>)}
      </div>
    );
	}
}

export default SearchBar;