import { Request, Response, Router } from 'express';

export const routeToggledSection = Router();

routeToggledSection.get('/', function(_req: Request, res: Response) {
  res.render('index', { title: 'Toggle section 1....' });
});

routeToggledSection.get('/page-1', function(_req:Request, res: Response) {
  res.render('index', { title: 'Toggle section page 1....' });
});

routeToggledSection.get('/page-2', function(_req:Request, res: Response) {
  res.render('index', { title: 'Toggle section page 2....' });
});
