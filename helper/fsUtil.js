const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);


const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.err(err) : console.info(`\n (>⊙.◎)> Useless Data written at ${destination}`)
);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) =>{
        if(err){
            console.error(err)
        } else{
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeToFile(file,parseData);
        }
    });
};


module.exports = {readFromFile, writeToFile,readAndAppend}