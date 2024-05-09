# @servicenow/sass-global (v26.0.14-webux.1)

Global variables, functions, and mixins required to build design system styles

### Install in your project

```
tectonic add --saveExact @servicenow/sass-global
```

## Mixins

<details><summary><strong>now-mx-ellipsis</strong></summary><p>

Truncates single line text using ellipsis.

</p></details><br/>

<details><summary><strong>now-mx-focus-ring</strong></summary><p>

Ouputs CSS for `:focus` states on a standard element

</p></details><br/>

<details><summary><strong>now-mx-focus-ring--bare</strong></summary><p>

Ouputs CSS for `:focus` states on a bare or text element

</p></details><br/>

<details><summary><strong>now-mx-global-space-sub</strong></summary><p>

Creates a set of classes declaring margins or paddings for each size
supported in the global spacing set, plus zero.

**Parameters**
<ul>
<li><code>$property-key: String</code> - whether margin or padding</li><li><code>$property-value: String</code> - for margin m, for padding p</li><li><code>$size-key: String</code> - size abbreviation</li><li><code>$size-value: String</code> - global spacing variable
</li>
</ul>

**Examples**

*Input*

```scss
@include now-mx-global-space-sub(m, margin, xxs, $now-global-space--xxs);
```

*Output*

```css
.now-m-block--xxs {
	margin-block-start: 2px;
	margin-block-end: 2px;
}

.now-m-block-start--xxs {
	margin-block-start: 2px;
}

.now-m-block-end--xxs {
	margin-block-end: 2px;
}

.now-m-inline--xxs {
	margin-inline-start: 2px;
	margin-inline-end: 2px;
}

.now-m-inline-start--xxs {
	margin-inline-start: 2px;
}

.now-m-inline-end--xxs {
	margin-inline-end: 2px;
}
```

</p></details><br/>

<details><summary><strong>now-mx-ie11only</strong></summary><p>

DEPRECATED, IE11 IS NO LONGER SUPPORTED BY MODERN SERVICENOW UIS. We are
leaving this mixin to ensure customer code that still uses it doesn't fail
to compile, but it should be removed.

Provides an exotic CSS media-query only MSIE11 understands.

**Examples**

*Input*

```scss
@include now-mx-ie11only {
	.foo {
		width: auto;
	}
}
```

*Output*

```css
@media (-ms-high-contrast: active), (-ms-high-contrast: none) {
	.foo {
		width: auto;
	}
}
```

</p></details><br/>

<details><summary><strong>now-mx-inherits</strong></summary><p>

Sets values for CSS properties that otherwise inherit their values. Most
components will share this common set of values as is, but when not
appropriate, different values can be set in the mixin's argument or can be
omitted from the compiled CSS by setting `false` as a property's value in
the mixin's argument.

**Parameters**
<ul>
<li><code>$font-style: String | Bool</code> - font-style value</li><li><code>$font-weight: String | Bool</code> - font-weight value</li><li><code>$font-variant: String | Bool</code> - font-variant value</li><li><code>$letter-spacing: String | Bool</code> - letter-spacing value</li><li><code>$word-spacing: String | Bool</code> - word-spacing value</li><li><code>$text-transform: String | Bool</code> - text-transform value</li><li><code>$text-indent: Number | Bool</code> - text-indent value</li><li><code>$text-shadow: String | Bool</code> - text-shadow value</li><li><code>$white-space: String | Bool</code> - white-space value
</li>
</ul>

**Examples**

*Input*

```scss
.foo {
	@include now-mx-inherits($font-style:false,$font-weight:bold);
}
```

*Output*

```css
.foo {
	font-weight: bold;
	font-variant: normal;
	letter-spacing: normal;
	word-spacing: normal;
	text-transform: none;
	text-indent: 0;
	text-shadow: none;
	white-space: normal;
}
```

</p></details><br/>

<details><summary><strong>now-mx-line-clamp</strong></summary><p>

Applies a multi-line truncation with ellipses.

**Parameters**
<ul>
<li><code>$lines: Number</code> - number of lines to clamp.
</li>
</ul>

**Examples**

*Input*

```scss
.content {
	@include now-mx-line-clamp(3);
}
```

*Output*

```css
.content {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
```

</p></details><br/>

<details><summary><strong>now-mx-line-height-crop</strong></summary><p>

Removes vertical space from above and below text while maintaining
line-height. Is particularly useful for visually vertically centering text
inside a container.

Default argument is global line-height but can accept custom
line-height and adjusts cropping accordingly. Can also take optional
arguments to add space for either ascenders or descenders avoiding unwanted
clipping of text when the `.now-line-height-crop` element is subject to
overflow hidden.

**Parameters**
<ul>
<li><code>$line-height: Number</code> - line-height value</li><li><code>$custom-property-namspace: String</code> - custom property namespace to use (excluding --before or --after)</li><li><code>$include-ascender-space: bool</code> - add padding-block-start</li><li><code>$include-descender-space: bool</code> - add padding-block-end
</li>
</ul>

**Examples**

*Input*

```scss
.foo {
	@include now-mx-line-height-crop;
}
```

*Output*

```css
.foo:before,
.foo:after {
	content: '';
	display: block;
	height: 0;
}
.foo:before {
	margin-block-start: calc(0.25em * 1);
}
.foo:after {
	margin-block-end: calc(0.125em * 1);
}
.foo + .foo {
	margin-block-start: calc(0.25em * 1 * -1);
}
```

</p></details><br/>

<details><summary><strong>now-mx-rtl-property</strong></summary><p>

