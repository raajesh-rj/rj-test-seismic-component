import {createEnhancedElement} from '@servicenow/library-enhanced-element';
import {
	extensionSplit,
	filterAriaAttributes,
} from '@servicenow/library-enhanced-utils';
import {actionTypes} from '@servicenow/ui-core';
import styles from './_now-button.scss';
import '@servicenow/now-icon';
import tooltipBehavior, {
	TOOLTIP_ADD_TARGET,
	TOOLTIP_REMOVE_TARGET,
} from '@servicenow/behavior-tooltip';
import '@servicenow/now-tooltip';
import focusBehavior from '@servicenow/behavior-focus';
import {configAriaLabelRoleHasPopUpSchema} from '@servicenow/library-schemas';

const {COMPONENT_CONNECTED} = actionTypes;

const _renderIcon = (icon, size) => {
	if (icon) {
		return (
			<now-icon
				className="now-button-icon"
				icon={icon}
				size={size}
				aria-hidden="true"
			/>
		);
	}
};

const actionHandlers =
	process.env.NODE_ENV === 'development'
		? {
				[COMPONENT_CONNECTED]: ({state, action}) => {
					// eslint-disable-next-line no-undef
					const {id} = action.meta;
					const {icon, label, bare} = state.properties;
					if (icon && !label) {
						// eslint-disable-next-line no-console
						console.warn(
							`[@servicenow/now-button: ${id}] for icon-only buttons, use the <now-button-iconic> tag instead.`,
						);
					}
					if (bare) {
						// eslint-disable-next-line no-console
						console.warn(
							`[@servicenow/now-button: ${id}] for bare buttons, use the <now-button-bare> tag instead.`,
						);
					}
				},
			}
		: undefined;

/** @seismicView now-button */
const view = (state, {dispatch}) => {
	const {
		label,
		variant,
		size,
		icon = state.properties.iconName,
		bare,
		disabled,
		configAria,
		tooltipContent,
	} = state.properties;

	const ariaLabel = {...filterAriaAttributes(configAria, 'button')}?.[
		'aria-label'
	];

	let dataAriaDescribedBy;

	// If aria-label from configAria is present, it will override
	// the button's aria-label; OR if no label is present, but there is
	// aria-label from configAria, then set data-ariadescribed by
	// to aria-label, which will be compared to tooltip
	// in behavior-tooltip's scheduler
	if ((ariaLabel && label) || (ariaLabel && !label)) {
		dataAriaDescribedBy = ariaLabel;
	}

	// If tooltip and label are present but no aria-label
	// is provided by configAria
	// button's aria-label will default to label.
	// Set data-ariadescribedby to label
	// to be compared with tooltip in behavior-tooltip's scheduler
	if (tooltipContent && label && !ariaLabel) {
		dataAriaDescribedBy = label;
	}

	return (
		<button
			type="button"
			tabindex={disabled && tooltipContent ? '0' : undefined}
			on-mousedown={disabled ? (e) => e.preventDefault() : undefined}
			data-tooltip={tooltipContent}
			data-ariadescribedby={dataAriaDescribedBy}
			hook-insert={({elm: target}) => {
				dispatch(TOOLTIP_ADD_TARGET, {target});
			}}
			hook-destroy={({elm: target}) => {
				dispatch(TOOLTIP_REMOVE_TARGET, {target});
			}}
			on-click={() => {
				dispatch(({properties}) => ({
					type: 'NOW_BUTTON#CLICKED',
					payload: {},
					shouldDispatch: !properties.disabled,
				}));
			}}
			class={{
				'now-button': true,
				...extensionSplit(variant),
				['-' + size]: size,
				'is-bare': bare,
				'is-disabled': disabled,
				'only-icon': icon && !label,
			}}
			{...filterAriaAttributes(configAria, 'button')}
			disabled={disabled && !tooltipContent ? true : undefined}
			aria-disabled={disabled && tooltipContent ? 'true' : undefined}
		>
			<slot>
				{_renderIcon(icon, size)}
				{label !== null && label !== undefined && (
					<span className="now-line-height-crop">{label}</span>
				)}
			</slot>
		</button>
	);
};

/**
 * Buttons help users act, undo a mistake, or keep a conversation going.
 *
 * There are many types and sizes of buttons, each with a proper use case.
 * In addition to type and size, buttons use smaller design elements
 * such as containers, borders, colors, icons, or text, to accommodate specific use cases.
 *
 * ```jsx
 * <now-button label="Click me" variant="primary" size="lg" />
 * <now-button label="Settings" icon="gear-fill" />
 * <now-button label="Disabled button" disabled />
 * ```
 *
 * @seismicElement now-button
 * @summary Simple button. Contains a text label and an optional icon.
 * @uib.label Button
 * @uib.icon button
 * @uib.description Button with a background color.
 * @uib.category primitives
 * @uib.associatedTypes global.core
 * @uib.properties label, variant, size, disabled, icon, tooltipContent, configAria, landmark
 * @uib.layout.identifier.children icon
 * @uib.layout.identifier.icon image-outline
 * @uib.layout.accessibility.children tooltipContent, configAria, landmark
 * @uib.layout.accessibility.icon accessibility-outline
 * @uib.actions NOW_BUTTON#CLICKED
 * @uib.slots
 */
