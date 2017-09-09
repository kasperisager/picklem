import test from 'ava';
import fixture from 'fixt';
import serialize from '../lib/serialize';

test('returns a serialized version of a DOM node', async t => {
  await fixture(
    `
    <style>
      body {
        font-family: Arial;
      }

      div {
        color: blue;
        background-color: blue;
      }
    </style>
    <div style="color: red"></div>
    `,
    body => t.deepEqual(
      serialize(body.querySelector('div')),
      {
        type: 'element',
        tag: 'div',
        attributes: [
          {
            name: 'style',
            value: 'color: red'
          }
        ],
        style: [
          {
            name: 'background-color',
            value: 'rgb(0, 0, 255)'
          },
          {
            name: 'font-family',
            value: 'Arial'
          }
        ],
        children: []
      }
    )
  );
});
