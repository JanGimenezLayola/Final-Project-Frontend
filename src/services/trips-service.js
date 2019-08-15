import axios from 'axios';

class TripsService {
  constructor () {
    this.trips = axios.create({
      baseURL: 'http://localhost:4000/tripsApi',
      withCredentials: true
    });
  }

  add (trip) {
      const { name, country, date, users } = trip 
      return this.trips.post('/add', {name, country, date, users})
      .then(({ data }) => data);
  }

  // create (user) {
  //   const { email, password } = user;
  //   return this.trips.put('/trip/create', { email, password })
  //     .then(({ data }) => data);
  // }

  // delete () {
  //   return this.trips.post('/trip/:id/delete')
  //     .then(response => response.data);
  // }

  // view () {
  //   return this.trips.get('/trip/view')
  //     .then(response => response.data);
  // }
}

const tripsService = new TripsService();

export default tripsService;
