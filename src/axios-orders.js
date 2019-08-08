
import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-app-3367b.firebaseio.com/'
});

export default instance; 