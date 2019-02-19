exports = async function(changeEvent) {
  var doc = changeEvent.fullDocument;
  var conn = context.services.get("mongodb-atlas").db("blog").collection("blog");
  
  const aws = context.services.get('aws');
  const httpService = context.services.get("http");

  var args = {"url":doc.HeroPath, "headers": {"Content-Type":["image/jpeg"]}};
  var req = httpService.get(args);
  var img = await req;
  
  try {
    var awsreq = aws.rekognition().DetectLabels({"Image": {"Bytes":img.body}});
    var res = await awsreq;
    conn.updateOne({_id:doc._id},{$set: {rek: res}});
  } catch (error) {
    console.log(JSON.stringify(error));
  }

    
};