Sets a direction sensitive CSS property (property will be flipped for an
RTL layout)

**Parameters**
<ul>
<li><code>$prop: String</code> - Direction sensitive CSS property</li><li><code>$val: String</code> - CSS value</li>
</ul>

**Examples**

*Input*

```scss
.foo {
	@include now-mx-rtl-property(left, 16px);
}
```

*Output*

```css
:root:not([dir='rtl']) .foo,
:host(:not([dir='rtl'])) .foo {
	left: 16px;
}
:root[dir='rtl'] .foo,
:host([dir='rtl']) .foo {
	right: 16px;
}
```

</p></details><br/>

<details><summary><strong>now-mx-rtl-value</strong></summary><p>

Sets a direction sensitive CSS value (value will be flipped for an
RTL layout)

**Parameters**
<ul>
<li><code>$prop: String</code> - Direction sensitive CSS property</li><li><code>$val: String</code> - CSS value</li>
</ul>

**Examples**

*Input*

```scss
.foo {
	@include now-mx-rtl-value(text-align, left);
}
```

*Output*

```css
:root:not([dir='rtl']) .foo,
:host(:not([dir='rtl'])) .foo {
	text-align: left;
}
:root[dir='rtl'] .foo,
:host([dir='rtl']) .foo {
	text-align: right;
}
```

</p></details><br/>

## Functions

<details><summary><strong>now-fn-color2rgb</strong></summary><p>

Converts supplied color value to a RGB triplet

**Parameters**
<ul>
<li><code>$color: Color </code> - Color expressed in valid CSS notation</li>
</ul>

**Returns**
<ul>
<li><code>List</code> - RGB triplet xxx, xxx, xxx
</li>
</ul>

**Examples**

*Input*

```scss
$foo: now-fn-color2rgb(#ffffff)

.foo {
	color: RGB($foo);
}
```

*Output*

```css
.foo {
	color: RGB(255,255,255);
}
```

</p></details><br/>

<details><summary><strong>now-fn-px2rem</strong></summary><p>

Returns a 16 base rem value computed from supplied pixel value

**Parameters**
<ul>
<li><code>$px-value: Number </code> - `px` value to be converted</li>
</ul>

**Returns**
<ul>
<li><code>Number</code> - `rem` value
</li>
</ul>

**Examples**

*Input*

```scss
.foo {
	inline-size: now-fn-px2rem(32px);
}
```

*Output*

```css
.foo {
	inline-size: 2rem;
}
```

</p></details><br/>

<details><summary><strong>now-fn-scale-size</strong></summary><p>

Applies the scaling formula for scaling the size of a component to a CSS rule of your choice.

If the property has `inline-size|width` or `block-size|height` in the name, the mixin
will use this formula to scale: `value = 1/2 value + (scaling theme hook * 1/2 value)`

If the property has `margin` or `padding` in the name, the mixin will use
this formula to scale: `value = value * scaling theme hook`

**Parameters**
<ul>
<li><code>$property: String </code> - css property that is being set</li><li><code>$value: Number </code> - the property value that is being scaled</li><li><code>$scaleSizeVar: String </code> - the scaling theme hook</li>
</ul>

**Returns**
<ul>
<li><code>Number</code> - The value of the height, width, padding, or margin with scaling
 hook applied
</li>
</ul>

**Examples**

*Input*

```scss
.foo {
	block-size: now-fn-scale-size('block-size', 16px, $now-badge--scale_block);
}
```

*Output*

```css
.foo {
	block-size: 8px + $now-badge--scale_block * 8px
}
```

*Input*

```scss
.bar {
	padding-inline-start: now-fn-scale-size('padding-inline-start', 8px, $now-badge--scale_inline);
}
```

*Output*

```css
.bar {
	padding-inline-start: 8px * $now-badge--scale_inline
}
```

</p></details><br/>

<details><summary><strong>now-fn-scale-space</strong></summary><p>

Makes a visual "spacing" value scalable through theming.
Space scaling is not linear and the scaling factor changes based on the value of the space.
If the spacing value you are scaling represents only part of the total space you are
trying to scale then you should use $target to pass in the total space you are trying to scale.
Do not use negative values, instead multiply the result of the function with -1, e.g calc(#{now-fn-scale-space(the_space_value)}* -1)

The example below illustrates how a space in a form is made of both a margin-block-start and a margin-block-end.
Each margin is 8px and the total visual space on the design calls for 16px

**Parameters**
<ul>
<li><code>$value: Number </code> - The spacing value that will become scalable</li><li><code>$target: Number </code> - Optional value of the total visual space that needs to be scalable</li>
</ul>

**Returns**
<ul>
<li><code>Number</code> - The scalable space
</li>
</ul>

**Examples**

```scss
.top-component {
	margin-block-end: now-fn-scale-space(8px, 16px);
}
.bottom-component {
	margin-block-start: now-fn-scale-space(8px, 16px);
}
```

*Input*

```scss
.foo {
	margin-inline-end: now-fn-scale-space($now-global-space--md);
	}
```

</p></details><br/>

<details><summary><strong>now-fn-str-replace</strong></summary><p>

Replace `$search` with `$replace` in `$string`. e.g. `str-replace
('padding-left', 'left', 'right');` returns 'padding-right'

**Parameters**
<ul>
<li><code>$string: String </code> - Initial string</li><li><code>$search: String </code> - Substring to replace</li><li><code>$replace: String </code> - ('') - New value</li>
</ul>

**Returns**
<ul>
<li><code>String</code> - Updated string</li>
</ul>

</p></details><br/>
