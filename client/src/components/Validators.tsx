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

  static password = (val: string, fieldName: string): IValidatorResult => {
    const res: IValidatorResult = {
      err: false,
      errMessage: "",
    };
    const PASSWORD_POLICY = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (PASSWORD_POLICY.test(val)) {
      res.err = false;
      res.errMessage = "";
    } else {
      res.err = true;
      res.errMessage = `${fieldName} must contain atleast 8 characters having One Number, One Special Character, One Uppercase Letter, One Lowercase Letter`;
    }
    return res;
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
