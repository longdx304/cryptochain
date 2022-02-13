const Block = require('./block');

class Blockchain {
  chain = [Block.genesis()];

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
