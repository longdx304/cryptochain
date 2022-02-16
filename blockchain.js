const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain {
  chain = [Block.genesis()];

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { lastHash, timestamp, data, hash } = chain[i];
      const actualLastHash = chain[i - 1].hash;

      if (lastHash !== actualLastHash) {
        return false;
      }

      const validatedHash = cryptoHash(lastHash, timestamp, data);
      if (validatedHash !== hash) {
        return false;
      }
    }

    return true;
  }

  addBlock({ data }) {
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock = Block.mineBlock({
      lastBlock,
      data,
    });

    this.chain.push(newBlock);
  }
}

module.exports = Blockchain;
