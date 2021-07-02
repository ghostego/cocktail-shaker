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
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    if (this.state.currentInput === '') {
      return;
    }
    this.setState((prevState) => ({
      q: [...prevState.q, this.state.currentInput],
      currentInput: ''
    }));
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

  handleDelete(event) {
    let array = this.state.q;
    let index = array.indexOf(event.textContent);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({q: array})
    }
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
          onDelete={this.handleDelete}
        />
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

export default Search;