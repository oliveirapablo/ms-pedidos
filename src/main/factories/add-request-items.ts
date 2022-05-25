import { AddRequestItemsController } from '../../presentation/controller/request-items/add-request-items'
import { DbAddRequestItems } from '../../data/usecases/add-request-items/db-add-request-items'
import { RequestItemsMongoRepository } from '../../infra/db/mongodb/request-items-repository/add-request-items'
import { UpdateItemsTopicRepository } from '../../infra/topic/kafka/update-items/update-items-topic'

export const makeAddRequestItems = (): AddRequestItemsController => {
  const itemMongoRepository = new RequestItemsMongoRepository()
  const updateItemsTopicRepository = new UpdateItemsTopicRepository()
  const addRequestItems = new DbAddRequestItems(itemMongoRepository, updateItemsTopicRepository)
  return new AddRequestItemsController(addRequestItems)
}
