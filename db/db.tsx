import { MongoClient } from 'mongodb'

export default function getClient() {
    return new MongoClient(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zwaeg.mongodb.net/next-survey?retryWrites=true&w=majority`)
}