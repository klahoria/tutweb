const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid Email`
        }
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: function (v) {
        //         return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid password`
        // }
    },
    is_deleted: {
        type: String,
        default: 0,
        // validate: {
        //     validator: function (v) {
        //         return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid password`
        // }
    },
});


const Customer = mongoose.model('User', blogSchema);

module.exports = Customer 