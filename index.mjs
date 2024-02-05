import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const identityClient = new CognitoIdentityClient({});

const cognitoIdentityCredentials = fromCognitoIdentityPool({
    identityPoolId: "us-east-1_4BlqjswTT", // Replace with your Cognito Identity Pool ID
    client: identityClient,
});

const dynamo = DynamoDBDocumentClient.from(
    client,
    { credentials: cognitoIdentityCredentials }
);

const tableName = "rest_crud";

export const handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        // Check for Cognito user authentication
        if (!event.requestContext.authorizer) {
            throw new Error("User not authenticated");
        }

        switch (event.routeKey) {
            case "DELETE /items/{id}":
                await dynamo.send(
                    new DeleteCommand({
                        TableName: tableName,
                        Key: {
                            id: event.pathParameters.id,
                        },
                    })
                );
                body = `Deleted item ${event.pathParameters.id}`;
                break;
            case "GET /items/{id}":
                body = await dynamo.send(
                    new GetCommand({
                        TableName: tableName,
                        Key: {
                            id: event.pathParameters.id,
                        },
                    })
                );
                body = body.Item;
                break;
            case "GET /items":
                body = await dynamo.send(
                    new ScanCommand({ TableName: tableName })
                );
                body = body.Items;
                break;
            case "PUT /items":
                // Validate that the user is authenticated before allowing the PUT operation
                if (!event.requestContext.authorizer) {
                    throw new Error("User not authenticated");
                }

                let requestJSON = JSON.parse(event.body);
                await dynamo.send(
                    new PutCommand({
                        TableName: tableName,
                        Item: {
                            id: requestJSON.id,
                            price: requestJSON.price,
                            name: requestJSON.name,
                        },
                    })
                );
                body = `Put item ${requestJSON.id}`;
                break;
        }
    } catch (err) {
        statusCode = 401; // Unauthorized
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
