import React from "react";
import aboutImg from "../../../static/assets/images/about/about-img.png";

export default function () {
	return (
		<div className="content-page-wrapper">
			<div
				className="left-column"
				style={{
					backgroundImage: `url(${aboutImg})`,
				}}
			/>

			<div className="right-column">
				<div className="biography-heading">
					<h3>About Me</h3>
				</div>
				<div className="biography">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis explicabo quod
					neque, totam magni quam commodi laborum assumenda eveniet! Voluptates sed animi
					quaerat molestiae voluptatem. Nesciunt expedita possimus totam quae. Lorem ipsum
					dolor sit amet consectetur adipisicing elit. Officiis, corrupti ad. Consectetur,
					nobis deserunt vel odit adipisci, enim, labore iusto laudantium velit
					perspiciatis facere minus ad quo quasi. Impedit, rerum. Lorem ipsum dolor sit
					amet consectetur, adipisicing elit. Neque beatae itaque laborum minima ex quod
					eum voluptas dolor, modi nemo suscipit adipisci dolores pariatur ab perspiciatis
					omnis aspernatur vitae in! Lorem, ipsum dolor sit amet consectetur adipisicing
					elit.
				</div>
			</div>
		</div>
	);
}
