import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { getCocktailDetails } from "../../api/cocktaildb";

const useStyles = theme => ({
	image: {
		maxWidth: 250,
		width: '100%'
	}
})

class SearchResults extends React.Component {
	onClick(e) {
		e.preventDefault();
		let targetID = e.target.getAttribute("data-id");
		getCocktailDetails(targetID);
	}

	render() {
		const {classes} = this.props;
		var results = this.props.results.map((drink) => {
			let idLink = `/drink/${drink.idDrink}`;
					return (
            <TableRow id={drink.idDrink}>
              <TableCell>
                <img className={classes.image} src={drink.strDrinkThumb} />
              </TableCell>
              <TableCell>
                <a onClick={this.onClick.bind(this)} data-id={drink.idDrink} href={idLink}>{drink.strDrink}</a>
              </TableCell>
            </TableRow>
          );
				})



		return (
      <div>
        <TableContainer>
          <Table>
            <TableBody>{results.length ? results : <TableRow><TableCell><p>No Results.</p></TableCell></TableRow>}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
	}
}

export default withStyles(useStyles)(SearchResults);