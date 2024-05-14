import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
import axios from 'axios'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://cors-anywhere.herokuapp.com/course-api.com/react-tours-project'




function App() {
  const [isloading,setIsloading]=useState(true);
  const [tours,setTours]=useState([]);
 

  const removeTour=(id)=>{
    const new_tours=tours.filter((tour)=>(tour.id!==id));
    setTours(new_tours);
  }
  const fetchUrl=async()=>
  {
    setIsloading(true);


    try {
   const response = await axios.get(url);
      setIsloading(false);
      setTours(response.data);
    } 
    catch (error) {
      setIsloading(false);
      console.log(error)
      
    }


  };
  useEffect(()=>{
    fetchUrl()
  },[])

if(tours.length===0){
  return(
    <main className='title'>
      <h2>   No tours left</h2>
      
   
      <button className='btn' onClick={()=>fetchUrl()}>Refresh</button>
    </main>
  )
}
  if (isloading){
    return (
      <main>
        <Loading/>
      </main>
    )
  }

  return <main><Tours tours={tours} removeTour={removeTour}/></main>
}

export default App
