# strokeIt

A very simple SVG stroke animation javascript plugin. Can be used with or without jQuery.

## Usage

Make an SVG with a `stroke` color and `stroke-width` set on the path or the wrapping group.
 
Then include `strokeIt.js` or `strokeIt.min.js` in your document. Then just call the `strokeIt();` function when ready.

### JavaScript

```js
strokeIt(elements (array), arguments (object));
```

### jQuery

```js
$('selector').strokeIt(arguments (object));
```

#### Arguments

```js
{
  reverse:  boolean, // Animates the stroke in reverse if true.
  sequence: boolean  // If multiple SVG elements are passed, they will be animated in sequntial order if true or all at the same time if false.
}
```

#### Example

```js
strokeIt([
  document.getElementById('svg1'),
  document.getElementById('svg2')
], {
  reverse  : true,
  sequence : true
});
```
