import {
	faTrash,
	faSignOutAlt,
	faEdit,
	faMinusSquare,
	faCircleNotch,
	faPlusSquare,
	faPhoneAlt,
	faLocationArrow,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
	return library.add(
		faTrash,
		faSignOutAlt,
		faEdit,
		faMinusSquare,
		faCircleNotch,
		faPlusSquare,
		faPhoneAlt,
		faLocationArrow,
		faEnvelope
	);
};

export default Icons;
