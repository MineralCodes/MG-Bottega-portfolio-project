import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationContainer = (props) => {
	const dynamicLink = (route, linkText) => {
		return (
			<div className="nav-link-wrapper">
				<NavLink to={route}>{linkText}</NavLink>
			</div>
		);
	};

	const handleSignout = () => {
		axios
			.delete("https://api.devcamp.space/logout", { withCredentials: true })
			.then((response) => {
				if (response.status === 200) {
					props.history.push("/");
					props.handleSuccessfulLogout();
				}
				return response.data;
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	return (
		<div className="nav-wrapper">
			<div className="left-side">
				<div className="nav-link-wrapper">
					<NavLink exact to="/">
						Home
					</NavLink>
				</div>
				<div className="nav-link-wrapper">
					<NavLink exact to="/about-me">
						About
					</NavLink>
				</div>
				<div className="nav-link-wrapper">
					<NavLink to="/contact">Contact</NavLink>
				</div>
				<div className="nav-link-wrapper">
					<NavLink to="/blog">Blog</NavLink>
				</div>
				{props.loggedInStatus === "LOGGED_IN"
					? dynamicLink("/portfolio-manager", "Portfolio Manager")
					: null}
			</div>
			<div className="right-side">
				MICAH GILBERTSON
				{props.loggedInStatus === "LOGGED_IN" ? (
					<a onClick={handleSignout}>
						<FontAwesomeIcon icon="sign-out-alt" />
					</a>
				) : null}
			</div>
		</div>
	);
};

export default withRouter(NavigationContainer);
