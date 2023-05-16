// Hello
import React, { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
// import 'moment-timezone';
function Test() 
{
    var moment = require('moment');
//     const [VideoUrl , setVideoUrl] = useState('');

//         let UslIs = "https://www.youtube.com/watch?v=5Eqb_-j3FDA";
//         let paramString = UslIs.split('?')[1];
//         let queryString = new URLSearchParams(paramString);
//         for (let pair of queryString.entries()) {
//             setVideoUrl(pair[1]);
//         }
        
// console.log(VideoUrl);

const YTTime = moment.duration('PT15M33S').asMilliseconds();
console.log(YTTime);
const axios = require('axios');
var sum = 0;
axios.get(process.env.REACT_APP_API_URL + '/playlist/getPlayListData').then((res) => 
{
    res.data.map((val , index)=>{
        if(val.videos.length != 0){
            for(let i=0;i<val.videos.length;i++){
                if(val.videos[i].duration.slice(0,1)!="P")
                {
                    val.videos[i].duration = "0:"+val.videos[i].duration
                    sum = sum +  moment.duration(val.videos[i].duration).asMinutes();
                }
                else
                {
                    sum = sum + moment.duration(val.videos[i].duration).asMinutes();
                }
            }
            var totalTimeInMin  = sum;
            console.log(Math.floor(totalTimeInMin / 60) + ':' + (totalTimeInMin % 60) + ':' + (totalTimeInMin*60/60))

        }
        
    })
}
);

// const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
// console.log(userDetails);
    
    return (
                <>
                        <Stack spacing={1}>
                             
                             

                        </Stack>
                </>
    )
}

export default Test