import React, {Component} from 'react';
import axios from 'axios';

export default class EditItem extends Component {
    // to set initial state
    constructor(props){
        super(props);

        this.onChangeUPC12Barcode = this.onChangeUPC12Barcode.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            UPC12Barcode: '',
            ProductName: '',
            Brand: '',
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5001/app/edit/'+this.props.match.params.id)
            .then(response=>{
                this.setState({
                    UPC12Barcode: response.data.UPC12Barcode,
                    ProductName: response.data.ProductName,
                    Brand: response.data.Brand,
                })
            })
            .catch((err)=>{
                console.log(err);
            })
            console.log(this.props)
    }

    onChangeUPC12Barcode(e) {
        this.setState({
            UPC12Barcode: e.target.value
        });
    }

    onChangeProductName(e) {
        this.setState({
            ProductName: e.target.value
        });
    }

    onChangeBrand(e) {
        this.setState({
            Brand: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            UPC12Barcode: this.state.UPC12Barcode,
            ProductName: this.state.ProductName,
            Brand: this.state.Brand,
        };
        console.log(obj);
        axios.post('http://localhost:5001/app/item/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
            this.props.history.push({
                pathname: '/list/'+e.target.value,
                state: {name: e.target.value}
            });
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>UPC 12 Barcode: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.UPC12Barcode}
                                onChange={this.onChangeUPC12Barcode}
                                />
                    </div>
                    <div className="form-group">
                        <label>Product Name: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.ProductName}
                                onChange={this.onChangeProductName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Brand: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.Brand}
                                onChange={this.onChangeBrand}
                                />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Item" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}