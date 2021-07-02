import React from 'react';
import Chip from "@material-ui/core/Chip";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }

  onAdd = (e) => {
    this.props.onAdd(e)
  }

	onChange = (e) => {
		this.props.onChange(e);
	}

	onSubmit = (e) => {
		this.props.onSubmit(e);
	}

  handleDelete = (e) => {
    this.props.onDelete(e.currentTarget.previousElementSibling);
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
        {this.props.query.map(v => <Chip onDelete={this.handleDelete} label={v}></Chip>)}
      </div>
    );
	}
}

export default SearchBar;