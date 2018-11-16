import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-1ecfe.firebaseio.com/'
});

export default instance;

