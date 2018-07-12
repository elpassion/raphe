const Raphe = require("../Raphe.js");

describe("Raphe.create", () => {
  let recordingRepository;
  let raphe;
  const recordingName = "add";
  beforeEach(() => {
    recordingRepository = {
      create: jest.fn()
    };
    raphe = new Raphe({ recordingRepository });
  });

  test("acts as a proxy for passed old function", () => {
    const fn = jest.fn().mockReturnValueOnce(2);
    const args = [1, 1];
    const result = raphe.create(recordingName, { old: fn, args });
    expect(fn).toHaveBeenCalledWith(...args);
    expect(result).toEqual(2);
  });

  test("saves function params, name and result to db if record option is passed", () => {
    const fnResult = 2;
    const fnArgs = [1, 1];
    recordingRepository.create.mockReturnValueOnce(fnResult);
    const result = raphe.create(recordingName, {
      old: jest.fn().mockReturnValueOnce(fnResult),
      args: fnArgs,
      record: true
    });
    expect(recordingRepository.create).toHaveBeenCalledWith({
      name: recordingName,
      args: fnArgs,
      result: fnResult
    });
  });

  test("saves function params, name and thrown error to db if the error is in expectedErrors", () => {
    class SuperError {}
    const fnArgs = [1, 1];
    recordingRepository.create = jest.fn();
    const result = raphe.create(recordingName, {
      old: jest.fn(() => {
        throw new SuperError();
      }),
      args: fnArgs,
      record: true,
      expectedErrors: [SuperError]
    });
    expect(recordingRepository.create).toHaveBeenCalledWith({
      name: recordingName,
      args: fnArgs,
      result: new SuperError()
    });
  });

  test("does not call repository if record option is falsey", () => {
    const fnResult = 2;
    const fnArgs = [1, 1];
    recordingRepository.create.mockReturnValueOnce(fnResult);
    const result = raphe.create(recordingName, {
      old: jest.fn().mockReturnValueOnce(fnResult),
      args: fnArgs,
      record: false
    });
    expect(recordingRepository.create).not.toHaveBeenCalled();
  });

  test("calls new function if passed rather than old", () => {
    const fnResult = 2;
    const fnArgs = [1, 1];
    const oldFn = jest.fn();
    const newFn = jest.fn().mockReturnValueOnce(fnResult);
    const result = raphe.create(recordingName, {
      old: oldFn,
      new: newFn,
      args: fnArgs,
      record: false
    });
    expect(newFn).toHaveBeenCalledWith(...fnArgs);
    expect(result).toEqual(fnResult);
    expect(oldFn).not.toHaveBeenCalled();
  });

  test("records old function if record and new parameters are passed", () => {
    const fnArgs = [1, 1];
    const oldFn = jest.fn();
    const newFn = jest.fn();
    const result = raphe.create(recordingName, {
      old: oldFn,
      new: newFn,
      args: fnArgs,
      record: true
    });
    expect(oldFn).toHaveBeenCalled();
    expect(newFn).not.toHaveBeenCalled();
  });

  test("calls both functions if call both is passed and throws if results mismatch", () => {
    const fnArgs = [1, 1];
    const oldFn = jest.fn().mockReturnValueOnce(2);
    const newFn = jest.fn().mockReturnValueOnce(3);
    expect(() =>
      raphe.create(recordingName, {
        old: oldFn,
        new: newFn,
        args: fnArgs,
        callBoth: true
      })
    ).toThrowError("ResultMismatch");
  });

  test("calls both functions if call both is passed and returns result if they match", () => {
    const fnArgs = [1, 1];
    const oldFn = jest.fn().mockReturnValueOnce(2);
    const newFn = jest.fn().mockReturnValueOnce(2);
    expect(
      raphe.create(recordingName, {
        old: oldFn,
        new: newFn,
        args: fnArgs,
        callBoth: true
      })
    ).toEqual(2);
  });
});
