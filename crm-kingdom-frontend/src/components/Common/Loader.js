import React from "react";
import "./loader-style.css";

export function Loader() {
	return (
		<div className="loader-wrapper">
			<div className="loader-inner">
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default Loader;