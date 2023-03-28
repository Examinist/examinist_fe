import {
  Button,
  Divider,
  Grid,
  List,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import React from "react";
import TopicElement from "./components/TopicElement";
import { ITopic } from "../../../../types/CourseTopics";

const topic:ITopic[] =[
  {name: "Topic1", id: 1},
  {name: "Topic 2", id: 2},
  {name: "Topic 3",  id: 3},
]

export default function Topics() {
  const [addTopic, setAddTopic] = useState(-1);
  const [topics, setTopics] = useState(topic);
  const [renameId, setRenameId] = useState(-1);

  const handleAddTopicButton = (id: number) => {
    setAddTopic(id);
  };

  const handleTopicChange = (id: number, newName: string) => {
    //api call
    //if success
      setTopics(
        topics.map(item=>{
          if(item.id===id){
            return {...item, name: newName};
          }else{
            return item;
          }
      }));
      setRenameId(-1);
    //if fail
    //popup error
  };

  const handleDeleteTopic = (id: number) => {
    //api call
    //if success
    setTopics(topics.filter(item => item.id!=id));
    //if fail
    //popup call
  }

  const handleAddTopic = (id:number, name:string) => {
    //api call
    //if success
      setTopics(topics.concat({name:name, id:id}));
      setAddTopic(-1);
    //if fail
    //popup error
  };

  return (
    <Box>
      <Grid container sx={{ mb: 1 }}>
        <Grid item xs={8} md={8.5}>
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "medium",
              fontFamily: "montserrat",
            }}
          >
            Course Topics
          </Box>
        </Grid>
        <Grid item xs={4} md={3}>
          <Button
            variant="outlined"
            onClick={() => handleAddTopicButton(1)}
            sx={{
              color: "#1B84BF",
              backgroundColor: "white",
              width: "100%",
              height: "69%",
              marginTop: "7px",
              border: 1,
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            Add New Topic
          </Button>
        </Grid>
      </Grid>
      <List
        disablePadding
        sx={{
          marginTop: "5px",
          mx: "20px",
          bgcolor: "White",
          borderRadius: "15px",
        }}
      >
        {topics.map((topic, index) => {
          return (
            <div key={topic.id}>
              <TopicElement
            {...topic}
            topics={topics}
            renamedId={renameId}
            lastElement={index == topics.length-1 ? true : false}
            setRenameId={setRenameId}
            handleTopicChange={handleTopicChange}
            handleDeleteTopic={handleDeleteTopic}></TopicElement>
            </div>
          );
        })}
        {addTopic!=-1 && (
          <Box>
            <Divider sx={{ color: "#D9D9D9" }}></Divider>
              <TopicElement
              name={""}
              id={topics.length-1}
              renamedId={topics.length-1}
              lastElement={true}
              topics={topics}
              setRenameId={setAddTopic}
              handleTopicChange={handleAddTopic}
              handleDeleteTopic={handleDeleteTopic}
              ></TopicElement>
          </Box>
        )}
      </List>
    </Box>
  );
}
