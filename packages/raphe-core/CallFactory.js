class CallFactory {
  constructor(expectedErrors) {
    this.expectedErrors = expectedErrors || [];
  }

  callFor(fn) {
    return args => {
      try {
        return fn(...args);
      } catch (e) {
        const errorWasExpected = this.expectedErrors
          .map(expectedError => e instanceof expectedError)
          .includes(true);
        if (!errorWasExpected) {
          throw e;
        } else {
          return e;
        }
      }
    };
  }
}

module.exports = CallFactory;