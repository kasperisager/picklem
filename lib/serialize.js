import virtualize from './virtualize';
import dedupe from './dedupe';
import clean from './clean';

export default function serialize(node) {
  return clean(dedupe(virtualize(node)));
}
