import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import React from "react";
import TopicElement from "./components/TopicElement";
import { ITopic } from "../../../../types/CourseSettings";
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
import theme from "../../../../../assets/theme";
import UpdateAlert, { IAlertState } from "../../../../components/UpdateAlert/UpdateAlert";
import useAlert from "../../../../hooks/useAlert";

export default function Topics() {
  const { courseId } = useParams<{ courseId: string }>();
  const [addTopic, setAddTopic] = useState(-1);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [renameId, setRenameId] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const {setAlertState} = useAlert();

  useEffect(() => {
    getTopicsApi(courseId)
      .then(({ data }: ITopicsListResponse) => {
        setTopics(data.topics);
        setIsLoading(false);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {
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
        setAlertState({
          open: true,
          message: data.message,
          severity: "error",
        });
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
        setAlertState({
          open: true,
          message: data.message,
          severity: "success",
        });
      });
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
            px: 15, py: 5 
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
                  backgroundColor: theme.palette.white.main,
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
          {topics.length == 0 && addTopic === -1 && <Box>No topics found for this course.</Box>}
        </Box>
      )}
    </>
  );
}
