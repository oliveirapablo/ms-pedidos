import { MongoHelper } from '../helpers/mongo-helper'
import { RequestItemsMongoRepository } from './add-request-items'

describe('Item Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('items')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): RequestItemsMongoRepository => {
    return new RequestItemsMongoRepository()
  }

  test('Shoul return an item on success', async () => {
    const sut = makeSut()
    const requestItems = await sut.add({
      documentClient: 'valid_documentClient',
      amountRequest: 18.3,
      items: [{
        itemId: 'valid_id',
        name: 'valid_name',
        description: 'valid_description',
        category: 'valid_category',
        quantity: 2,
        unitaryValue: 9.15
      }]
   })
    
    expect(requestItems.lastUpdate).toBeTruthy()
    expect(requestItems).toBeTruthy()
    expect(requestItems.requestItemsId).toBeTruthy()
    expect(requestItems.items).toBeTruthy()
    expect(requestItems.documentClient).toBe('valid_documentClient')
  })
})