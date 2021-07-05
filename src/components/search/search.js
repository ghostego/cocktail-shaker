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
    this.getCocktails = this.getCocktails.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("queries")) {
      const queries = sessionStorage.getItem("queries").split(',');
      this.setState({q: queries})
      this.setState(
        () => ({
          q: queries,
          currentInput: "",
        }),
        function () {
          this.getCocktails();
        }
      );
    }
  }

  handleAdd(event) {
    event.preventDefault();
    let localQueries = [];
    let storage = [];
    const currentInput = this.state.currentInput;
    if (sessionStorage.queries) {
      storage = sessionStorage.queries.split(',');
    }
    localQueries = storage;
    if (currentInput === "") {
      return;
    }
    if (storage.indexOf(currentInput) !== -1) {
      this.setState({currentInput: ''});
      return
    }
    localQueries.push(currentInput);
    sessionStorage.setItem("queries", localQueries.join());
    this.setState(
      (prevState) => ({
        q: [...prevState.q, currentInput],
        currentInput: "",
      }),
      function () {
        this.getCocktails();
      }
    );
    
  }

  handleChange(event) {
    this.setState({ currentInput: event.target.value });
  }

	setCocktails(cocktails) {
		this.setState({results: cocktails})
	}

  getCocktails() {
    getCocktailsByIngredient(this.state.q, this.setCocktails);
  }

  handleSubmit(event) {
    this.getCocktails();
    event.preventDefault();
  }

  handleDelete(event) {
    let array = this.state.q;
    let localQueries = sessionStorage.queries.split(',');
    let queriesIndex = array.indexOf(event.textContent);
    let index = array.indexOf(event.textContent);
    if (index !== -1) {
      array.splice(index, 1);
      localQueries.splice(queriesIndex, 1);
      sessionStorage.setItem("queries", localQueries.join());
      this.setState({q: array}, function() {
        if (array.length === 0) {
          this.setState({results: []});
        } else {
          this.getCocktails();
        }
      })
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