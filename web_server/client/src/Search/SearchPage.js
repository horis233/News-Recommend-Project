import React, { Component } from 'react';
import './SearchPage.css';
import SearchPanel from './SearchPanel';
import NewsPanel from '../NewsPanel/NewsPanel';


class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          userInput:''
        };
    }

    render() {
        return (
          <div>
            <div className='container'>
                <div className="row in-box">
                <div className="input-field">
                  <input id="searchNews" 
                    type="text" 
                    onChange= {(event)=>{
                      this.state.userInput=event.target.value;
                      console.log(this.state.userInput);
                    }}
                    onKeyPress={(event)=>{
                        if (event.key === 'Enter') {
                          this.setState({userInput:event.target.value});
                        }
                    }}
                  />
                  <label forLabel="searchNews">Search News</label>
                </div>
                

                <div className="waves-effect waves-light btn searchBtn right" 
                  onClick={(event)=>{
                      this.setState({userInput:this.state.userInput});
                  }}
                >
                    <i className="fa fa-search"></i> Search
                </div>

            </div>
                {this.state.userInput !=='' && (<SearchPanel keyword={this.state.userInput} />)}
            </div>
          </div>
        );
	}
}

export default SearchPage;
