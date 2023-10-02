import { connect } from 'mongoose'

const Connect = async () => {
    try {
        const client = await connect('mongodb://127.0.0.1/invoice',
            { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`MongoDB Connected: ${client.connection.host}`);
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

// const Connect = async () => {
//     try {
//         const client = await connect(process.env.URL)
//         console.log(`MongoDB Connected: ${client.connection.host}`);

//         // close connection
//         // close()
//     }
//     catch (err) {
//         console.log(err)
//         process.exit(1)
//     }
// }

export default Connect