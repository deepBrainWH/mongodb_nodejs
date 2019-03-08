var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

function f1() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database has already connected!");
        var dbase = db.db("myblogs");
        var articaleInfo = {};
        articaleInfo.articleName = "MongoDB Introduction";
        articaleInfo.authorName = "Sunil G";
        articaleInfo.tags = ["database", "NoSQL", "DBA", "DEV"];
        dbase.collection("articles").save(articaleInfo, function (err, res) {
            if (err) throw err;
            console.log("save successful!");
            db.close();
        });
    });
}

function f2() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbase = db.db("review");
        var doc1 = {
            name: "Invisibility", vendor: "Kettlecooked",
            price: 10.99, score: 59, tryDate: new Date(),
            ingredients: ["new toes", 42, "laughter"],
            ratings: {strength: 2, flavor: 5}
        };
        var doc2 = {
            name: "Love", vendor: "Brewers",
            price: 3.99, score: 63, tryDate: new Date(),
            ingredients: ["apple", "orange", "banana"],
            ratings: {strength: 4, flavor: 6}
        };
        var doc3 = {
            name: "Shrinking", vendor: "Kettlecooked",
            price: 15.99, score: 50, tryDate: new Date(),
            ingredients: ["watermelon", 52, "grape"],
            ratings: {strength: 7, flavor: 8}
        };

        var docs = [doc1, doc2, doc3];
        var x = 0;
        for (var i = 0; i < 3; i++) {
            dbase.collection("potions").insertOne(docs[i], function (err, res) {
                if (err) throw err;
                console.log("insert successful!" + "doc" + ++x);
            });
        }
        db.close();
    });
}

function f3() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbase = db.db("bookstore");
        var doc1 = {book_id: "1298747", title: "Mother Night", author: "Kurt Vonnegut"};
        var doc2 = {book_id: "639397", title: "Science and the Modern World", author: "Alfred North Whitehead"};
        var doc3 = {book_id: "1456701", title: "Foundation and Empire", author: "Isaac Asimov"};
        dbase.collection("books").insertMany([doc1, doc2, doc3], function (err, res) {
            if (err) throw err;
            console.log("Insert successful!");
        });
        db.close();
    });
}

function f4() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("bookstore");
        dbase.collection("books").find({author: "Kurt Vonnegut"}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
        });
        db.close();
    });
}

function f5() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if(err) throw err;
        var dbase = db.db("bookstore");
        dbase.collection("books").deleteOne({book_id:639397},
            {}, function (err, res) {
            if(err) throw err;
            console.log("delete one record successful!");
            db.close();
        });
    });
}

function f6() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if(err) throw err;
        var dbase = db.db("bookstore");
        dbase.collection("books").updateOne({book_id:"1298747"},
            {$set:{quantity: 15}}, function (err, res) {
            if(err) throw err;
            console.log("update 1 record!");
            db.close();
        });
    });
}

// f1();
// f2();
// f3();
// f4();
// f5();
f6();