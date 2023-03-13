import { Button, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react';
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

export default function Topics() {

  const [addTopic, showAddTopic] = useState(false);
  const [topics, changeTopics] = useState(["Topic 1", "Topic 2", "Topic 3"]);
  const [renameTopics, renameTopic] = useState(topics.map((value) => false));

  const handleAddTopicButton = () => {
    showAddTopic(!addTopic);
  };

  const handleTopicChange = (event,index: number) =>{
    if(event.key=='Enter'){
      let topicName = [...topics];
      topicName[index] = event.target.value;
      changeTopics(topicName);
      handleRename(index);
    }
  }

  const handleAddTopic = (event) =>{
    if(event.key=='Enter'){
      let topicName = [...topics,event.target.value];
      changeTopics(topicName);
      handleAddTopicButton();
    }
  }

  const handleRename = (index: number) => {
    let rename = [...renameTopics];
    rename[index] = !rename[index];
    renameTopic(rename);
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={9}>
          <Box sx={{
            fontSize: "2rem",
            fontWeight: "medium",
            fontFamily: "montserrat",
          }}>
            Course Topics</Box>
        </Grid>
        <Grid item xs={2.5}>
          <Button
            variant='outlined'
            onClick={handleAddTopicButton}
            sx={{
              color: "#1B84BF",
              backgroundColor: "white",
              width: '100%',
              height: '69%',
              marginTop: '7px',
              border: 1,
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "montserrat",
              textTransform: 'none',
              borderRadius: "10px",
            }}>Add new topic
          </Button>
        </Grid>
      </Grid>
      <List 
      disablePadding
      sx={{
        marginTop:"5px",
        marginLeft: "20px",
        bgcolor: "White",
        borderRadius: "15px",
      }}>
        {topics.map((value, index) => {
          return (
            <Box>
              <ListItem secondaryAction={
                <IconButton onClick={() => handleRename(index)}>
                  <EditIcon />
                </IconButton>
              }>
                {renameTopics[index] ? <TextField
                //value={topics[index]}
                onKeyDown={(event)=>handleTopicChange(event,index)}
                size='small'
                label="Enter new topic name"
                sx={{
                  bgcolor: "#F5F5F5",
                  borderColor: "#D9D9D9",
                  width: "35%",
                  '& .MuiFormLabel-root': {
                    fontSize: "14px",
                    fontWeight: "medium",
                  },
                }}></TextField> : <ListItemText primary={value} sx={{ color: "Black", }}></ListItemText>}
              </ListItem>
              {index != (topics.length - 1) && <Divider sx={{ color: "#D9D9D9" }}></Divider>}
            </Box>
          );
        })}
        {addTopic &&
          <Box>
            <Divider sx={{ color: "#D9D9D9" }}></Divider>
            <ListItem>
              <TextField
              onKeyDown={handleAddTopic}
                size='small'
                label="Enter new topic name"
                sx={{
                  bgcolor: "#F5F5F5",
                  borderColor: "#D9D9D9",
                  width: "35%",
                  '& .MuiFormLabel-root': {
                    fontSize: "14px",
                    fontWeight: "medium",
                  },
                }}></TextField>
            </ListItem>
          </Box>
        }
      </List>

    </Box>
  )
}
