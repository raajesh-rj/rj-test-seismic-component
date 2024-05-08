import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

const view = (state, { updateState }) => {
	return (
		<div>
			<now-heading
				label="RJ Test Component Heading"
				className="label-placeholder"
				level="3"
				variant="title-tertiary"
				has-no-margin={true}
			></now-heading>
		</div>
	);
};

createCustomElement("x-1347040-rj-test-component", {
	renderer: { type: snabbdom },
	view,
	styles,
});
