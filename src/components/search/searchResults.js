import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";

import { getCocktailDetails } from "../../api/cocktaildb";

import {
  Link,
} from "react-router-dom";

const useStyles = (theme) => ({
  image: {
    height: 0,
    paddingTop: "56.25%",
  },
  toolTip: {
    position: "absolute",
    left: "50%",
    right: "50%",
    backgroundColor: "red",
    width: 400,
    height: 200,
  },
  card: {
    width: "23%",
    margin: "0 5px 10px",
    [theme.breakpoints.down('sm')]: {
      width: "31%"
    },
    [theme.breakpoints.down('xs')]: {
      width: "48%"
    }
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  cardLink: {
    textDecoration: "none"
  }
});

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
        <Card id={drink.idDrink} className={classes.card} key={drink.idDrink} square={true}>
          <CardMedia
            className={classes.image}
            alt={drink.strDrink}
            image={drink.strDrinkThumb}
          />

          <CardContent>
            <Tooltip
              title={this.state.ingredients ? this.state.ingredients : ""}
              enterDelay={300}
              leaveDelay={0}
            >
              <Link
                onMouseOver={this.cocktailHover}
                onMouseOut={this.cocktailUnhover}
                data-id={drink.idDrink}
                to={idLink}
                className={classes.cardLink}
              >
                {drink.strDrink}
              </Link>
            </Tooltip>
          </CardContent>
        </Card>
      );
    });

    return (
      <div className={classes.cardContainer}>
        {results.length ? (
          results
        ) : (
          <div>No Results</div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchResults);