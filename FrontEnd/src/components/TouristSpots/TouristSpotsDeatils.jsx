import React, {useState,useEffect, useSyncExternalStore}from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { TextField, Button, Typography, Rating, Box, Paper } from "@mui/material"
import { TbTemperatureCelsius } from "react-icons/tb";

const TouristSpotsDeatils = () => {
  const isLoggedIn=useSelector((initialState)=> initialState.login.isLoggedIn)
  const userId=useSelector((initialState)=> initialState.login.userId)

  
console.log(userId)
const placeName='Amman'
const [error, setError] = useState({});
const [name, setName] = useState("")
const [comment, setComment] = useState("")
const [rating, setRating] = useState("")

const [spotInfo, setspotInfo] = useState("")
const [message, setMessage] = useState("")
const [spotId, setSpotId] = useState("")
const [weather, setWeather] = useState("")



  const getSpotByName=async()=>{
    try {
      const result = await axios.get(`http://localhost:5000/touristSpot/name/${placeName}`);
      console.log(result.data)

if (result?.data?.success){
  setspotInfo(result?.data?.result)
  setSpotId(result?.data?.result[0].spot_id)
 setFirstName(result?.data?.result[0].firstname)


}}catch (error) {
  if (error.response) {
    return setMessage(error.response?.data.message);
  }
  setMessage("Error happened while Get Data, please try again");
}}
console.log(name)
const [firstName, setFirstName] = useState(name)
useEffect(() => {
  getSpotByName();
}, []);

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}


const handleSubmit=()=>{
  console.log("clicked")
  if (isLoggedIn){
    const newError = {};
    if  (!comment) newError.lastName = "comment is required.";

    if (Object.keys(newError).length) {
      setError(newError);
      return;
    }
    setError({});
const body={
  user_id:userId ,
  spot_id:spotId ,
  comment,
  rating
}
axios.post("http://localhost:5000/review", body)
.then((result) => {
  if (result.status === 200) {
    setSuccessMessage("Your Comment added successful!");
    console.log("comment sent")
    
  }
})
.catch((err) => {
  console.log(err);
  setError({ api: "Comment failed. Please try again." });
});

  } else{
    return console.log("Please login to add comment")
  }
}

console.log(spotInfo[0])

spotInfo[0]?.spot_name
const getWeather = async (city) => {
  const apiKey = 'f6de574895244be8b1db01f15b083a07';
  const url = `https://api.weatherbit.io/v2.0/current?city=Siena &key=${apiKey}`;

  try {
    const response = await fetch(url); 
    const data = await response.json();
    setWeather(data)
    console.log(data); 
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
};
useEffect(()=>{
getWeather()
},[])

if (!weather) {
  return <p>Loading weather data...</p>; 
}


const weatherData = weather.data && weather.data[0];


 /* console.log(weather.data[0].weather.description) */
 console.log(weatherData.weather.description)
/* console.log(weather.data[0].app_temp)    */


 


  return (
    <>
    <div>
      
      <h1>{spotInfo[0]?.spot_name}</h1> 
    
      <h2>Weather in Amman</h2>,
      
       <h3>{weatherData.weather.description} {weatherData.app_temp}<TbTemperatureCelsius />
       </h3> 




    

    </div>
    <iframe 
      width="1400" 
      height="550" 
      src={spotInfo[0]?.virtual_tour_url}
      allowFullScreen
    ></iframe> 
    <br />
   <h2>{spotInfo[0]?.country_spot}</h2>
   <p>{spotInfo[0]?.description}</p>
   <img src={spotInfo[0]?.images[0]} alt={spotInfo[0]?.alt_text}/>
   <h1>Photogallery</h1>
      <ImageList sx={{ width: '100%', height: 'auto', display: 'flex', flexWrap: 'wrap', gap: '15px' }} rowHeight={200} gap={8}>
        {spotInfo[0]&& spotInfo[0].images.map((image, index) => (
          <ImageListItem key={image.id} sx={{ width: 'calc(33.333% - 10px)', height: 'auto' }}>
            <img
              {...srcset(image, 250, 200, 1, 1)}
              alt={image.alt_text}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
            />
            <ImageListItemBar
              sx={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
               
              }}
              title={image.alt_text}
               position="top"
              actionIcon={
                <IconButton sx={{ color: 'white' }} aria-label={`star ${image.alt_text}`}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>   
      
      <Box
      component={Paper}
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Add comment 
      </Typography>

      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        label="Comment"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Box>
        <Typography variant="subtitle1">Rating</Typography>
        <Rating
          name="user-rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          max={5}
        />
      </Box>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Box>

    <Box>
      {spotInfo[0]&&spotInfo[0].reviews.map((review, index) => (
        <Paper key={index} sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
         
          <Typography variant="h6" component="div">
            {review.first_name}
          </Typography>

         
          <Typography variant="body1" component="p" sx={{ marginBottom: 1 }}>
            {review.comment}
          </Typography>

          
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Rating name={`rating-${index}`} value={review.rating} readOnly />
            <Typography variant="body2" color="textSecondary">
              {review.rating} / 5
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>


    </>
  );
};
   




export default TouristSpotsDeatils 
