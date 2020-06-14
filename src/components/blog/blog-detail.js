import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogFeaturedImage from "./blog-featured-image";
import BlogForm from "./blog-form";

export default class BlogDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentId: this.props.match.params.slug,
			blogData: {},
			editMode: false,
		};

		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
		this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
	}

	handleEditClick() {
		if (this.props.loggedInStatus === "LOGGED_IN") {
			this.setState({ editMode: true });
		}
	}

	handleFeaturedImageDelete() {
		this.setState({
			blogData: {
				featured_image_url: "",
			},
		});
	}

	handleUpdateFormSubmission(blogData) {
		this.setState({
			blogData,
			editMode: false,
		});
	}

	getBlogItem() {
		axios
			.get(
				`https://mgilbertson.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
			)
			.then((response) => {
				this.setState({
					blogData: response.data.portfolio_blog,
				});
			})
			.catch((error) => {
				console.log("getBlogItem error", error);
			});
	}

	componentDidMount() {
		this.getBlogItem();
	}

	render() {
		const { title, content, featured_image_url, blog_status } = this.state.blogData;

		const contentManager = () => {
			if (this.state.editMode) {
				return (
					<BlogForm
						editMode={this.state.editMode}
						blogData={this.state.blogData}
						handleFeaturedImageDelete={this.handleFeaturedImageDelete}
						handleUpdateFormSubmission={this.handleUpdateFormSubmission}
					/>
				);
			} else {
				return (
					<div className="content-container">
						<div className="blog-header">
							<h1>{title}</h1>
							{this.props.loggedInStatus ? (
								<div className="actions">
									<a className="edit" onClick={this.handleEditClick}>
										<FontAwesomeIcon icon="edit" />
									</a>
								</div>
							) : null}
						</div>

						<BlogFeaturedImage img={featured_image_url} />

						<div className="blog-text">{ReactHtmlParser(content)}</div>
					</div>
				);
			}
		};

		return <div className="blog-container">{contentManager()}</div>;
	}
}
