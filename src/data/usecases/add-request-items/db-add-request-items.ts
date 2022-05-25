import { AddRequestItemsModel, AddRequestItemsRepository, UpdateRequestItemsTopicRepository, AddRequestItems, RequestItemsModel } from './db-add-request-items-protocols'

export class DbAddRequestItems implements AddRequestItems {
  private readonly addRequestItemsRepository: AddRequestItemsRepository
  private readonly updateRequestItemsTopicRepository: UpdateRequestItemsTopicRepository

  constructor (addRequestItemsRepository: AddRequestItemsRepository, updateRequestItemsTopicRepository: UpdateRequestItemsTopicRepository) {
    this.addRequestItemsRepository = addRequestItemsRepository
    this.updateRequestItemsTopicRepository = updateRequestItemsTopicRepository
  }

  async add (requestItemsData: AddRequestItemsModel): Promise<RequestItemsModel> {
    let amountRequest = 0;
    requestItemsData.items.forEach((item) =>{
      amountRequest += item.quantity * item.unitaryValue
    })
    requestItemsData.amountRequest = amountRequest
    const requestItems = await this.addRequestItemsRepository.add(requestItemsData)
    await this.updateRequestItemsTopicRepository.updateItem(requestItems.items)
    return requestItems
  }
}