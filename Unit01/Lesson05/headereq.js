// Start listening on port 3000
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);

//Prints request’s header data into 
const getJSONString = obj => {
return JSON.stringify(obj, null, 2);
};