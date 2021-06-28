import logo from './logo.svg';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import './App.css';
import Search from './components/search/search';
import Drink from './components/drink/drink';
import SingleDrink from "./components/singleDrink/singleDrink";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/drink/:id">
          <SingleDrink />
        </Route>
        <Route path="/drink">
          <Drink />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <div className="App">
      <h1>Find some cocktails</h1>
      <Search />
    </div>
  )
}


export default App;
