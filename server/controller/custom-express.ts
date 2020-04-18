/** @format */

import { Request, Response, NextFunction } from "express";

export function notFound(req: Request, res: Response) {
  res.status(404).send("not Found");
}

export function jaction(asyncFunc: Function) {
  const wrapFunc = async (req: Request, res: Response) => {
    const result = await asyncFunc(req, res);
    return result;
  };
  return function requestHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    wrapFunc(req, res)
      .then((result) => res.json(result))
      .catch((err) => next(err));
  };
}

export function action(asyncFunc: Function) {
  const wrapFunc = async (req: Request, res: Response) => {
    await asyncFunc(req, res);
  };
  return function requestHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    wrapFunc(req, res).catch((err) => next(err));
  };
}

export class ValidationError extends Error {
  errors?: Object;
  constructor(errors: Object) {
    super(JSON.stringify(errors));
    this.errors = errors;
  }
}
