import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GroceryList from "./components/list-item.component";
import SearchItem from "./components/search-item.component";
import EditItem from "./components/edit-item.component";

class App extends Component {
  render(){
    return (
      <Router>
        <div className="container" style={{textAlign:'center',  justifyContent:'center', alignItems:'center'}}>
          <Link to="/" className="navbar-brand" style={{color:'#5C5C5C'}}>Grocery App</Link>
          <hr />
          <Route path="/list"  component={GroceryList} />
          <Route path="/" exact component={SearchItem} />
          <Route path="/edit/:id" component={EditItem} />
        </div>
      </Router>
    );
  }
}

export default App;