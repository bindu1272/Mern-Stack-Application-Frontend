import React, { useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { WRONG_EMAIL, WRONG_PASSWORD } from "./Constants";
const Validation = () => {
  return useRef(
    new SimpleReactValidator({
      validators: {
        email: {
          message: WRONG_EMAIL,
          rule: (val,params,validator) => {
              return validator.helpers.testRegex(val,/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/);
          },
        messageReplace: (message,params) =>
          message.replace("", this.helpers.toSentence(params)),
        required: true,
      },
      },
      password: {
        message: WRONG_PASSWORD,
        rule: (val,params,validator) => {
            return validator.helpers.testRegex(val,/^(?=.*[0-9])(?=.*[!@#%$^&*])[a-zA-z0-9!@#$%^&*]{4,12}/);
        },
        messageReplace: (message,params) =>
          message.replace("", this.helpers.toSentence(params)),
        required: true,
      },
      element:(message)=><span className="error-message">{message}</span>
    })
  );
};

export default Validation;
