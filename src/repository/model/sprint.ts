import * as mongoose from 'mongoose';

const SprintSchema = new mongoose.Schema({
    sprintNo: Number,
    status: {
        type: Boolean,
        default: false
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
});

const SprintDB = mongoose.model('Sprint', SprintSchema);

export default SprintDB;