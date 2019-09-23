import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    userType: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});

const UserDB = mongoose.model('User', UserSchema);

export default UserDB;