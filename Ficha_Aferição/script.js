var axios = require('axios')
var fs = require('fs').promises;

async function postData() {
    for (var i = 1; i < 4; i++) {
        try {
            let filename = `dataset-extra${i}.json`

            // Open file
            let data = await fs.readFile(filename, 'utf8')
            // Remove { "pessoas": [ form the beginning
            // Remove } from the end
            let pessoas = JSON.parse(data);
            // Make a post request to localhost:3000/pessoas
            for (let pessoa of pessoas) {
                await axios.post('http://localhost:3000/pessoas', pessoa);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}

postData();