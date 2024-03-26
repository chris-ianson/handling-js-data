import fastCheck from "fast-check";

export default class BaseGenerators {
  static getDataObject = () => fastCheck.sample(fastCheck.record({
    data: fastCheck.constantFrom('data a', 'data b')
  }), 1)[0];

  static getNumber: () => number = () => fastCheck.sample(fastCheck.nat(99), 1)[0];
}
