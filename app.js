//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose=require("mongoose");

const app = express();

const todos=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Making New Dtabase named totlistDB and Connection it to localhost:27017
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

//Schema for items
const itemsSchema=new mongoose.Schema({
  name:String
});

//Model
const Item=mongoose.model("Item",itemsSchema); 




app.get("/", function(req, res) {

  Item.find({} , function(err,result){

    if(!err)
      res.render("list", {listTitle: "Today", newListItems:result });
    
  });


  

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item=new Item({
    name:itemName
  });
  item.save();
  res.redirect("/");



 
});

app.post("/delete",function(req,res){
  
  Item.findByIdAndRemove(req.body.checkbox,function(err){
    if(err){

      console.log("Error in delete route");
    }
    else{
      console.log("Successfull!");
    }
  });

  res.redirect("/");
})


app.get("/:paramName",function(req,res){
  res.send(req.params.paramName);
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
