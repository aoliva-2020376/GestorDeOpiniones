import { Schema, model } from "mongoose";

const publicationSchema = Schema(
    {
        title:{
            type: String,
            required: [true, 'Title is required'],
            unique: true,
            maxLength: [50, `Can't be overcome 50 characters`]
        },
        mainText:{
            type: String,
            required: [true, 'Main text is required'],
            maxLength: [100, `Can't be overcome 100 characters`]
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    }
)

export default model ('Publication', publicationSchema)