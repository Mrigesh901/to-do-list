const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var itemlist=[];
var workitemlist=[];

app.get('/', function(req, res){
    var options = {weekday : 'long', year: 'numeric', month:'long'}
    let today = new Date().toLocaleDateString('en-us',options)
    res.render('tempelate',{listTitle:today, itemlist:itemlist})
});


app.get('/work', function(req, res){
    res.render('tempelate',{listTitle:"Worklist", itemlist:workitemlist});
});

app.get("/about", function(req, res){
    res.render("about")
})


app.post('/', function(req, res){
    let item = req.body.additem;
    if(req.body.listtype =="Worklist"){
        workitemlist.push(item);
        res.redirect('/work')
    }
    else{
    itemlist.push(item);
    res.redirect('/')
    }
})


app.listen(3000,function(){
    console.log("server is running on port 3000");
})