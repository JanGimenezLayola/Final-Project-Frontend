import axios from 'axios';

class TripsService {
  constructor () {
    this.trips = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_DOMAIN}/tripsApi`,
      withCredentials: true
    });
  }

  add (trip) {
      const { name, country, date, finaldate } = trip 
      return this.trips.post('/add', {name, country, date, finaldate})
      .then(({ data }) => data);
  }

  // create (user) {
  //   const { email, password } = user;
  //   return this.trips.put('/trip/create', { email, password })
  //     .then(({ data }) => data);
  // }

  delete () {
    return this.trips.delete('/trip/:id/delete')
      .then(response => response.data);
  }

  list () {    
    return this.trips.get(`/view`)
      .then(response =>response.data);
  }


  view (id) {    
    return this.trips.get(`/view/${id}`)
      .then(response => response.data);
  }

  delete (id) {    

    return this.trips.delete(`/delete/${id}`)
      .then(response => response.data);
  }

  addActivity (object) {        
    return this.trips.post(`/addActivity/${object.id}`, {object})
      .then(response => response.data);
  }

  activityDelete (id) {    
    return this.trips.delete(`/deleteActivity/${id}`)
    .then(response => response.data)
  }

  activitiesList (id) {        
    return this.trips.get(`/viewActivities/${id}`, {id})
      .then(response => response.data);
  }

  oneActivity (id) {
    return this.activitiesList.get(`/oneActivity/${id}`)
    .then(response => response.data)
  }

  addUser(id, userId) {
    return this.trips.put(`/addUserToTrip/${userId}/${id}`)
    .then(response => response.data)
  }
}

const tripsService = new TripsService();

export default tripsService;
