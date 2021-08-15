import React from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from "react-router";
import { getCocktailDetails } from "../../api/cocktaildb";
import { BackButton } from '../backButton/backButton';


const useStyles = (theme) => ({
  recipeContainer: {
    display: "flex",
    flexDirection: "row",
  },
  recipeImage: {
    maxWidth: "35%",
    height: "35%",
    objectFit: "contain",
  },
  recipeContent: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "65%",
    padding: "0 15px 10px",
		"& h1": {
			marginTop: 0
		},
		"& h3": {
			marginTop: 0
		}
  },
  recipeIngredients: {
		"& span:first-child": {
			marginRight: "10px"
		}
	}
});

class SingleDrinkContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { id: null, cocktail: null }

		this.setCocktail = this.setCocktail.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.setState({id: id}, function(){getCocktailDetails(this.state.id, this.setCocktail)})
	}

	setCocktail(cocktailObj) {
		this.setState({cocktail: cocktailObj[0]})
	}

	render() {
		const { classes } = this.props;
		let recipe;
		const recipeIngredients = [];
		let cocktail = this.state.cocktail;
		
		if (cocktail) {
			for (let i = 1; i < 15; i++) {
				const currentIng = `strIngredient${i}`;
				const currentMeasure = `strMeasure${i}`;
				if (cocktail[currentMeasure] && cocktail[currentIng]) {
					recipeIngredients.push(<div key={i}><span>{cocktail[currentMeasure]}</span><span>{cocktail[currentIng]}</span></div>);
				}
			}
      recipe = (
        <div className={classes.recipeContainer}>
          <img
            className={classes.recipeImage}
            src={cocktail["strDrinkThumb"]}
            alt={cocktail["strDrink"]}
            key="image"
          />
          <div className={classes.recipeContent}>
            <h1 key="title">{cocktail["strDrink"]} </h1>
            <h3 key="glass">Glass Type: {cocktail["strGlass"]}</h3>
            <div className={classes.recipeIngredients}><strong>Ingredients</strong>{recipeIngredients}</div>
            <div className={classes.recipeInstructions}>
              <p key="instructions">{cocktail["strInstructions"]}</p>
            </div>
          </div>
        </div>
      );
    }
		return (
      <div>
        <BackButton class={"recipe"} />
        {recipe}
      </div>
    );
	}
}

export default withRouter(withStyles(useStyles)(SingleDrinkContainer));