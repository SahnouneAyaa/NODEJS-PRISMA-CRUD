const express=require('express')
const app= express()
const {prismaClient}= require("@prisma/client")


const prisma = new prismaClient()
app.use(express.json)

app.get("/",async(req,res,next)=>{
    const allUsers=await prisma.user.findMany();
    res.json(allUsers)
})

app.post("/",async(req,res,next)=>{  
    const newUser=await prisma.user.create({data:req.body});
    res.json(newUser)
})

app.put("/:id",async(req,res,next)=>{  
    const id = req.params.id
    const age= req.body.age
    const updatedUser=await prisma.user.update({where : {id:parseInt(id)}, data : {age:age}});
    res.json(updatedUser)
})

app.delete("/:id",async(req,res,next)=>{  
    const id = req.params.id
    const deletedUser=await prisma.user.delete({where : {id:parseInt(id)}});
    res.json(deletedUser)
})




app.post("/house",async(req,res,next)=>{  
    const newHouse=await prisma.house.create({data:req.body});
    res.json(newHouse)
})

app.get("/house",async(req,res,next)=>{
    const allHouses=await prisma.house.findMany({
        include:
        {owner:true,
        builder:true,}
    });
    res.json(allHouses)
})


app.get("/house/:id",async(req,res,next)=>{
    const id= req.params.id;
    const house=await prisma.house.findUnique({
        where:{
            id:id,
        },
        include:
        {owner:true,
        builder:true,}
    });
    res.json(allHouses)
})


app.get("/house/withFilters",async(req,res,next)=>{
    const filteredHouses=await prisma.house.findMany({
        where:{
            wifiPassword: {
                not:null,
            },
            owner: {
                age:{
                    gte:22,
                },
            },
            orderBy:[
                {
                    owner:{
                        firstName: desc,
                    },
                },
            ]
        },
        include:
        {owner:true,
        builder:true,}
    });
    res.json(allHouses)
})







app.listen(3000, ()=>{
    console.log('server is listining')
})