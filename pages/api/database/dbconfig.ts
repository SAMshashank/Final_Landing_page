const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/oxy_book?directConnection=true&tls=false&readPreference=primary";
const mongoURI="mongodb+srv://shashankkushwaha123:123Abc@cluster0.cxggrrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectToMongoose=()=>{
  mongoose.set("strictQuery", false);
  mongoose.connect(mongoURI);
}

export default connectToMongoose;


