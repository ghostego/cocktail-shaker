import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from "@material-ui/core/Chip";

const useStyles = (theme) => ({
  chipContainer: {
    margin: "10px 0",
    border: "1px solid",
    borderColor: "rgba(0,0,0,0.25)",
    padding: "10px 5px",
    backgroundColor: "white",
  },
  ingredient: {
    height: "25px",
    margin: "0 5px",
    backgroundColor: "#fce",
    transition: "opacity 0.5s ease",
    "& svg": {
      color: "rgba(255,255,255,0.75) !important",
      "&:hover": {
        color: "white !important",
      },
    },
  },
  searchInput: {
    padding: "5px",
    border: "1px solid black",
    marginRight: "-1px",
    width: "100%",
    maxWidth: "400px",
    outline: "none !important",
  },
  submitButton: {
    marginBottom: "10px",
    borderRadius: 0,
    padding: "5px 10px",
    backgroundColor: "black",
    color: "white",
    border: "1px solid black",
    textTransform: "uppercase",
    transition: "background-color .5s ease, border-color .5s ease",
    "&:hover": {
      backgroundColor: "#fce",
      cursor: "pointer",
      borderColor: "#fce",
    },
  },
});

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
    const { classes } = this.props;
		return (
      <div>
        <form onSubmit={this.onAdd}>
          <input
            type="text"
            value={this.props.input} // There has got to be a better way to pass down props
            onChange={this.onChange}
            className={classes.searchInput}
            placeholder={"Search by ingredients"}
          />
          <input className={classes.submitButton} type="submit" value="Add" />
        </form>
        <div className={classes.chipContainer}>
          {this.props.query.map((v) => (
            <Chip className={classes.ingredient} onDelete={this.handleDelete} key={v} label={v}></Chip>
          ))}
        </div>
      </div>
    );
	}
}

export default withStyles(useStyles)(SearchBar);