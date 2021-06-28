import React from 'react';
import {
  useParams
} from "react-router-dom";
import { getCocktailDetails } from "../../api/cocktaildb";

function SingleDrink() {
	let { id } = useParams();

	return  <SingleDrinkContainer id={id} />;
}

class SingleDrinkContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { id: this.props.id, cocktail: null }

		this.setCocktail = this.setCocktail.bind(this);
		this.buildDrink = this.buildDrink.bind(this);
	}

	setCocktail(cocktailObj) {
		this.setState({cocktail: cocktailObj})
	}

	componentDidMount() {
		getCocktailDetails(this.props.id, this.setCocktail);
	}

	buildDrink() {
		if (this.state.cocktail) {
			let obj = this.state.cocktail;
			let cocktailIngredients = [];
			let cocktailObject = obj[0];
			cocktailIngredients.push(<h1>{cocktailObject['strDrink']}	</h1>)
			cocktailIngredients.push(<h3>{cocktailObject['strGlass']}</h3>)
			cocktailIngredients.push(
        <img
					style={{'maxWidth': 400}}
          src={cocktailObject["strDrinkThumb"]}
          alt={cocktailObject["strDrink"]}
        />
      );
			for (let i = 1; i < 15; i++) {
				const currentIng = `strIngredient${i}`;
				const currentMeasure = `strMeasure${i}`;
				cocktailIngredients.push(<div><span>{cocktailObject[currentMeasure]}</span><span>{cocktailObject[currentIng]}</span></div>);
			}
			cocktailIngredients.push(<p>{cocktailObject['strInstructions']}</p>)
			
			return cocktailIngredients;
		}
	}

	render() {
		const drinkContent = this.buildDrink()
		return (
			<div>
				{this.state.cocktail ? this.buildDrink() : null}
			</div>
		)
	}
}

export default SingleDrink;