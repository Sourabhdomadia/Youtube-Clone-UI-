import React, {useEffect, useState, useCallback} from 'react'
import './Recommended.css'
import {API_KEY, value_convertor} from "../../data.js";
import {Link} from "react-router-dom";

const Recommended = ({categoryId}) => {

  const [apiData, setApiData] = useState([])

  const fetchRecommended = useCallback(async () => {
    if (!categoryId) return;
    const recommended_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
    try {
      const response = await fetch(recommended_url);
      const data = await response.json();
      setApiData(data.items || []);
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
      setApiData([]);
    }
  }, [categoryId])

  useEffect(() => {
    fetchRecommended();
  }, [fetchRecommended]);

  return (
    <div className="recommended">
      {apiData.map((video) => (
        <Link to={`/video/${categoryId}/${video.id}`} key={video.id} className="side-video-list">
          <img src={video.snippet.thumbnails.medium.url} alt=""/>
          <div className="video-info">
            <h4>{video.snippet.title}</h4>
            <p>{video.snippet.channelTitle}</p>
            <p>{value_convertor(video.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
export default Recommended
