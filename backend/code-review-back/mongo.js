const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://testUser:testPassword@cluster0.xlakm.mongodb.net/testDatabase?retryWrites=true&w=majority"

const createProducts = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };
    const client = new MongoClient(url);

    try{
        await client.connect();
        const db = client.db();
        const result = db.collection("products").insertOne(newProduct);
    } catch (error){
        return res.join({message: "Could not store data."});
    };
    client.close;

    res.json(newProduct);
};

const getProducts = async (req, res, next) => {

};

exports.createProducts = createProducts;
exports.getProducts = getProducts;