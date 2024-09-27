import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const schem_Saound_Clouds = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    track: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        enum: ['0', '1', '2', '3', '4'],
        // default: '0'
    },
    scan: {
        type: Number,
        required: true
    },
    number_of_songs: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    views: {
        type: String,
        required: true
    },

}, { timeseries: true, versionKey: false });
schem_Saound_Clouds.plugin(mongoosePaginate)
export default mongoose.model("SoundClouds", schem_Saound_Clouds);