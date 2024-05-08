import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div>RJ Test component</div>
	);
};

createCustomElement('x-1347040-rj-test-component', {
	renderer: {type: snabbdom},
	view,
	styles
});
