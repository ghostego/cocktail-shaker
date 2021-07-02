import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

import { getCocktailDetails } from "../../api/cocktaildb";

import {
  Link,
} from "react-router-dom";

const useStyles = theme => ({
	image: {
		maxWidth: 250,
		width: '100%'
	},
	toolTip: {
		position: 'absolute',
		left: '50%',
		right: '50%',
		backgroundColor: 'red',
		width: 400,
		height: 200
	}
})

function cocktailDetails(obj) {
  if (obj) {
    let cocktailIngredients = [];
    let cocktailObject = obj[0];
		if (cocktailObject) {
    for (let i = 1; i < 15; i++) {
      const currentIng = `strIngredient${i}`;
      const currentMeasure = `strMeasure${i}`;
      cocktailIngredients.push(
        <div key={i}>
          <span>{cocktailObject[currentMeasure]} </span>
          <span>{cocktailObject[currentIng]}</span>
        </div>
      );
    }
	}
		if (cocktailIngredients) {
			return cocktailIngredients;
		}
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ingredients: '' };

		this.setCocktailTooltip = this.setCocktailTooltip.bind(this);
		this.cocktailHover = this.cocktailHover.bind(this);
		this.cocktailUnhover = this.cocktailUnhover.bind(this);
  }

	cocktailHover(e) {
		const drinkId = e.target.dataset.id;
		getCocktailDetails(drinkId, this.setCocktailTooltip);
	}

	cocktailUnhover() {
		this.setCocktailTooltip({ingredients: ''})
	}

	setCocktailTooltip(obj) {
		const ingredients = cocktailDetails(obj);
		this.setState({ingredients: ingredients});
	}

  render() {
    const { classes } = this.props;
    var results = Array.isArray(this.props.results) && this.props.results.map((drink) => {
      let idLink = `/drink/${drink.idDrink}`;
      return (
        <TableRow id={drink.idDrink} key={drink.idDrink}>
          <TableCell>
            <img
              className={classes.image}
              alt={drink.strDrink}
              src={drink.strDrinkThumb}
            />
          </TableCell>
          <TableCell>
            <Tooltip
              title={this.state.ingredients ? this.state.ingredients : ''}
              enterDelay={300}
            >
              <Link
                onMouseOver={this.cocktailHover}
                onMouseOut={this.cocktailUnhover}
                data-id={drink.idDrink}
                to={idLink}
              >
                {drink.strDrink}
              </Link>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <div>
        <TableContainer>
          <Table>
            <TableBody>
              {results.length ? (
                results
              ) : (
                <TableRow>
                  <TableCell>
                    <p>No Results.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchResults);