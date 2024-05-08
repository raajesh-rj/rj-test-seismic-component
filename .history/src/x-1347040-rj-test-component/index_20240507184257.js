import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-heading";
import '@servicenow/now-button';

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

			<now-button
				className="now-checklist-button"
				variant="primary"
				size="lg"
				label="Button Custom"
				bare={true}
				on-click={(e) => console.log("onclick e - ", e)}
			/>
		</div>
	);
};

createCustomElement("x-1347040-rj-test-component", {
	renderer: { type: snabbdom },
	view,
	styles,
});
