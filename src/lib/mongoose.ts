import mongoose, { Mongoose } from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Missing MONGODB_URI");
}
const MONGODB_URI: string = uri;

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const globalCache: MongooseCache = global._mongooseCache || {
  conn: null,
  promise: null,
};

export async function dbConnect(): Promise<Mongoose> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "byteToolsDb",
    });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}

global._mongooseCache = globalCache;
