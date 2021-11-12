import React, { useState } from 'react';
import './search.css';
import SearchIcon from '@material-ui/icons/Search';
// import { Button } from '@material-ui/core';
import '../App';
import axios from "axios";
import Button from '@material-ui/core/Button';

const Search = () => {
  let [photo, setPhoto] = useState("");
  const [result, setResult] = useState([]);

  const getValue = (event) => {
    setPhoto(event.target.value);
  };
  const fetchSearch = async () => {
    try {
      if(photo === '')
      photo = 'Random'
      const { data } = await axios.get("https://api.unsplash.com/search/photos?&query=" + photo + "&client_id=_3bbYXK1XjTyN4ejZCyLMZ1yf-4ULSklJ17qEDFzUnA&page=1&per_page=8");
      setResult(data.results);
      console.log(data);
      let x=data.total;
      if(x>28)
      x=28;
      document.getElementById('res').innerHTML=photo
      document.getElementById('sp').innerHTML=`${x} images has been found`
      if(x>8)
      document.getElementById('btns').style.display='block'
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMore = async () => {
    try {
      if(photo === '')
      photo = 'Random'
      document.getElementById('btns').style.display='none'
      const { data } = await axios.get("https://api.unsplash.com/search/photos?&query=" + photo + "&client_id=_3bbYXK1XjTyN4ejZCyLMZ1yf-4ULSklJ17qEDFzUnA&page=1&per_page=28");
      setResult(data.results);
      console.log(data);
      let x=data.total;
      if(x>28)
      x=28;
      document.getElementById('res').innerHTML=photo
      document.getElementById('sp').innerHTML=`${x} images has been found`
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
      <div className='base'>
        <input onChange={getValue} value={photo} placeholder="Search for Photos" className='search' />
        <Button onClick={fetchSearch} className='button' > <SearchIcon className='btn' fontSize="small" /> </Button>
        <div id='res'></div>
        <div id="sp"></div>
        {result.map(photo => (<img src={photo.urls.small} alt="loading" key={photo.id} className='image'/>))}
        <button type="button" className="btn btn-dark" id='btns' onClick={fetchMore}>Load More</button>
      </div>
      
    </>
  )
}

export default Search
