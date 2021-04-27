var mongoose = require('mongoose');
const fs = require('fs');
var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];

mongoose.connect(
    "mongodb://covidresources:covid123@docdb-2021-04-26-21-34-30.cluster-cuivcovqmdjv.ap-south-1.docdb.amazonaws.com:27017/coviddb_v3?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false", 
    {  sslValidate: true,
        sslCA:ca,
        useNewUrlParser: true
    }
);