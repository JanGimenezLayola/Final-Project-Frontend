import axios from 'axios';



class TripInfoService {
  constructor () {
    this.tripInfo = axios.create({
      baseURL: 'http://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all',
      withCredentials: true,
      headers: {
        "x-rapidapi-host": 'ajayakv-rest-countries-v1.p.rapidapi.com',
	      "x-rapidapi-key": 'e037d92b05mshc9308ed054d83c7p19e30bjsnc2be5adb3cfb'
      }
    });
  }

  getInfo () {
    console.log('I look for the info');
    
    return this.tripInfo.get()
    .then(response => response.data)
  }
}

const tripInfoService = new TripInfoService();

export default tripInfoService;
