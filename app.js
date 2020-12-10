const sleep = require("http");

/* Prevent Sleep in Heroku Server */
setInterval(function () {
	sleep.get("http://comcigan.herokuapp.com");
}, 600000); // every 10 minutes

function siganKaling(school, grad, clas)
{
const Timetable = require('./cindex.js');
const timetable = new Timetable();
async function test(day, per){
await timetable.init({ });
await timetable.setSchool(school);
var result = await timetable.getTimetable();
var sans = result[grad][clas]
return Promise.resolve(sans);
}
return new Promise(function(resolve, reject){ test().then(function(p){
  var arr = {"월": [], "화": [], "수": [], "목": [], "금": []};
  for(let i=0; i<p.length; i++){
for(let j=0; j<p[i].length; j++){
  p[i][j]["subject"] = p[i][j]["subject"].replace(/주제선택/g, "주선").replace(/1/g, '').replace(/2/g,'').replace(/3/g,'').replace(/기술가정/g, "기가").replace(/진로탐색/g, "진탐").replace(/예술활동/g, "예체").replace(/체육활동/g, "예체")
  switch(i){
    case 0:
     arr["월"][j] = p[i][j]["subject"];
    case 1:
      arr["화"][j] = p[i][j]["subject"];
   case 2:
     arr["수"][j] = p[i][j]["subject"];
   case 3:
     arr["목"][j] = p[i][j]["subject"];
   case 4:
     arr["금"][j] = p[i][j]["subject"];
  }
  }
}
var rus = "http://vz.kro.kr/sigan.php?text="+JSON.stringify(arr);
resolve(rus);
})
});
}


var port = process.env.PORT || 8080;
  const http = require('http');
  http.createServer((req, res) => {
	var url = require('url');
	var queryData = url.parse(req.url, true).query;
	  function qdf(){ 
	  if(queryData.school == null || queryData.school == undefined || queryData.school == ''){ return {"result" : false, "reason": "학교 유효하지 않음 comcigan.herokuapp.com/?school=샌즈중학교&grade=1&class=5 와 같이 입력하세요"}; }
	  else if(queryData.grade == null || queryData.grade == undefined || queryData.grade == ''){ return {"result" : false, "reason": "학년 유효하지 않음 comcigan.herokuapp.com/?school=샌즈중학교&grade=1&class=5 와 같이 입력하세요"};}	  
	  else if(queryData.class == null || queryData.class == undefined || queryData.class == ''){ return {"result" : false, "reason": "반 유효하지 않음 comcigan.herokuapp.com/?school=샌즈중학교&grade=1&class=5 와 같이 입력하세요"}; }
	  else { return {"result" : true, "reason": "통과"}; }
	  }		  
	if(!qdf().result){
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.write("<!DOCTYPE html>\n");
	res.write("<html>\n");
	res.write("<head>\n");
	res.write('<meta charset = "utf-8">\n');
	res.write("</head>\n");
	res.write("<body>\n");
	res.write('<div>\n');
	res.write('<h1>404!</h1>\n');
	res.write('<h2>'+qdf().reason+'</h2>\n');
	res.write('</div>\n');
	res.write("</body>\n");
	res.write("</html>\n");
	res.end();
	}
	if(qdf().result){
	siganKaling(queryData.school, Number(queryData.grade), Number(queryData.class))
	.then(function(x){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<html><head><meta name="viewport" content="width=device-width, minimum-scale=0.1"><meta charset="utf-8"></head><body style="margin: 0px; background: #0e0e0e;"><img style="-webkit-user-select: none;margin: auto;" src=\''+x+'\'></body></html>');

/*
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<!DOCTYPE html>\n");
	res.write("<html>\n");
	res.write("<head>\n");
	res.write('<meta charset = "utf-8">\n');
	res.write("</head>\n");
	res.write("<body>\n");
	res.write(x+'\n');
	res.write("</body>\n");
	res.write("</html>\n");
*/
    res.end();
  })
}
  }).listen(port, "0.0.0.0");
console.log('Server running 0.0.0.0');
console.log("success");

