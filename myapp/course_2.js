var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

function f1() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
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
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
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
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
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
        if (err) throw err;
        var dbase = db.db("bookstore");
        dbase.collection("books").deleteOne({book_id: 639397},
            {}, function (err, res) {
                if (err) throw err;
                console.log("delete one record successful!");
                db.close();
            });
    });
}

function f6() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("bookstore");
        dbase.collection("books").updateOne({book_id: "1298747"},
            {$set: {quantity: 15}}, function (err, res) {
                if (err) throw err;
                console.log("update 1 record!");
                db.close();
            });
    });
}

function f7() {
    let mongoClientPromise = MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if(err) throw err;
        var dbase = db.db("mydb");
        var docs = [
            {"id": "00000001", "firstName": "Juan", "surname" : "Larko", "gender" : "M", "address1" : "646 West Beach Road", "address2" : "Apartment 818", "city" : "Kleinfeltersville", "state_region" : "Pennsylvania", "county_province" : "Lebanon", "postalCode" : "17039", "country" : "US", "acct_balance" : 285.6, "status" : "F" },
            {"id" : "00000002", "firstName" : "Hassie", "surname" : "Cherrie", "gender" : "F", "address1" : "974 Slow Glade Street", "address2" : "Apartment 77", "city" : "Saltburn-by-the-Sea", "state_region" : "England", "county_province" : "Redcar and Cleveland", "postalCode" : "TS12", "country" : "GB", "acct_balance" : 837.38, "status" : "A" },
            {"id" : "00000003", "firstName" : "Donovan", "surname" : "Heckard", "gender" : "M", "address1" : "9 South Breeze Way", "address2" : "Flat 509", "city" : "Praia da Leirosa", "state_region" : "Coimbra", "county_province" : "Ribeira Grande", "postalCode" : "3090-484", "country" : "PT", "acct_balance" : 194.06, "status" : "F" },
            {"id" : "00000004", "firstName" : "Gemma", "surname" : "Farrin", "gender" : "F", "address1" : "870 Happy Snow Way", "address2" : "", "city" : "Sant'Ilario Ligure", "state_region" : "Liguria", "county_province" : "Genova", "postalCode" : "16167", "country" : "IT", "acct_balance" : 2337.84, "status" : "AAA" },
            { "id" : "00000005", "firstName" : "Susann", "surname" : "Ulisch", "gender" : "F", "address1" : "578 Hearty Glade Way", "address2" : "", "city" : "Jahanabad Kutchery", "state_region" : "Bihar", "county_province" : "Jahanabad", "postalCode" : "804408", "country" : "IN", "acct_balance" : 238897.45, "status" : "C" },
            { "id" : "00000006", "firstName" : "Hollis", "surname" : "Toncrey", "gender" : "M", "address1" : "123 Fast Rain Street", "address2" : "", "city" : "Cortegaça", "state_region" : "Aveiro", "county_province" : "São João da Pesqueira", "postalCode" : "3885-339", "country" : "PT", "acct_balance" : 82.11, "status" : "C" },
            { "id" : "00000007", "firstName" : "Quinn", "surname" : "Raynolds", "gender" : "M", "address1" : "276 Gentle Hollow Circle", "address2" : "Flat 566", "city" : "Holt", "state_region" : "England", "county_province" : "Wiltshire", "postalCode" : "BA14", "country" : "GB", "acct_balance" : 925.4, "status" : "AAA" },
            { "id" : "00000008", "firstName" : "Nolan", "surname" : "Selissen", "gender" : "M", "address1" : "457 South Snow Street", "address2" : "", "city" : "Willmenrod", "state_region" : "Rheinland-Pfalz", "county_province" : "", "postalCode" : "56459", "country" : "DE", "acct_balance" : 402.34, "status" : "C" },
            { "id" : "00000009", "firstName" : "Tomas", "surname" : "Sunier", "gender" : "M", "address1" : "124 Happy Breeze Drive", "address2" : "Unit 388", "city" : "Bad Berleburg Elsoff", "state_region" : "Nordrhein-Westfalen", "county_province" : "Reg.-Bez. Arnsberg", "postalCode" : "57319", "country" : "DE", "acct_balance" : 4851.82, "status" : "A" },
            { "id" : "00000010", "firstName" : "Scottie", "surname" : "Bertelle", "gender" : "M", "address1" : "763 Happy Mountain Street", "address2" : "Apartment 948", "city" : "Lisboa", "state_region" : "Lisboa", "county_province" : "Vila Franca do Campo", "postalCode" : "1300-605", "country" : "PT", "acct_balance" : 54772.64, "status" : "AAA" }
        ]
        dbase.collection("customers").insertMany(docs,{}, function (err, res) {
            if(err) throw err;
            console.log("insert successful!");
        });
        db.close();
    });
}

// f1();
// f2();
// f3();
// f4();
// f5();
// f6();
f7();