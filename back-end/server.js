const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const log4js = require('log4js')

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// logger
log4js.configure({
    appenders: { 
        fileAppender: { type: 'file', filename: './logs/server.log' },
        console: { type: 'console' } 
    },
    categories: { 
        default: { appenders: ['fileAppender', 'console'], level: 'error' } 
    }
});
const logger = log4js.getLogger()
logger.level = 'info';

// database
var options = {
    user: process.env.db_user,
    pwd: process.env.db_pwd,
    host: process.env.host,
    port: process.env.port,
    dbName: process.env.db_name,
    appPort: process.env.app_port
};
mongoose.connect(`mongodb://${options.user}:${options.pwd}@${options.host}:${options.port}/${options.dbName}`, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    logger.info(`MongoDB database connection established successfully`)
});

// app 
app.listen(options.appPort, ()=>{
    logger.info(`Server is running on port ${options.appPort}`)
});

// server
let item = require('./grocery.model');
const route = express.Router();
app.use('/app', route);

// add new item 
route.route('/item/add').post((req,res)=>{
    let items = new item(req.body);
    items.save()
        .then(items=>{
            res.status(200).json({'Item': 'Successfully added'});
        })
        .catch(err=>{
            res.status(400).send('Adding new item failed');
            logger.error(err);
        })
})

// retrieve item
route.route('/item').get((req, res)=>{
    item.find((err, items)=>{
        if(err){
            logger.error(err);
        }else{
            res.json(items);
        }
    })
    .sort({ProductName: 1});
});

route.route('/item/:name').get((req, res)=>{
    let name = req.params.name;
    item.find(
        {
            $or: [
                {Brand: new RegExp('^' + name, "i")}, 
                {ProductName: new RegExp('^' + name, "i")}
            ]
        },
        {'_id': 1, 'UPC12Barcode': 1, 'Brand': 1, 'ProductName': 1},
        (err, items)=>{
            res.json(items);
        }
    );
})

// get item based in id
route.route('/edit/:id').get((req, res)=>{
    let id = req.params.id;
    item.findById(id, (err, items)=>{
        res.json(items);
    });
});

// edit item
route.route('/item/update/:id').post((req, res)=>{
    item.findById(req.params.id, (err, items)=>{
        if(!items){
            res.status(404).send("Data is not found");
        }else{
            items.UPC12Barcode = req.body.UPC12Barcode;
            items.Brand = req.body.Brand;
            items.ProductName = req.body.ProductName;

            items.save().then(items =>{
                res.json('Item updated!');
            })
            .catch(err =>{
                res.status(400).send('Update not possible');
                logger.error(err);
            });
        };
    });
});
