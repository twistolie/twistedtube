import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
 import { Videos, ChannelCard } from './';
import { fetchFromAPI } from './utilities/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail]= useState(null)
  const [videos, setVideos] = useState([])

  const { id } = useParams();

  console.log(channelDetail, videos)

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  
  return (
    <Box minHeight="95vh">
      <Box>
      <div style={{
        background: 'linear-gradient(90deg, rgba(38,36,38,1) 0%, rgba(19,19,149,1) 58%, rgba(38,170,196,1) 100%)',
        zIndex:10,
        height:'300px',
        
      }}
      />
       <ChannelCard channelDetail={channelDetail} marginTop="-90px"/>
     </Box>
        <Box display="flex" p="2">
          <Box sx={{ mr: { sm: '100px' }}} />
            <Videos videos={videos}/>
        </Box>
     </Box>    
  )
}
export default ChannelDetail
