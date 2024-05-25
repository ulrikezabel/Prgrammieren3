var express = require("Express");
var app = express();

app.use(express.static("prj2"));

app.get("/", function(req, res){
   res.redirect("index.html");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});