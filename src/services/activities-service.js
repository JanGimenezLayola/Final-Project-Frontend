import axios from 'axios';

class ActivitiesService {
  constructor () {
    this.activities = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_DOMAIN}/activitiesApi`,
      withCredentials: true
    });
  }

  oneActivity (id) {
    return this.activities.get(`/oneActivity/${id}`)
    .then(response => response.data)
  }  
  
  updateActivity (id, activityUpdated) {
    console.log('HEEEEEEEEEEY ACTIVITIES SERVICE', activityUpdated);
    console.log(id);
    
    return this.activities.put(`/updateActivity/${id}`, activityUpdated)
    .then(response =>  response.data)
    
    
  }
}

const activitiesService = new ActivitiesService();

export default activitiesService;
