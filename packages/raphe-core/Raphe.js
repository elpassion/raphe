const isEqualWith = require("lodash.isequalwith");
const CallFactory = require("./CallFactory");

class Raphe {
  constructor({ recordingRepository }) {
    this.recordingRepository = recordingRepository;
  }

  create(
    name,
    { old: oldFn, args, record, new: newFn, expectedErrors, callBoth }
  ) {
    const callFactory = new CallFactory(expectedErrors);

    if (callBoth) {
      const newResult = callFactory.callFor(newFn)(args);
      const oldResult = callFactory.callFor(oldFn)(args);
      if (!isEqualWith(newResult, oldResult)) {
        throw new Error("ResultMismatch");
      }
      return newResult;
    } else {
      const calledFunction = record ? oldFn : newFn || oldFn;
      const result = callFactory.callFor(calledFunction)(args);
      if (record) this.recordingRepository.create({ name, args: args, result });
      return result;
    }
  }

  deleteAllWithName(name) {
    return this.recordingRepository.deleteAll(name);
  }

  getAllWithName(name) {
    return this.recordingRepository.getAll(name);
  }
}

module.exports = Raphe;
