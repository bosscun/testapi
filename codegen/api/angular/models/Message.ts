/* tslint:disable */
import {
  Conversation
} from '../index';

declare var Object: any;
export interface MessageInterface {
  "content"?: string;
  "status"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "conversationId"?: number;
  conversation?: Conversation;
}

export class Message implements MessageInterface {
  "content": string;
  "status": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "conversationId": number;
  conversation: Conversation;
  constructor(data?: MessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Message for dynamic purposes.
  **/
  public static factory(data: MessageInterface): Message{
    return new Message(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Message',
      plural: 'Messages',
      path: 'Messages',
      idName: 'id',
      properties: {
        "content": {
          name: 'content',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "conversationId": {
          name: 'conversationId',
          type: 'number'
        },
      },
      relations: {
        conversation: {
          name: 'conversation',
          type: 'Conversation',
          model: 'Conversation',
          relationType: 'belongsTo',
                  keyFrom: 'conversationId',
          keyTo: 'id'
        },
      }
    }
  }
}
