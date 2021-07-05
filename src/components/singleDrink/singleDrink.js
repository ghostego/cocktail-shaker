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
			cocktailIngredients.push(<h1 key="title">{cocktailObject['strDrink']}	</h1>)
			cocktailIngredients.push(<h3 key="glass">{cocktailObject['strGlass']}</h3>)
			cocktailIngredients.push(
        <img
					style={{'maxWidth': 400}}
          src={cocktailObject["strDrinkThumb"]}
          alt={cocktailObject["strDrink"]}
					key="image"
        />
      );
			for (let i = 1; i < 15; i++) {
				const currentIng = `strIngredient${i}`;
				const currentMeasure = `strMeasure${i}`;
				cocktailIngredients.push(<div key={i}><span>{cocktailObject[currentMeasure]}</span><span>{cocktailObject[currentIng]}</span></div>);
			}
			cocktailIngredients.push(<p key="instructions">{cocktailObject['strInstructions']}</p>)
			
			return cocktailIngredients;
		}
	}

	render() {
		return (
			<div>
				{this.state.cocktail ? this.buildDrink() : null}
			</div>
		)
	}
}

export default SingleDrink;