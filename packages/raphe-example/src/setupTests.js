import "babel-polyfill";
import { Raphe, SQLRecordingRepository } from "raphe";

global.raphe = new Raphe({
  recordingRepository: new SQLRecordingRepository("/Users/elpassion/db.sqlite")
});
