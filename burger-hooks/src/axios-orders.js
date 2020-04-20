import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burgerer.firebaseio.com/'
});

export default instance;