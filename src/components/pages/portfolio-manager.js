import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";
 
export default class PortfolioManager extends Component {
    constructor(){
        super();

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }

        this.handleNewFormSubmit = this.handleNewFormSubmit.bind(this);
        this.handleFormSubmitError = this.handleFormSubmitError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    getPortfolioItems() {
        axios.get('https://mgilbertson.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc', { withCredentials: true })
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
        })
        .catch(err => {
            console.log('error', err);
        })
    }

    componentDidMount(){
        this.getPortfolioItems();
    }

    handleNewFormSubmit(portfolioItem, mode) {
            if(mode) {
                this.setState({
                    portfolioItems: this.state.portfolioItems.filter(item => {
                        return item.id !== portfolioItem.id;
                    })
                })
            };

            this.setState({
                portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
            });
    }

    handleFormSubmitError(error){
        console.log('Form Submit error', error);
    }

    handleDeleteClick(portfolioItem) {
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true })
        .then(response => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            })

            return response.data;
        })
        .catch(error => {
            console.log('error from delete', error);
        })
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem,
        })
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        })
    }
    
    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm 
                        handleNewFormSubmit={this.handleNewFormSubmit}
                        handleFormSubmitError={this.handleFormSubmitError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                
                <div className="right-column">
                    <PortfolioSidebarList 
                        handleDeleteClick={this.handleDeleteClick}
                        handleEditClick={this.handleEditClick}
                        data={this.state.portfolioItems}
                    />
                </div>
            </div>
        );
    }
}