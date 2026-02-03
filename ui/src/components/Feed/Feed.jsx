import React, {useEffect, useState, useCallback} from 'react'
import './Feed.css'
import {Link} from "react-router-dom";
import {API_KEY, value_convertor} from "../../data.js";
import moment from "moment";

const Feed = ({category}) => {

  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
    try {
      const response = await fetch(videoList_url);
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error("Error fetching video data:", error);
      setData([]);
    }
  }, [category])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className="Feed">
      {data.map((video) => (
        <Link key={video.id} to={`video/${video.snippet.categoryId}/${video.id}`} className="card">
          <img src={video.snippet.thumbnails.medium.url} alt=""/>
          <h2>{video.snippet.title}</h2>
          <h3>{video.snippet.channelTitle}</h3>
          <p>{value_convertor(video.statistics.viewCount)} views &bull; {moment(video.snippet.publishedAt).fromNow()}</p>
        </Link>
      ))}
    </div>
  )
}
export default Feed
