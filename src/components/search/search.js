import React from 'react';
import SearchBar from './searchBar';
import SearchResults from './searchResults'
import { getCocktailsByIngredient } from "../../api/cocktaildb";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentInput: '', q: [], results: [] };

		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.setCocktails = this.setCocktails.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(event) {
    this.setState((prevState) => ({
      q: [...prevState.q, this.state.currentInput],
      currentInput: ''
    }));
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ currentInput: event.target.value });
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
        <SearchBar
          onChange={this.handleChange}
          onAdd={this.handleAdd}
          onSubmit={this.handleSubmit}
          input={this.state.currentInput}
          query={this.state.q}
        />
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

export default Search;