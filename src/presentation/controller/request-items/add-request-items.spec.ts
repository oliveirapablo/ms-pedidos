import { AddRequestItemsController } from './add-request-items'
import { MissingParamError, InvalidParamError } from '../../errors'
import { AddRequestItems, AddRequestItemsModel, HttpRequest, RequestItemsModel } from './request-items-protocols'
import { ok, serverError, badRequest } from '../../helpers/http-helper'
const makeAddRequestItems = (): AddRequestItems => {
  class AddRequestItemsStub implements AddRequestItems {
    async add(item: AddRequestItemsModel): Promise<RequestItemsModel> {
      return await new Promise(resolve => resolve(makeFakeRequestItems()))
    }
  }
  return new AddRequestItemsStub()
}

interface SutTypes {
  sut: AddRequestItemsController
  addRequestItemsStub: AddRequestItems
}

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

const makeFakeRequest = (): HttpRequest => ({
  body: {
    documentClient: 'valid_documentClient',
    items: [{
      itemId: 'valid_id',
      name: 'valid_name',
      description: 'valid_description',
      category: 'valid_category',
      quantity: 2,
      unitaryValue: 9.15
    }]
  }
})

const makeSut = (): SutTypes => {
  const addRequestItemsStub = makeAddRequestItems()
  const sut = new AddRequestItemsController(addRequestItemsStub)
  return {
    sut,
    addRequestItemsStub
  }
}

describe('AddRequestItemsController', () => {
  test('Should return 400 if no documentClient is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        items: [{
          itemId: 'valid_id',
          name: 'valid_name',
          description: 'valid_description',
          category: 'valid_category',
          quantity: 2,
          unitaryValue: 9.15
        }]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('documentClient')))
  })

  test('Should return 400 if no items is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        documentClient: 'valid_documentClient',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('items')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(ok(makeFakeRequestItems()))
  })
})