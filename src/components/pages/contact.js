import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import contactImage from "../../../static/assets/images/contact/contact.png";

export default function () {
	return (
		<div className="content-page-wrapper">
			<div
				className="left-column"
				style={{
					backgroundImage: `url(${contactImage})`,
				}}
			/>
			<div className="right-column">
				<h3>Contact Me</h3>
				<a className="contact-link" href="tel:555-555-5555">
					<div className="contact-item">
						<div className="contact-icon">
							<FontAwesomeIcon icon="phone-alt" />
						</div>
						<div className="contact-info">(555) 555-5555</div>
					</div>
				</a>
				<a className="contact-link" href="mailto:example@example.com">
					<div className="contact-item">
						<div className="contact-icon">
							<FontAwesomeIcon icon="envelope" />
						</div>
						<div className="contact-info">micah@example.com</div>
					</div>
				</a>

				<a
					className="contact-link"
					href="https://goo.gl/maps/RFEPAnT6SGdwxCBi9"
					target="_blank"
				>
					<div className="contact-item">
						<div className="contact-icon">
							<FontAwesomeIcon icon="location-arrow" />
						</div>
						<div className="contact-info">Saint Francis, KS</div>
					</div>
				</a>
			</div>
		</div>
	);
}
