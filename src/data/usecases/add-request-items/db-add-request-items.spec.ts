import { RequestItemsModel, AddRequestItemsModel, AddRequestItemsRepository, UpdateRequestItemsTopicRepository, ItemsModel } from './db-add-request-items-protocols'
import { DbAddRequestItems } from './db-add-request-items'
import { KafkaHelper } from '../../../infra/topic/kafka/helpers/kafka-helper'

const makeFakeRequestItems = (): RequestItemsModel => ({
  requestItemsId: 'valid_requestItemsId',
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

const makeFakeRequest = (): AddRequestItemsModel => ({
    documentClient: 'valid_documentClient',
    items: [{
      itemId: 'valid_id',
      name: 'valid_name',
      description: 'valid_description',
      category: 'valid_category',
      quantity: 2,
      unitaryValue: 9.15
    }]
})

const makeAddRequestItemsRepository = (): AddRequestItemsRepository => {
  class AddRequestItemsRepositoryStub implements AddRequestItemsRepository {
    async add (requestItemData: AddRequestItemsModel): Promise<RequestItemsModel> {
      return await new Promise(resolve => resolve(makeFakeRequestItems()))
    }
  }
  return new AddRequestItemsRepositoryStub()
}

const makeItemInMemoryRepository = (): UpdateRequestItemsTopicRepository => {
  class ItemInMemoryRepositoryStub implements UpdateRequestItemsTopicRepository {
    async updateItem (itemsModel: ItemsModel[]): Promise<void> {
      jest.spyOn(KafkaHelper, 'producerUpdateItem').mockImplementation()        
    }
  }
  return new ItemInMemoryRepositoryStub()
}

interface SutTypes {
  sut: DbAddRequestItems
  addRequestItemRepositoryStub: AddRequestItemsRepository
  updateRequestItemsTopicRepository: UpdateRequestItemsTopicRepository
}

const makeSut = (): SutTypes => {
  const addRequestItemRepositoryStub = makeAddRequestItemsRepository()
  const updateRequestItemsTopicRepository = makeItemInMemoryRepository()

  const sut = new DbAddRequestItems(addRequestItemRepositoryStub, updateRequestItemsTopicRepository)

  return {
    sut,
    addRequestItemRepositoryStub,
    updateRequestItemsTopicRepository
  }
}

describe('DbAddRequestItems Usecase', () => {
  test('Should call AddItemRepository with correct values', async () => {
    const { sut, addRequestItemRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRequestItemRepositoryStub, 'add')

    const modelRequestItemsRepository = {
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
  }

    await sut.add(makeFakeRequest())

    expect(addSpy).toHaveBeenCalledWith(modelRequestItemsRepository)
  })

  test('Should throw if AddItemRepository throws', async () => {
    const { sut, addRequestItemRepositoryStub } = makeSut()
    jest.spyOn(addRequestItemRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeRequest())
    await expect(promise).rejects.toThrow('')
  })

  test('Should an Item In Memory on success', async () => {
    const { sut } = makeSut()
    const item = await sut.add(makeFakeRequest())
    expect(item).toEqual(makeFakeRequestItems())
  })

  test('Should throw if ItemInMemoryRepository throws', async () => {
    const { sut, updateRequestItemsTopicRepository } = makeSut()
    jest.spyOn(updateRequestItemsTopicRepository, 'updateItem')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeRequest())
    await expect(promise).rejects.toThrow('')
  })

})