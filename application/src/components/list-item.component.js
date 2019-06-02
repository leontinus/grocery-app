import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Grocery = props => (
    <tr>
        <td style={{textAlign: 'left'}}>{props.grocery.ProductName}</td>
        <td style={{textAlign: 'left'}}>{props.grocery.Brand}</td>
        <td style={{textAlign: 'left'}}>{props.grocery.UPC12Barcode}</td>
        <td>
            <Link to={{
                pathname: "/edit/"+props.grocery._id
            }}>Edit</Link>
        </td>
    </tr>
)

export default class GroceryList extends Component {

    constructor(props) {
        super(props);
        this.state = {grocery: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5001/app/item/'+this.props.location.state.name)
            .then(response => {
                this.setState({ grocery: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    groceryList() {
        return this.state.grocery.map((currentGrocery, i)=>{
            return <Grocery grocery={currentGrocery} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Grocery List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} variant="dark">
                    <thead>
                        <tr>
                            <th style={{textAlign: 'left'}}>Product Name</th>
                            <th style={{textAlign: 'left'}}>Brand</th>
                            <th style={{textAlign: 'left'}}>UPC12 Barcode</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.groceryList() }
                    </tbody>
                </table>
            </div>
        )
    }
}