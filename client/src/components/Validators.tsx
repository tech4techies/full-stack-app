/** @format */

export interface IValidatorResult {
  err: boolean;
  errMessage: string;
}
export class Validator {
  static email = (s: string | null, fieldName: string): IValidatorResult => {
    const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
    if (s && emailRegex.test(s)) return { err: false, errMessage: "" };
    else
      return {
        err: true,
        errMessage: `Entered ${fieldName} is an invalid email`,
      };
  };
  static equal = (
    enteredValue: string | null,
    compareVal: string,
    fieldName: string,
    comparatorFieldName: string,
  ): IValidatorResult => {
    return enteredValue && enteredValue === compareVal
      ? {
          err: false,
          errMessage: "",
        }
      : {
          err: true,
          errMessage: `Entered ${fieldName} doesn't match with ${comparatorFieldName}`,
        };
  };
  static isRequired = (s: string | null, fieldName: string) => {
    return s && s.length > 0
      ? { err: false, errMessage: "" }
      : { err: true, errMessage: `${fieldName} cannot be blank` };
  };
}
