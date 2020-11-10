import React, { useEffect, useState } from 'react'
import MiniDrawer from '../components/AppBar/AppBar'
import BlogCard from '../components/Card/Card'
import '../assets/styles/Dashboard.scss'
import { Add, ViewModule, ViewStream } from '@material-ui/icons'
import { Card, CardContent, Grid, IconButton, makeStyles } from '@material-ui/core'
import StoryCard from '../components/Card/Card'
import background from '../assets/images/background.png'
import background_2 from '../assets/images/backgroung_2.jpg'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/api'

const useStyles = makeStyles({
  root: {
    marginBottom: '18px'
  },
  add: {
    minWidth: 240,
    maxWidth: 240,
    paddingTop: 173,
    paddingBottom: 173,
  }
});

export default function Dashboard() {
  const classes = useStyles();
  const description = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica';
  let token:string = localStorage.getItem('token') || "";
  console.log('Dashboard Token:', token);
  token = token.replace(/"/g, "");
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    axiosInstance.get('/api/admin/user/profile',  {headers: {
      "Authorization" : token
    }
    }).then(res => {
      setUsername(res.data.user.username);
      setRole(res.data.user.role);
      console.log(res.data)
    })
  })

  useEffect(() => {
    axiosInstance.get('/api/v1/admin/blog/',  {headers: {
      "Authorization" : token
    }
    }).then(res => {
      console.log(res.data)
    })
  })

  return (
    <div>
      <MiniDrawer username={username} role={role}/>
      <div className="dashboard-container">
        <div className="header">
          <div className="title">Recent Activity</div>
          <div className="layout-mode">
            <IconButton>
              <ViewModule />
            </IconButton>
            <IconButton>
              <ViewStream />
            </IconButton>
          </div>
        </div>
        <div className="content-section">
          <Grid item className={classes.root}>
            <StoryCard 
              title={'AI vs Deep Learning'}
              image={background} 
              description={description} />
          </Grid>
          <Grid item className={classes.root}>
            <StoryCard title={'CNN'}
            image={background_2} 
            description={description} />
          </Grid>
          <Grid item className={classes.root}>
            <StoryCard title={'RCNN'}
            image={background} 
            description={description} />
          </Grid>
          <Grid item className={classes.root}>
            <StoryCard title={'RCNN'}
            image={background} 
            description={description} />
          </Grid>
          <Link to="/add-blog">
            <Grid item className={classes.root}>
              <Card className={classes.add} elevation={5}>
                <CardContent>
                  <IconButton disableRipple style={{ backgroundColor: 'transparent', paddingLeft: 120 }}>
                    <Add />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          </Link>
          
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}
