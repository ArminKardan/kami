const { Console } = require("console")
const fs = require("fs")
let file = fs.readFileSync("data.txt", "utf-8")
let lines = file.split("\n")
let c1 = []
let c2 = []

const dateParse = (dateString)=>{
  

var dateParser = /(\d{2})\/(\d{2})\/(\d{4})/;
var match = dateString.match(dateParser);

    return new Date(
        match[3],  // year
        match[2]-1,  // monthIndex
        match[1],  // day
    );
}

for(let line of lines)
{
    try
    {
        c1.push(
        {
            Date: dateParse(line.split("\t\t").join("\t").split("\t")[0]),
            Data: line.split("\t\t").join("\t").split("\t")[1]
        })
        var d = line.split("\t\t").join("\t").split("\t")[3];
       c2.push(
        {
            Date: dateParse(line.split("\t\t").join("\t").split("\t")[2]),
            Data:d?d.trim():""
        });
    }
    catch{}
}


let c3 = [];

for(let v of c1)
{
    c3.push({
        Date:v.Date,
    })
}

for(let v of c2)
{
    if(c3.filter(a => a.Date == v.Date).length == 0)
    {
        c3.push({
            Date:v.Date,
        })
    }
}

for(let v of c3)
{
    cc1 = c1.filter(a=> a.Date == v.Date);
    if(cc1.length > 0)
    {
        v["Data1"] = cc1[0].Data
    }

    cc2 = c2.filter(a=> a.Date == v.Date);
    if(cc2.length > 0)
    {
        v["Data2"] = cc2[0].Data
    }
}

c3 = c3.sort((a,b)=> a.Date - b.Date)

c3 = c3.map(x=>
    {
        x.Date = x.Date.toLocaleDateString('en-GB');
        return x;
    })



var c4 = []
for(var el of c3)
{
    var els = c3.filter(x=> x.Date == el.Date);

    var data1 = null;
    var data2 = null;
    for(e of els)
    {
        if(e.Data1)
        {
            data1 = e.Data1
        }
        if(e.Data2)
        {
            data2 = e.Data2
        }
    }


    if(els.length > 1)
    {
        if(c4.filter(x=> x.Date == el.Date).length == 0)
        {
            c4.push({
                Date: els[0].Date,
                Data1: data1,
                Data2: data2
            })
        }
    }
}



let output = "";

for(let line of c3)
{
    output+= line.Date+ "\t"+ (line.Data1?line.Data1:null)+"\t"+(line.Data2?line.Data2:null)+"\n"
}

fs.writeFileSync("sorted.txt",output)
fs.writeFileSync("sorted.json",JSON.stringify(c3,0 , 4))

output = "";

for(let line of c4)
{
    if(line.Data1 && line.Data2)
        output+= line.Date+ "\t"+ (line.Data1?line.Data1:null)+"\t"+(line.Data2?line.Data2:null)+"\n"
}

fs.writeFileSync("sorted-main.txt",output)
fs.writeFileSync("sorted-main.json",JSON.stringify(c4,0 , 4))

