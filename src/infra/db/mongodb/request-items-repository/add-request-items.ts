import { AddRequestItemsRepository } from '../../../../data/protocols/add-request-items-repository'
import { AddRequestItemsModel, RequestItemsModel } from '../../../../presentation/protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class RequestItemsMongoRepository implements AddRequestItemsRepository {
  async add (requestItemData: AddRequestItemsModel): Promise<RequestItemsModel> {
    const requestItemsCollection = await MongoHelper.getCollection('requestItems')
    const lastUpdate = new Date();
    const result = await requestItemsCollection.insertOne({
      ...requestItemData,
      lastUpdate,
    })
    return MongoHelper.map({ ...requestItemData, lastUpdate, _id: result.insertedId })
  }
}