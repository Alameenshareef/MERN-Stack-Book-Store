import express from "express"
import { Book } from "../model/bookModel.js"
const router = express.Router()


// Route for save a new book

router.post("/", async (req,res)=>{
    try {
       if(
        !req.body.title ||
        !req.body.author || 
        !req.body.publishYear
       ) {
        return res.status(400).send({message: "send all required fields: title,author,publishYear"})
       }
       const newBook ={
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
       }
       const book = await Book.create(newBook)
       return res.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// Route for get all books from the database

router.get("/", async (req,res)=>{
try {
    const book = await Book.find({})
    return res.status(200).send({
        count: book.length,
        data: book
    })
} catch (error) {
    console.log(error.message);
    return res.status(500).send({message: error.message})
}
})


// Route for get one book from the database by id

router.get("/:id", async (req,res)=>{
try {
    const {id} = req.params
    const book = await Book.findById(id)
    return res.status(200).send(book)
} catch (error) {
    console.log(error.message);
    return res.status(500).send({message: error.message})
}
})


// Route for update a book

router.put("/:id",async (req,res)=>{
    try {
         if(
        !req.body.title ||
        !req.body.author || 
        !req.body.publishYear
       ) {
        return res.status(400).send({message: "send all required fields: title,author,publishYear"})
       }
       const {id} = req.params
       const book = req.body
       const result = await Book.findByIdAndUpdate(id,book)
       if(!result){
        res.status(404).send({message: "book not found"})
       }
       return res.status(201).send({message: "book is updated"})
    } catch (error) {
     console.log(error.message);
     return res.status(500).send({message: error.message})   
    }
})


// Route for delete a book

router.delete("/:id",async (req,res)=>{
    try {
       const {id} = req.params
       const result = await Book.findByIdAndDelete(id)
       if(!result){
        return res.status(404).json({message: "book not found"})
       } 
       return res.status(200).send({message: "book deleted successfully"})
    } catch (error) {
       console.log(error.message);
       return res.status(500).send({message: error.message}) 
    }
})

export default router