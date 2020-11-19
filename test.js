const crypto = require('crypto')

const res = async () => {
    const res = await add(3,4)
    console.log(res)
    const token = await getResetToken()
    console.log(token)
}


const add = (a, b) => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (a < 0 || b < 0) {
    return reject('Numbers must be non-negative') }
                resolve(a + b)
            }, 2000)
}) }




const getResetToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(48, function(err, buffer) {
            var token = buffer.toString('hex');
            if(token){
                resolve(token);
            }
            else {
                reject(err)
            }
        });
    })
    
}

res()
