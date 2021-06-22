import axios from 'axios';

export async function getCocktailsByIngredient(q, fn) {
	axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${q}`)
				.then((res) => {
					if (res.data) {
						fn(res.data.drinks); 
						return res.data.drinks
					} else {
						alert('no drinks')
						fn([])
					}
					})
				.catch(function(error) { console.log(error)})
}

export async function getCocktailDetails(q) {
	axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${q}`).then((res) => {console.log(res.data.drinks)});
}