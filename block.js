const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const lastHash = lastBlock.hash;
    const timestamp = Date.now();
    const hash = cryptoHash(lastHash, timestamp, data);

    return new this({
      lastHash,
      data,
      timestamp,
      hash,
    });
  }

  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
}

module.exports = Block;
