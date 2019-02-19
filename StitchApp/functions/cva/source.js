exports = async function(changeEvent) {
  var doc = changeEvent.fullDocument;
  var conn = context.services.get("mongodb-atlas").db("blog").collection("blog");
  const httpService = context.services.get("http");
  
  var uri = "https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags&language=en";
  var data = {"url":doc.HeroPath};
  
  var args = {"url":uri, "headers": {"Content-Type":["application/json"] , "Ocp-Apim-Subscription-Key":[context.values.get("cvaAccessKey")]}, "body":data, "encodeBodyAsJSON":true};
  
  var cvaresult = httpService.post(args, {"encodeBodyAsJSON":true});
  
  var res = await cvaresult;
  
  conn.updateOne({_id:doc._id},{$set: {cva: JSON.parse(res.body.text()), trigger:data.url}});
};