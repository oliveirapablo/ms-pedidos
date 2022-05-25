import { UpdateRequestItemsTopicRepository } from '../../../../data/protocols/update-items-topic-repository'
import { ItemsModel} from '../../../../presentation/protocols'
import { KafkaHelper } from '../helpers/kafka-helper'
import env from '../../../../main/config/env'

export class UpdateItemsTopicRepository implements UpdateRequestItemsTopicRepository {
  async updateItem (items: ItemsModel[]): Promise<void> {
    await KafkaHelper.producerUpdateItem(env.kafkaConfig.topics.updateItem, items)    
  }
}