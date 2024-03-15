"use server";
import clientPromise from "@lib/mongodb";
import { ObjectId } from "mongodb";

export async function getCollectionData(collectionName: string, limit?: number, sort?: any) {
  try {
    const client = await clientPromise;
    const collectionData = client.db().collection(collectionName);
    let query = collectionData.find();

    if (sort) {
      query = query.sort(sort);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const links = await query.toArray();
    const linksWithStringId: any[] = links.map((link) => ({
      ...link,
      _id: link._id.toString(),
    }));
    return linksWithStringId;
  } catch (e) {
    console.log("failed for mongodb", e);
  }
}
export async function createDocument(collectionName: string, document: any) {
  const client = await clientPromise;
  const collection = client.db().collection(collectionName);
  const result = await collection.insertOne(document);
  return result.insertedId.toString();
}

export async function readDocument(collectionName: string, id: string) {
  const client = await clientPromise;
  const collection = client.db().collection(collectionName);
  const document: any = await collection.findOne({ _id: new ObjectId(id) });
  if(document){
        const { _id, ...rest } = document;
        return {_id: id, ...rest};
  }else{
  return null;
  }
}

export async function updateDocument(collectionName: string, id: string, document: any) {
  try{
  const client = await clientPromise;
  const collection = client.db().collection(collectionName);
  console.log("trying to udpate")
        const { _id, ...update } = document;

  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
  return result.modifiedCount;
  }catch(e){
    console.log("failed at update", e)
  }
}

export async function deleteDocument(collectionName: string, id: string) {
  const client = await clientPromise;
  const collection = client.db().collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}