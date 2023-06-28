const express =require ('express');
const mongoose=require('mongoose');
const TaskSchema =require('./model');
const cors=require('cors');

const app=express();
app.use(express.json())
app.use(cors({
    origin:'*'
}));
mongoose.connect('mongodb+srv://sanjay:sanjay@cluster0.fjcbkym.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>
    {
        console.log('DB connected');
    }
)

app.post('/addtasks',async(req,res)=>
{
    const {todo}=req.body;
    try{
         const newData= new TaskSchema({todo:todo})
         await newData.save();
         return res.json(await TaskSchema.find());
    }
    catch(err)
    {
        console.log(err.message);
    }
})
app.get('/getalltasks',async(req,res)=>
{
    try{
        const AllData=await TaskSchema.find();
         return res.json(AllData);
    }
    catch(err)
    {
        console.log(err.message);
    }
})
app.get('/gettask/:id',async(req,res)=>
{
    try{
        const Data=await TaskSchema.findById(req.params.id);
         return res.json(Data);
    }
    catch(err)
    {
        console.log(err.message);
    }
})

app.delete('/deletetask/:id',async(req,res)=>
{
    try{
        const delData=await TaskSchema.findByIdAndDelete(req.params.id);
         return res.json(await TaskSchema.find());
    }
    catch(err)
    {
        console.log(err.message);
    }
})

app.get('/',(req,res)=>
{
    res.send("<h1>Sanjay</h1>");
    res.end();
});
app.listen(5000,(req,res)=>
{
    console.log("sever is running");
})