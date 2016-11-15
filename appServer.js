/* ================Node JS - WebSocket Chat Server (Without using Express Framework) ================== */

var websocketServer = require('websocket').server;

var port = (process.env.PORT || 3000); // This is for deploying application to Heroku

var http = require('http'),
    fs = require('fs'),
	url = require('url');

var server = http.createServer(function (request, response) {
	
	var pathname = url.parse(request.url).pathname;
	var dotoffset = request.url.lastIndexOf('.');
	var fileExtension = request.url.substr(dotoffset);
	
	if(pathname === '/')
	   getResponsePage('index.html', dotoffset, fileExtension, response);	   
    
    else if (pathname === '/about.html')
	    getResponsePage('/views/about.html', dotoffset, fileExtension, response);
	
    else 
		getResponsePage(pathname, dotoffset, fileExtension, response);
});  

server.listen(port, function() {
console.log((new Date()) + ' Server is listening on port : '+port);
});

var wsServer = new websocketServer({httpServer: server});
 
// listening request event
wsServer.on('request', function(request) {
 var connection = request.accept('echo-protocol', request.origin);
 console.log('Connection created at : ', new Date());
 
	 // listening message receiving event by client
	 connection.on('message', function(message) {
	 if (message.type === 'utf8') {
	 console.log('Received Message: ' + message.utf8Data);
	 var msg = message.utf8Data;
	 var reversestr = reverse(msg);
	// Sending message to client
	 connection.sendUTF(reversestr);
	 }
	 else if (message.type === 'binary') {
	 console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
	 
	 // Sending message to client in binary form
	 connection.sendBytes(message.binaryData);
	 }
	 });
 
	 // listening for connection close event
	 connection.on('close', function(reasonCode, description) {
	 console.log('Peer ' + connection.remoteAddress + ' disconnected at : ', new Date());
	 });
	 
	 // listening for connection error event
	 connection.on('error', function(reasonCode, description) {
	 console.log('Error Occured: ');
	 });
	 
	 // listening for connection handshake event
	 connection.on('handshake', function(reasonCode, description) {
	 console.log('Handshake Success ');
	 });

 }); 
 
/* String reverse */
 
 function reverse(msg){
	 return msg.split("").reverse().join("");;
 }
 
 /* Get mimeType */
 
 function getMimeType(dotoffset, fileExtension){
	
	var mimetype;
			
	if((dotoffset == -1) || (fileExtension == ".html"))
		mimetype = "text/html";
		   
	else if(fileExtension == ".css")
		mimetype = "text/css";
	if(fileExtension == ".ico")
		mimetype = "image/x-icon";
	if(fileExtension == ".jpg")
		mimetype = "image/jpeg";
	if(fileExtension == ".png")
		mimetype = "image/png";
	if(fileExtension == ".gif")
		mimetype = "image/gif";
	if(fileExtension == ".js")
		mimetype = "text/javascript";
	
	return mimetype;
}

/* Print response page */

function getResponsePage(pathname, dotoffset, fileExtension, response){
	fs.readFile('./'+pathname, function(err, data) {
			if(err){
			   var mimetype = getMimeType(dotoffset, fileExtension);								
			   console.log("Error Occured : "+err);
			   response.writeHead(404, mimetype);
               response.end('Page not found\n');			
			   }
			if (!err) {		            
			  var mimetype = getMimeType(dotoffset, fileExtension);								
			  response.writeHead(200, mimetype);
			  response.end(data, 'utf-8');
			}
		});
}