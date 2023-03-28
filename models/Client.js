const { Schema, model} = require("mongoose")

const clientSchema = new Schema (
    {
        name: {
          type: String,
          trim: true,
          required: [true, 'Name is required.'],
        },
        surname: {
          type: String,
          required: [true, 'Surname is required.'],
        },
        phone: {
          type: Number,
          required: [true, 'phone is required.']
        },
        email: {
            type: String,
            required: [true, 'email is required.']
          },
        photo: {
            type: String,
            required: [false]
          },
        bill: {
            type: Number,
            required: [false]
        },
        tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]

    }


)

const Client = model("Client", clientSchema);

module.export = Client;