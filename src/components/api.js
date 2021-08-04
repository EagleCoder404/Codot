function getAPI(token){
    const axios = require("axios");
    const base64 = require("base-64")
    const axios_instance = axios.create({
            headers:{
                    'Authorization': 'Basic '+base64.encode(token+":boo"),
            }
    });
    return axios_instance;
}

export default getAPI;