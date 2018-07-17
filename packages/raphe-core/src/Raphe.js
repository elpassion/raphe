const isEqualWith = require("lodash.isequalwith");
const CallFactory = require("./CallFactory");

class Raphe {
  constructor({ recordingRepository }) {
    this.recordingRepository = recordingRepository;
  }

  create(
    name,
    { old: oldFn, args, record, new: newFn, expectedErrors, callBoth, resultSerializer }
  ) {
    const callFactory = new CallFactory(expectedErrors);

    if (callBoth) {
      const newResult = callFactory.callFor(newFn)(args);
      const oldResult = callFactory.callFor(oldFn)(args);
      const serializedNewResult = JSON.stringify(resultSerializer ? resultSerializer(newResult) : newResult);
      const serializedOldResult = JSON.stringify(resultSerializer ? resultSerializer(oldResult) : oldResult);
      if (!isEqualWith(serializedNewResult, serializedOldResult)) {
        throw new Error("ResultMismatch");
      }
      return newResult;
    } else {
      const calledFunction = record ? oldFn : newFn || oldFn;
      const result = callFactory.callFor(calledFunction)(args);
      if (record) {
        const serializedResult = resultSerializer ? resultSerializer(result) : result;
        this.recordingRepository.create({ name, args: args, result: serializedResult });
      }
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
