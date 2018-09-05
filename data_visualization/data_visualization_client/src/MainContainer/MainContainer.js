import React, { Component } from 'react';
import PanelHeader from '../PanelHeader/PanelHeader.js';
import Panel from '../Panel/Panel.js';
import Range from '../Range/Range.js';

import UserTrend from '../UserTrend/UserTrend.js';
import ActiveUserChart from '../ActiveUserChart/ActiveUserChart.js';
import DevicePieChart from '../DevicePieChart/DevicePieChart.js';
import NewsCategory from '../NewsCategory/NewsCategory.js';

const category = ['technology', 'music', 'education','sports','politics', 'weather','others'];

class MainContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            user_trend: null,
            user_device: null,
            user_news_category: null,
            user_active_time: null
        };
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-5 custom_padding" >
                        <Panel>
                            <PanelHeader title="User Device">
                            </PanelHeader>
                            <DevicePieChart data={this.state.user_device}/>
                        </Panel>
                    </div>
                    <div className="col-md-7 custom_padding" >
                        <Panel>
                            <PanelHeader title="User Trend (Daily Active/Daily New)">
                            </PanelHeader>
                            <div>
                            <ActiveUserChart data={this.state.user_trend} />
                            </div>
                        </Panel>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div className = "row">
                    <div className="col-md-7 custom_padding" >
                            <Panel>
                                <PanelHeader title="Daily Active Time">
                                </PanelHeader>
                                <UserTrend data={this.state.user_active_time} />
                            </Panel>
                    </div>
                    <div className="row">
                        <div className="col-md-5 custom_padding" >
                            <Panel>
                                <PanelHeader title="News Category">
                                </PanelHeader>
                            <NewsCategory data = {this.state.user_news_category}/>

                            </Panel>
                        </div>

                    </div>
                </div>
            </div>
        );
    };

};

export default MainContainer;
