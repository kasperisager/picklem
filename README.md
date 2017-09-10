# Pickl'em

> Pickle your DOM and CSS and enjoy them outside the confines of your least favorite browser

Pickl'em was born out of a frustration with attempting to do _static analysis_ of webpages in the _dynamic environment_ of a browser. In many ways, this is similar to attempting to solve a jigsaw puzzle with a toddler sitting next to you; it's possible most of the time though error prone and time consuming. Pickl'em allows you to serialize the DOM and associated CSS styling of a webpage in order to quickly get the hell out of the browser and into a more sane environment where you can then perform your actual analysis.

## Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [License](#license)

## Installation

```sh
$ yarn add picklem
```

## Usage

```css
body {
  font-family: Helvetica, sans-serif;
}

div {
  color: red;
}
```

```html
<body>
  <div title="Hi!">Hello world!</div>
</body>
```

```js
import serialize from 'picklem';

serialize(document.querySelector('div'))

Object {
  type: 'element',
  tag: 'div',
  attributes: [
    {
      name: 'title',
      value: 'Hi!'
    }
  ],
  style: [
    {
      name: 'font-family',
      value: 'Helvetica, sans-serif'
    },
    {
      name: 'color',
      value: 'rgb(255, 0, 0)'
    }
  ],
  children: [
    {
      type: 'text',
      value: 'Hello world!'
    }
  ]
}
```

## License

Copyright &copy; 2017 [Kasper Kronborg Isager](https://github.com/kasperisager). Licensed under the terms of the [MIT license](LICENSE.md).
