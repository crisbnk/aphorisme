import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "aphorisms",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'aphorismId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      aphorismId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: `SET quote = :quote,
                           author = :author,
                           tags = :tags,
                           lang = :lang,
                           attachment = :attachment`,
    ExpressionAttributeValues: {
      ":quote": data.quote ? data.quote : null,
      ":author": data.author ? data.author : null,
      ":tags": data.tags ? data.tags : null,
      ":lang": data.lang ? data.lang : null,
      ":attachment": data.attachment ? data.attachment : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
