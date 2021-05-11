const Anft = artifacts.require('./Anft.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Anft', (accounts) => {
  let contract

  before(async () => {
    contract = await Anft.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Anft')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'AMU')
    })

  })

  describe('minting', async () => {

    it('startSale, priceCheck and check totalSupply', async () => {
      const startsale = await contract.startSale()
      const priceCheck = await contract.calculatePrice()
     // const minting = await contract.adoptANFT('1')
      const totalSupply = await contract.totalSupply()
      // SUCCESS
  //    assert.equal(startsale, 1)
      assert.equal(totalSupply, 0 , 'Supple is not correct')
  //    const event = totalSupply.logs[0].args
      assert.equal(priceCheck, '20000000000000000', 'Price not correct')
   //   assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
   //   assert.equal(event.to, accounts[0], 'to is correct')

      // FAILURE: cannot mint same color twice
      await contract.adoptANFT('30').should.be.rejected;
    })
  })

  

})
