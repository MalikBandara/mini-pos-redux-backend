import mongoose from "mongoose";



type Item = {
    name: string;
    description: string;
    price: number;
    category: string;
}




const itemSchema = new mongoose.Schema<Item>({
    name :{
        type: String,
        required: [true, "name is required"],
        minlength: [3, "name must be at least 3 characters long"],
        trim: true,
        

    },
    description: {
        type: String,
        required: [true, "description is required"],
        minlength: [5, "description must be at least 5 characters long"],
        trim: true,
    },
    price :{
        type : Number,
        required : [true , "price is required"],
        min:[0 , "price must be greater than or equal to 0"],
    },
    category:{
        type: String,
        required: [true , "category is required "],
        enum:{
            values: ["electronics", "clothing", "food", "furniture", "books"],
            message: "{VALUE} is not a valid category. Valid categories are electronics, clothing, food, furniture, books."
        }
    }

})

export const ItemModel = mongoose.model("items" ,itemSchema )
