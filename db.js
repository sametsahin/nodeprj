import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: 'nodeprj',
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        //console.log('Connected to the DB')
    }).catch((err) => {
        console.log(`doesnt connected to db: ${err}`);
    })
}

export default conn