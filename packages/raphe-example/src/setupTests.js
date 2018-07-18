import "babel-polyfill";
import path from "path";
import { Raphe, SQLRecordingRepository } from "raphe";

global.raphe = new Raphe({
  recordingRepository: new SQLRecordingRepository(path.join(__dirname, "../", "raphe.sqlite"))
});
