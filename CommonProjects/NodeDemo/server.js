const http = require("http");
const fs = require("fs")
// const myserver=http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type': 'text/html'})
//     var myurl= request.url;

//     if(myurl=="/?id=1"){
//         response.write("<img src='https://cdn.britannica.com/36/162636-050-932C5D49/Colosseum-Rome-Italy.jpg?q=60' >")
//     }
//     else if(myurl=="/?id=2"){
//         response.write("<img src='https://cdn.britannica.com/82/94382-050-20CF23DB/Great-Wall-of-China-Beijing.jpg?q=60' >")
//     }
//     else if(myurl=="/?id=3"){
//         response.write("<img src='https://cdn.britannica.com/49/61349-050-9FFBEB28/El-Castillo-pyramid-plaza-Toltec-state-Yucatan.jpg?q=60' >")
//     }else if(myurl=="/?id=4"){
//         response.write("<img src='https://cdn.britannica.com/25/153525-050-FC43840D/Khaznah-Petra-Jordan.jpg?q=60' >")
//     }else if(myurl=="/?id=5"){
//         response.write("<img src='https://cdn.britannica.com/30/94530-050-99493FEA/Machu-Picchu.jpg?q=60' >")
//     }else if(myurl=="/?id=6"){
//         response.write("<img src='https://cdn.britannica.com/54/150754-050-5B93A950/statue-Christ-the-Redeemer-Rio-de-Janeiro.jpg?q=60' >")
//     }else if(myurl=="/?id=7"){
//         response.write("<img src='https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg?q=60' >")
//     }
//     else if(myurl=="/home"){
//         const c= fs.readFileSync("./assignment1.html")
//         response.write(c)
//     }
//     else{
//         const d= fs.readFileSync("./code.html")
//         response.write(d)
//     }
    
//     response.end();
// })

// myserver.listen(4000);

// myserver.on("connection", (result)=>{
//     console.log("Connection Established")
// })



const myserver=http.createServer((request,response)=>{
response.writeHead(200, { 'Content-Type': 'text/html' })

var myurl = request.url;
//response.write("<h2>SERVER WORKED</h2><p>"+myurl+"</p>")
if (myurl === "/form1") {
    const form1 = fs.readFileSync("./assignment1.html")
    response.write(form1)
}
else if (myurl === "/form2") {
    const form2 = fs.readFileSync("./code.html")
    response.write(form2)
}
else if (myurl === "/register") {
    response.write("Registration Done!")
}
else {
    response.write("<h2>SERVER WORKED</h2><p>"+myurl+"</p>")
}

response.end();
})

myserver.listen(5000)

myserver.on("connection", (result) => {
console.log("Connection Established")
//console.log(result)
}) 