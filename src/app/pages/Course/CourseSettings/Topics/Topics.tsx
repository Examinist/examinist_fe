import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import React from "react";
import TopicElement from "./components/TopicElement";
import { ITopic } from "../../../../types/Question";
import {
  ITopicResponse,
  ITopicsListResponse,
  createTopiceApi,
  deleteTopicApi,
  getTopicsApi,
  updateTopicApi,
} from "../../../../services/APIs/CourseSettingsAPIs";
import { useParams } from "react-router-dom";
import { IErrorResponse } from "../../../../services/Response";

const topic: ITopic[] = [
  { name: "Chapter 1", id: 1 },
  { name: "Chapter 2", id: 2 },
  { name: "Chapter 3", id: 3 },
];

export default function Topics() {
  const { courseId } = useParams<{ courseId: string }>();
  const [addTopic, setAddTopic] = useState(-1);
  const [topics, setTopics] = useState(topic);
  const [renameId, setRenameId] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [alertState, setAlertState] = React.useState<any>({
    open: false,
    message: "",
  });

  useEffect(() => {
    getTopicsApi(courseId)
      .then(({ data }: ITopicsListResponse) => {
        console.log(data);
        setTopics(data.topics);
        setIsLoading(false);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {
        console.log(status, statusText);
      });
  }, []);

  const handleAddTopicButton = (id: number) => {
    setAddTopic(id);
  };

  const handleTopicChange = (id: number, newName: string) => {
    updateTopicApi(courseId, { id: id, name: newName })
      .then(({ data: { topic } }: ITopicResponse) => {
        setTopics(
          topics.map((item) => {
            if (item.id === topic.id) {
              return { ...item, name: topic.name };
            } else {
              return item;
            }
          })
        );
        setAlertState({
          open: true,
          message: "Topic updated successfully!",
          severity: "success",
        });
         setRenameId(-1);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        console.log(status, statusText, data);
        setAlertState({
          open: true,
          message: data.message,
          severity: "error",
        });
        console.log(data.message);
      });
  };

  const handleDeleteTopic = (id: number) => {
    deleteTopicApi(courseId, id)
      .then(() => {
        setTopics((t) => t.filter((t) => t.id !== id));
        setAlertState({
          open: true,
          message: "Topic deleted successfully!",
          severity: "success",
        });
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        console.log(status, statusText, data);
        setAlertState({
          open: true,
          message: data.message,
          severity: "error",
        });
      });
  };

  const handleAddTopic = (id: number, name: string) => {
    createTopiceApi(courseId, { name: name })
      .then(({ data: { topic } }: ITopicResponse) => {
        setTopics((topics) => [...topics, topic]);
        setAlertState({
          open: true,
          message: "Topic added successfully!",
          severity: "success",
        });
        setAddTopic(-1);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        console.log(status, statusText, data);
        setAlertState({
          open: true,
          message: data.message,
          severity: "success",
        });
        console.log(data.message);
      });
    // //api call
    // //if success
    //   setTopics(topics.concat({name:name, id:id}));
    //   setAddTopic(-1);
    // //if fail
    // //popup error
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ px: 15, py: 5 }}>
          <Grid container sx={{ mb: 3 }}>
            <Grid item xs={8} md={9.5}>
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
            <Grid item xs={4} md={2.5}>
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
                  borderRadius: "15px",
                  py: 1.5,
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
                    lastElement={index == topics.length - 1 ? true : false}
                    setRenameId={setRenameId}
                    handleTopicChange={handleTopicChange}
                    handleDeleteTopic={handleDeleteTopic}
                  ></TopicElement>
                </div>
              );
            })}
            {addTopic != -1 && (
              <Box>
                <Divider sx={{ color: "#D9D9D9" }}></Divider>
                <TopicElement
                  name={""}
                  id={topics.length - 1}
                  renamedId={topics.length - 1}
                  lastElement={true}
                  topics={topics}
                  setRenameId={setAddTopic}
                  handleTopicChange={handleAddTopic}
                  handleDeleteTopic={handleDeleteTopic}
                ></TopicElement>
              </Box>
            )}
          </List>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={alertState.open}
            autoHideDuration={3000}
            onClose={() => setAlertState((a: any) => ({ ...a, open: false }))}
          >
            <Alert
              onClose={() => setAlertState((a: any) => ({ ...a, open: false }))}
              variant="filled"
              severity={alertState.severity || "info"}
              sx={{ width: "100%" }}
            >
              {alertState.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </>
  );
}
