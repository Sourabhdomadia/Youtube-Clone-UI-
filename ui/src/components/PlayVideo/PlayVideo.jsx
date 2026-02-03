import React, {useEffect, useState, useCallback} from 'react'
import './PlayVideo.css'
import likeIcon from '../../assets/like.png'
import dislikeIcon from '../../assets/dislike.png'
import shareIcon from '../../assets/share.png'
import saveIcon from '../../assets/save.png'
import {API_KEY, value_convertor} from "../../data.js";
import moment from "moment";

const PlayVideo = ({videoId}) => {

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = useCallback(async () => {
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    try {
      const response = await fetch(video_url);
      const data = await response.json();
      setApiData(data.items[0] || null);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  }, [videoId])

  const fetchChannelData = useCallback(async () => {
    if(!apiData) return;
    const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    try {
      const response = await fetch(channel_url);
      const data = await response.json();
      setChannelData(data.items[0] || null);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  }, [apiData])

  const fetchCommentData = useCallback(async () => {
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
    try {
      const response = await fetch(comment_url);
      const data = await response.json();
      setCommentData(data.items || []);
    } catch (error) {
      console.error("Error fetching comment data:", error);
      setCommentData([]);
    }
  }, [videoId])

  useEffect(() => {
    fetchVideoData();
  }, [fetchVideoData])

  useEffect(() => {
    if(apiData) {
      fetchChannelData();
      fetchCommentData();
    }
  }, [apiData, fetchChannelData, fetchCommentData]);

  return (
    <div className="play-video">
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>{apiData ? value_convertor(apiData.statistics.viewCount) : "0"} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "No Data"}</p>
        <div>
          <span><img src={likeIcon} alt=""/> {apiData ? value_convertor(apiData.statistics.likeCount) : 0}</span>
          <span><img src={dislikeIcon} alt=""/></span>
          <span><img src={shareIcon} alt=""/> Share</span>
          <span><img src={saveIcon} alt=""/> Save</span>
        </div>
      </div>
      <hr/>
      <div className="publisher">
        {channelData && <img src={channelData.snippet.thumbnails.default.url} alt="Channel thumbnail"/>}
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "No Channel"}</p>
          <span>{channelData ? value_convertor(channelData.statistics.subscriberCount) : "No"} subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "No Description"}</p>
        <hr/>
        <h4>{apiData ? value_convertor(apiData.statistics.commentCount) : 0} Comments</h4>
        {commentData.map((item) => (
          <div key={item.id} className="comment">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=""/>
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={likeIcon} alt=""/>
                <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislikeIcon} alt=""/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default PlayVideo
