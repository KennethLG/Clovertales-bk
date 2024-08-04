
const {
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const REGION = "us-east-1";
const tableName = "TasksTable";
const backupTableName = "TasksTableBackup";

const dbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(dbClient);

const scanOriginalTable = async () => {
  const params = {
    TableName: backupTableName,
  };

  const scanResults = await docClient.send(new ScanCommand(params));
  console.log("🚀 ~ createBackup ~ scanResults:", scanResults.Items);

  return scanResults;
};

const createBackup = async () => {
  // scan the original table

  const items = await scanOriginalTable();

  // create the table

  const createTableParams = {
    TableName: backupTableName,
    BillingMode: "PAY_PER_REQUEST", // No need to provision throughput
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S", // 'S' stands for String
      },
      {
        AttributeName: "createdAt",
        AttributeType: "S", // 'S' stands for String
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH", // Partition key
      },
      {
        AttributeName: "createdAt",
        KeyType: "RANGE", // Sort key
      },
    ],
  };

  try {
    const result = await docClient.send(new CreateTableCommand(createTableParams));
    console.log("🚀 ~ createBackup ~ result:", result)
  } catch (error) {
    console.log("🚀 ~ createBackup ~ error:", error)
  }


  // upload the items to the backup table

  for (const item of items.Items) {
    const params = {
      TableName: backupTableName,
      Item: item
    }

    await docClient.send(new PutCommand(params));
    console.log(`Backed up item: ${item.createdAt} ${item.description}`);
  }
};

const updateOriginalTable = async () => {
  
  const items = await scanOriginalTable();
  
  for (const item of items.Items) {
    // update every title to use the FEATURE prefix by default
    const hasPrefix = /^[A-Z]+\(.*\):/.test(item.title) || /^[A-Z]+:/.test(item.title);
    const updatedTitle = hasPrefix ? item.title : `FEATURE: ${item.title}`;
    
    // remove every timing from the description and move them into a new column
    const timingRegex = /\[\d+h\]/;
    let timing = item.description.match(timingRegex);
    let updatedDescription = item.description.replace(timingRegex, '').trim();
    
    // every task without timing should have a [1h] by default
    if (!timing) {
        timing = '[1h]';
    } else {
        timing = timing[0];
    }

    console.log(`item ${item.createdAt} title ${item.title}`);
    console.log(`item ${item.createdAt} has prefix ${hasPrefix}`);
    console.log(`item ${item.createdAt} updatedTitle: ${updatedTitle}`);
    console.log(`item ${item.createdAt} updatedDescription: ${updatedDescription}`);
    console.log(`item ${item.createdAt} timing: ${timing}`);

    const params = {
      TableName: tableName,
      Key: {
        id: item.id,
        createdAt: item.createdAt
      },
      UpdateExpression: 'SET title = :title, description = :desc, timing = :timing',
      ExpressionAttributeValues: {
        ':title': updatedTitle,
        ':desc': updatedDescription,
        ':timing': timing
      },
    };
    let count = 0;
    try {
      await docClient.send(new UpdateCommand(params));
      count++;
      console.log(`item updated successfully ${item.createdAt} ${count}`);
    } catch (error) {
      console.log("🚀 ~ updateOriginalTable ~ error:", error)
      
    }
    console.log('items updated:', count);
  }
}
const parseAndUpdateTitles = async () => {
  const items = await scanOriginalTable();

  for (const item of items.Items) {
    // Extract and clean type and level from title
    const prefixRegex = /^(FEATURE|ENHANCEMENT|BUG|ERROR|WARNING)(\([^\)]+\))?:\s*/;
    const match = item.title.match(prefixRegex);
    let type = '';
    let level = '';
    let cleanedTitle = item.title;

    if (match) {
      type = match[1]; // Captures the prefix like FEATURE, BUG, etc.
      cleanedTitle = item.title.replace(prefixRegex, ''); // Remove the prefix from the title
      
      if (match[2]) { // Captures the optional part like (Snow2)
        level = match[2].slice(1, -1); // Remove the parentheses
        level = level.replace(/\d+$/, ''); // Remove trailing numbers
      }
    }

    // Extract and clean timing from description
    const timingRegex = /\[\d+h\]/;
    const timingMatch = item.description.match(timingRegex);
    let timing = timingMatch ? timingMatch[0] : '[1h]'; // Default to [1h] if no timing found
    let updatedDescription = item.description.replace(timingRegex, '').trim();

    // Update DynamoDB with cleaned data
    const updateParams = {
      TableName: tableName,
      Key: {
        id: item.id,
        createdAt: item.createdAt
      },
      UpdateExpression: 'SET title = :newTitle, description = :newDesc, #type = :type, #level = :level, timing = :timing',
      ExpressionAttributeNames: {
        '#type': 'type',
        '#level': 'level'
      },
      ExpressionAttributeValues: {
        ':newTitle': cleanedTitle,
        ':newDesc': updatedDescription,
        ':type': type || "Unspecified", // Use "Unspecified" if no type was found
        ':level': level || "Unspecified", // Use "Unspecified" if no level was found
        ':timing': timing
      }
    };

    try {
      await docClient.send(new UpdateCommand(updateParams));
      console.log(`Updated item: ${item.createdAt} with new title: ${cleanedTitle}, type: ${type}, level: ${level}, and timing: ${timing}`);
    } catch (error) {
      console.log("Error updating item:", error);
    }
  }
};



// createBackup();
// updateOriginalTable();
parseAndUpdateTitles();