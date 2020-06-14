import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogRecord from "../blog/blog-record";
import BlogModal from "../modals/blog-modal";

export default class Blog extends Component {
	constructor() {
		super();

		this.state = {
			blogs: [],
			totalCount: 0,
			currentPage: 0,
			isLoading: true,
			blogModalIsOpen: false,
		};

		this.getBlogItems = this.getBlogItems.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.updateBlogList = this.updateBlogList.bind(this);
		this.handlDeleteClick = this.handlDeleteClick.bind(this);

		window.addEventListener("scroll", this.onScroll, false);
	}

	onScroll() {
		if (this.state.isLoading || this.state.totalCount === this.state.blogs.length) {
			return;
		}

		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			this.getBlogItems();
		}
	}

	handleNewBlogClick() {
		this.setState({
			blogModalIsOpen: true,
		});
	}

	handlDeleteClick(blogToDelete) {
		axios
			.delete(
				`https://mgilbertson.devcamp.space/portfolio/portfolio_blogs/${blogToDelete.id}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.setState({
					blogs: this.state.blogs.filter((blogItem) => {
						return blogItem.id !== blogToDelete.id;
					}),
				});

				return response;
			})
			.catch((error) => {
				console.log("delete blog error", error);
			});
	}

	handleModalClose() {
		this.setState({
			blogModalIsOpen: false,
		});
	}

	getBlogItems() {
		this.setState({
			currentPage: this.state.currentPage + 1,
		});

		axios
			.get(
				`https://mgilbertson.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.setState({
					blogs: this.state.blogs.concat(response.data.portfolio_blogs),
					totalCount: response.data.meta.total_records,
					isLoading: false,
				});
			})
			.catch((error) => {
				console.log("getBlogItems", error);
			});
	}

	updateBlogList(blogData) {
		this.setState({
			blogModalIsOpen: false,
			blogs: [blogData].concat(this.state.blogs),
		});
	}

	componentWillMount() {
		this.getBlogItems();
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll, false);
	}

	render() {
		const blogRecords = this.state.blogs.map((blog) => {
			if (this.props.loggedInStatus === "LOGGED_IN") {
				return (
					<div key={blog.id} className="admin-blog-wrapper">
						<BlogRecord blogItem={blog} />
						<a className="delete" onClick={() => this.handlDeleteClick(blog)}>
							<FontAwesomeIcon icon="trash" />
						</a>
					</div>
				);
			} else {
				return <BlogRecord key={blog.id} blogItem={blog} />;
			}
		});

		return (
			<div>
				<BlogModal
					isOpen={this.state.blogModalIsOpen}
					handleModalClose={this.handleModalClose}
					updateBlogList={this.updateBlogList}
				/>

				<div className="blog-container">
					{this.props.loggedInStatus === "LOGGED_IN" ? (
						<div className="new-blog-link">
							<a onClick={this.handleNewBlogClick}>
								<FontAwesomeIcon icon="plus-square" />
							</a>
						</div>
					) : null}

					<div className="content-container">{blogRecords}</div>

					{this.state.isLoading ? (
						<div className="content-loader">
							<FontAwesomeIcon icon="circle-notch" spin />
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
