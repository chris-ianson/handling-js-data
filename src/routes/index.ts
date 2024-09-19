import {Router, RequestHandler} from "express";

export const routeExampleToggledPages = Router();

routeExampleToggledPages.get('/', function (_req, res) {
  res.render('index', {title: 'Express + TypeScript'});
});

routeExampleToggledPages.get('/toggle-page-example-1', function (_req, res) {
  if (process.env.IS_TOGGLE_PAGE_EXAMPLE_1_ENABLED === 'true') {
    res.render('index', {title: 'Toggle page....'});
  } else {
    res.sendStatus(404);
    return;
  }
});

const featureToggle: RequestHandler = (_req, res, next) => {
  if (process.env.IS_TOGGLE_PAGE_EXAMPLE_2_ENABLED !== 'true') {
    res.sendStatus(404);
    return;
  }
  return next();
};

routeExampleToggledPages.get('/toggle-page-example-2',
  featureToggle,
  function (_req, res) {
    res.render('index', {title: 'Toggle page....'});
  });
