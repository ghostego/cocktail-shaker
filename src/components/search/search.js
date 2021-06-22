import React from 'react';
import SearchBar from './searchBar';
import SearchResults from './searchResults'
import { getCocktailsByIngredient } from "../../api/cocktaildb";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { q: "", results: [] };

		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.setCocktails = this.setCocktails.bind(this);
  }

  handleChange(event) {
    this.setState({ q: event.target.value });
  }

	setCocktails(cocktails) {
		this.setState({results: cocktails})
	}

  handleSubmit(event) {
    getCocktailsByIngredient(this.state.q, this.setCocktails);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <SearchBar onChange={this.handleChange} onSubmit={this.handleSubmit} query={this.state.q} />
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

export default Search;