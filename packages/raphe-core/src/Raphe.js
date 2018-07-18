import isEqualWith from 'lodash.isequalwith';
import CallFactory from "./CallFactory";
import serialize from "serialize-javascript";

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
      const serializedNewResult = resultSerializer ? resultSerializer(newResult) : newResult;
      const serializedOldResult = resultSerializer ? resultSerializer(oldResult) : oldResult;
      if (!isEqualWith(serializedNewResult, serializedOldResult)) {
        throw new Error(`ResultMismatch, expected new: ${serializedNewResult} to equal old: ${serializedOldResult}`);
      }
      return newResult;
    } else {
      const calledFunction = record ? oldFn : newFn || oldFn;
      const result = callFactory.callFor(calledFunction)(args);
      if (record) {
        const serializedResult = resultSerializer ? resultSerializer(result) : result;
        const serializedArgs = serialize(args);
        this.recordingRepository.create({ name, args: serializedArgs, result: serializedResult });
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
