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
    <div style="color: red">Hello world!</div>
    `,
    body => t.snapshot(serialize(body.querySelector('div')))
  );
});
