import { connect } from 'mongoose';

async function CONNECT() {
    try {
        await connect(process.env.URL)
        console.log('connected to database!');
    }
    catch (err) {
        console.log(err.message)
    }
}

export default CONNECT