import fastCheck from "fast-check";

export default class AxiosGenerator {

  static error = fastCheck.record(
      {
        data: fastCheck.constant({}),
        status: fastCheck.constant(500),
        statusText: fastCheck.constant('InternalServerError'),
        headers: fastCheck.constant({}),
        config: fastCheck.constant({}),
        isAxiosError: fastCheck.constant(true)
      }
    );

  static error404 = fastCheck.record(
    {
      data: fastCheck.constant({}),
      status: fastCheck.constant(404),
      statusText: fastCheck.constant('NotFound'),
      headers: fastCheck.constant({}),
      config: fastCheck.constant({})
    }
  );

  static getError = () => fastCheck.sample(
    this.error, 1
  )[0];

  static get404 = () => fastCheck.sample(
    this.error404, 1
  )[0];
}
