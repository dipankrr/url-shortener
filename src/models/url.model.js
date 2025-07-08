import mongoose, {Schema} from "mongoose";

const urlSchema = new Schema (
    {
       
        redirectURL: {
            type: String,
            require: true
        }, 
        
        shortURL: {
            type: String,
            require: true,
            unique: true
        },

        totalVisit: {
            type: Number,
            default: 0
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            // require: true
        },
        

    },

    {
        timestamps: true
    }
)

export const URL = mongoose.model("URL", urlSchema)