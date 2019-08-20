import axios from 'axios';



class UsersService {
  constructor () {
    this.users = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_DOMAIN}/usersApi`,
      withCredentials: true
    });
  }

  getUsers () {
    return this.users.get(`/getUsers`)
    .then(response => response.data)
  }  


  
}

const usersService = new UsersService();

export default usersService;
