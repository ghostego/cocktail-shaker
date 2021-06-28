import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

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
        <div>
          <span>{cocktailObject[currentMeasure]}</span>
          <span>{cocktailObject[currentIng]}</span>
        </div>
      );
    }
    cocktailIngredients.push(<p>{cocktailObject["strInstructions"]}</p>);
	}
		if (cocktailIngredients) {
			return cocktailIngredients;
		}
  }
}

class HoverElement extends React.Component {
	
	render() {
		let hoverDisplay = this.props.visible ? 
      <div id="hoverElement" style={{position: 'fixed', left: this.props.mouseX, top: this.props.mouseY, width: 200, height: 200, backgroundColor: 'red'}}>
        {this.props.ingredients ? this.props.ingredients : "No Ingredients"}
      </div>
     : null;

		 return <div>{hoverDisplay}</div>
		
	}
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ingredients: null, tooltipVisible: false, mouseX: null, mouseY: null };

		this.setCocktailTooltip = this.setCocktailTooltip.bind(this);
		this.cocktailHover = this.cocktailHover.bind(this);
		this.cocktailUnhover = this.cocktailUnhover.bind(this);
  }

	cocktailHover(e) {
		const drinkId = e.target.dataset.id;
		getCocktailDetails(drinkId, this.setCocktailTooltip);
	}

	cocktailUnhover() {
		this.setCocktailTooltip({ingredients: null, tooltipVisible: false})
	}

	setCocktailTooltip(obj) {
		const ingredients = cocktailDetails(obj);
		this.setState({ingredients: ingredients, tooltipVisible: true});
	}

	_onMouseMove(e) {
		this.setState({mouseX: e.screenX, mouseY: e.screenY})
	}

  render() {
    const { classes } = this.props;
    var results = this.props.results.map((drink) => {
      let idLink = `/drink/${drink.idDrink}`;
      return (
        <TableRow id={drink.idDrink}>
          <TableCell>
            <img className={classes.image} alt={drink.strDrink} src={drink.strDrinkThumb} />
          </TableCell>
          <TableCell>
            <Link
              onMouseOver={this.cocktailHover}
              data-id={drink.idDrink}
              to={idLink}
            >
              {drink.strDrink}
            </Link>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <div onMouseMove={this._onMouseMove.bind(this)}>
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
              <HoverElement
                ingredients={this.state.ingredients}
                visible={this.state.tooltipVisible}
								mouseX={this.state.mouseX}
								mouseY={this.state.mouseY}
                dangerouslySetInnerHTML={{ __html: this.state.ingredients }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchResults);