import React, { Component } from 'react';
import axios from 'axios';

export default class SearchItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            grocery: [],
            query: '',
            redirect: false
        }
    }

    handleSearch(e){
        const query = e.target.value;
        axios.get('http://localhost:5001/app/item/'+query)
            .then(response => {
                this.setState({ grocery: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    };

    keyPress(e){
        if(e.keyCode !== 13){return;}
        this.props.history.push({
            pathname: '/list/'+e.target.value,
            state: {name: e.target.value}
        });
    }

    render(){
        return (
            <div className='searchbar-container' style={{display:'flex',  justifyContent:'center', alignItems:'center', height: '15vh'}}>
                <form onSubmit={e=>e.preventDefault()}>
                    <input 
                        type='text' size='35' placeholder='Grocery Item'
                        onChange={this.handleSearch.bind(this)}
                        onKeyDown={this.keyPress.bind(this)}
                    ></input>
                </form>
            </div>
        )
    }
}