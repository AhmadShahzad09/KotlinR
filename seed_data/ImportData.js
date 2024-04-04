const { MongoClient } = require('mongodb');
const fs = require('fs');

// Connection URL for the MongoDB Atlas cluster
const url = 'mongodb+srv://mudasir:test123.@cluster0.ncuntvn.mongodb.net/?retryWrites=true&w=majority';

// Database name
const dbName = 'fingenius'; // Change this to your destination database name

// Path to the JSON file you want to import
const jsonFilePath = 'fingenius.invoices.json'; // Change this to the path of your JSON file

// Name of the collection in the destination database
const collectionName = 'mudasir'; // Change this to the destination collection name

// Read the JSON file
const jsonContent = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

async function importCollection() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the JSON data into the collection
    const result = await collection.insertMany(jsonContent);
    console.log(`Imported ${result.insertedCount} documents into ${collectionName} in ${dbName}`);
  } catch (err) {
    console.error('Error importing data:', err);
  } finally {
    client.close();
  }
}

importCollection();
