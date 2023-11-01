import {
    GetCommand,
} from "@aws-sdk/lib-dynamodb"

export default async (docClient, tableName, id) => {
    const command = new GetCommand({
        TableName: tableName,
        Key: {
            FeedbackID: id
        }
    })
    const response = await docClient.send(command)
    return response.Item
}
