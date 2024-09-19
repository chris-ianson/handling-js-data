import {RequestHandler, Router} from "express";
import {environment} from "../config/environment.server";

export const routeToggles = Router();

// const featureToggle: RequestHandler = (_req, res, next) => {
//   if(!environment.IS_TOGGLE_SECTION_ENABLED) {
//     res.sendStatus(404);
//     return;
//   }
//   return next();
// };
//
// routeToggles.use('/toggle-section',
//   featureToggle,
//   (_res, _req, next) => {
//   next();
// });

const featureToggleDynamic = (isToggledOn: boolean): RequestHandler => {
  return (_req, res, next) => {
    if (!isToggledOn) {
      res.sendStatus(404);
      return;
    }
    return next();
  };
}

routeToggles.use('/toggle-section',
  featureToggleDynamic(environment.IS_TOGGLE_SECTION_ENABLED),
  (_res, _req, next) => {
    next();
  });

