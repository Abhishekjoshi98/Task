
import moment from 'moment';
import { git } from '../../utils';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Chip, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { repoData } from '../../redux/repoSlice';
import Loader from '../../components/Loader'
import {useNavigate} from 'react-router-dom'

const RepoCard = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((store) => store.repoSlice);

  useEffect(() => {
    (async _ => {
    const result = await git.get(`search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`)
    dispatch(repoData([...data,...result.data.items]));
    setLoading(false)})();
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

 


  const handleScroll = async () => {
    try {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setLoading(true);
        setPage((prev) => prev + 1)
      }
    }
    catch (e) {
      console.log('error', e)
    }

  }


  return (
    <>
      <Stack sx={{
        gap: '20px',
        padding: '10px'
      }}>
        {
          data?.map((e, i) => {
            return <Card sx={{ display: 'flex' }} key={i} >

              <CardMedia
                component="img"
                sx={{ width: 126 }}
                image={e?.owner?.avatar_url !== "N/A" ? e?.owner?.avatar_url : "https://th.bing.com/th/id/OIP.hUz_PIs2OQuVflKnMG3p-QAAAA?pid=ImgDet&rs=1"}
                alt="Live from space album cover"
              />

              <CardContent>
                <Stack spacing={1} alignItems="flex-start" justifyContent="flex-start">
                  
                  <Typography component="div" variant="h5">
                    {e?.full_name.split('/')[1]}
                  </Typography>
                  
                  <Typography variant="subtitle1" color="text.secondary" component="div" width="75%">
                    {e?.description}
                  </Typography>
                  
                  <Stack sx={{ flexDirection: "row", gap: "10vw" }}>
                    <Stack sx={{ flexDirection: "row", gap: "10px" }}>
                     
                      <Chip label={`${e.stargazers_count} ⭐`} sx={{ textTransform: "capitalize" }} />
                      <Chip label={`${e.open_issues_count} Issue`} sx={{ textTransform: "capitalize" }} />
                    
                    </Stack>
                    <Stack>
                      <Typography 
                      component="p" 
                      fontSize="1.5ch"
                      >
                        Last Pushed {moment(e.pushed_at).fromNow()} by {e.owner.login}
                      </Typography>
                    </Stack>
                    
                  </Stack>
                </Stack>
              </CardContent>
              
                <Stack display={'flex'} justifyContent={'center'}>
                <Button 
                variant="text" 
                onClick={()=>navigate(`/details/${e.owner.login}/${e.full_name.split('/')[1]}`)}
                >
                    Analytics
                </Button>
                </Stack>
              
            </Card>
          })
        }

      </Stack>
      {loading && <Loader />}
    </>
  );
}

export default RepoCard
