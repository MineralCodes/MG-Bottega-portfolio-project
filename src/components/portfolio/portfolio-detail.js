import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class PortfolioDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.slug,
			portfolioData: {},
		};
	}

	getPortfolioItem() {
		axios
			.get(`https://mgilbertson.devcamp.space/portfolio/portfolio_items/${this.state.id}`)
			.then((response) => {
				this.setState({
					portfolioData: response.data.portfolio_item,
				});
			})
			.catch((error) => {
				console.log("portfolioDetailError", error);
			});
	}

	componentDidMount() {
		this.getPortfolioItem();
	}

	render() {
		const {
			banner_image_url,
			category,
			description,
			logo_url,
			name,
			thumb_image_url,
			url,
		} = this.state.portfolioData;

		return (
			<div className="content-page-wrapper">
				<div
					className="left-column portfolio-left-column"
					style={{
						backgroundImage: `url(${thumb_image_url})`,
					}}
				>
					<img src={logo_url} />
				</div>
				<div className="right-column portfolio-right-column">
					<p>{description}</p>
					<a href={url} target="_blank">
						Visit {name}
					</a>
				</div>
			</div>
		);
	}
}