createEnhancedElement('now-button', {
	properties: {
		/**
		 * Text displayed inside the button.
		 * @type {string}
		 * @uib.label Label
		 * @uib.defaultValue Button
		 * @uib.description Text displayed inside the button
		 * @uib.translatable true
		 */
		label: {schema: {type: ['string', 'number']}},

		/**
		 * Sets the button style, including color and interaction behavior.
		 * @type {('primary'|'primary-positive'|'primary-negative'|'secondary'|'secondary-positive'|'secondary-negative'|'tertiary')}
		 * @uib.label Variant
		 * @uib.description Sets the button style
		 * @uib.typeMetadata.choices [{"label": "Primary", "value": "primary"}, {"label": "Secondary", "value": "secondary"}, {"label": "Tertiary", "value": "tertiary"}, {"label": "Positive Primary", "value": "primary-positive"}, {"label": "Positive Secondary", "value": "secondary-positive"}, {"label": "Negative Primary", "value": "primary-negative"}, {"label": "Negative Secondary", "value": "secondary-negative"}]
		 */
		variant: {
			default: 'secondary',
			schema: {
				type: 'string',
				enum: [
					'primary',
					'primary-positive',
					'primary-negative',
					'secondary',
					'secondary-positive',
					'secondary-negative',
					'tertiary',
				],
			},
		},
		/**
		 * Sets the button size.
		 * @type {('sm'|'md'|'lg')}
		 * @uib.label Size
		 * @uib.description Sets the button size
		 */
		size: {
			default: 'md',
			schema: {
				type: 'string',
				enum: ['sm', 'md', 'lg'],
			},
		},
		/** @private */
		iconName: {},
		/**
		 * If defined, specifies the icon to display at the start of the button.
		 * See the `now-icon` component documentation for valid inputs.
		 * For icon-only buttons, use `<now-button-iconic>` instead.
		 * @type {string}
		 * @uib.label Icon
		 * @uib.description Defines icon displayed at the start of the button
		 * @uib.fieldType icon
		 */
		icon: {schema: {type: 'string'}},
		/**
		 * Deprecated in favor of the `<now-button-bare>` tag.
		 * @private
		 */
		bare: {default: false, schema: {type: 'boolean'}},
		/**
		 * When true, mutes the button color and prevents user click interactions.
		 * @type {boolean}
		 * @uib.label Disabled
		 * @uib.description When true, disables user click interactions
		 */
		disabled: {default: false, schema: {type: 'boolean'}},
		/**
		 * An object whose keys reference a specific HTML element within the
		 * now-button. The value of each key is an object that contains an ARIA
		 * property (or properties) and corresponding value/s. These ARIA
		 * properties will be set on the specified element.
		 * The 'button' key corresponds to the inner html `<button>` in
		 * now-button. See https://www.w3.org/TR/wai-aria-1.2/#button for
		 * properties and accepted values.
		 * @type {{ 'aria-*': string, role: string }}
		 * @uib.label ARIA properties
		 * @uib.description Configures ARIA properties
		 */
		configAria: {
			deepCompare: true,
			schema: {
				oneOf: [
					{
						type: 'object',
						properties: {
							button: configAriaLabelRoleHasPopUpSchema,
						},
						additionalProperties: false,
					},
					configAriaLabelRoleHasPopUpSchema,
				],
			},
		},
		/**
		 * Text content shown inside the tooltip.
		 * @type {string}
		 * @uib.label Tooltip label
		 * @uib.defaultValue Enter a label
		 * @uib.description Text shown inside the tooltip
		 * @uib.translatable true
		 */
		tooltipContent: {schema: {type: 'string'}},
		/**
		 * Includes this component as a target for the Now-Trigger-Library's
		 * Landmark Focus feature.
		 * @type {boolean}
		 * @uib.label Landmark
		 * @uib.description Allow the Landmark Focus keyboard shortcut to focus this button
		 */
		landmark: {schema: {type: 'boolean'}},
	},
	view,
	styles,
	behaviors: [focusBehavior, tooltipBehavior],
	actionHandlers,
	dispatches: {
		/**
		 * Dispatched when the button is clicked.
		 * @type {{}}
		 * @uib.description Dispatched when the button is clicked
		 */
		'NOW_BUTTON#CLICKED': {default: false, schema: {type: 'object'}},
	},
	slots: {
		/**
		 * Content placed in the default slot appears inside
		 * the button body, taking the place of the `icon` and/or `label`.
		 * @defaultSlot
		 */
		defaultSlot: {},
	},
});
