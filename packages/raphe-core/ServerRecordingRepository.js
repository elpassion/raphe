const fetch = require("cross-fetch");

class ServerRecordingRepository {
  constructor(serverUri) {
    this.serverUri = serverUri;
  }

  async create({ name, args, result }) {
    try {
      const response = await fetch(this.serverUri, {
        method: "POST",
        body: JSON.stringify({ name, args, result }),
        headers: { "content-type": "application/json" }
      });
      if (response.status !== 201) throw response.status;
    } catch (e) {
      console.warn(e);
    }
  }

  async getAll(name) {
    try {
      const response = await fetch(`${this.serverUri}/${name}`);
      const recordings = await response.json();
      return recordings;
    } catch (e) {
      console.warn(e);
    }
  }

  async deleteAll(name) {
    try {
      const response = await fetch(`${this.serverUri}/${name}`, {
        method: "DELETE"
      });
      if (response.status !== 204) throw response.status;
    } catch (e) {
      console.warn(e);
    }
  }
}

module.exports = ServerRecordingRepository;
