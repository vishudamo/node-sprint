import * as mongoose from 'mongoose';

const ReactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    like: {
        type: Boolean,
        default: false
    },
    dislike: {
        type: Boolean,
        default: false
    },
    confused: {
        type: Boolean,
        default: false
    },
    informative: {
        type: Boolean,
        default: false
    },
    applause: {
        type: Boolean,
        default: false
    }
});

const NoteSchema = new mongoose.Schema({
    sprintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    boardType: {
        type: String,
        required: true
    },
    reaction: [ReactionSchema]
});

const NoteDB = mongoose.model('Note', NoteSchema);

export default NoteDB;