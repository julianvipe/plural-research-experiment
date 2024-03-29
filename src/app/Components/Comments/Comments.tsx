import styled, { css, ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
import styles from "./Comments.module.css";
import CommentCard from "../CommentCard/CommentCard";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useQuery,useQueryClient, } from "@tanstack/react-query";
import Button from "../Buttons/Buttons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {getApiComments} from "../../api/api";


const IconBtn = styled.button`
  font-size: 1em;
  border-radius: 3px;
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 4px;
  padding: 12px 20px;
`;

const ButtonC = styled.button`
  color: ${(props) => props.theme.textC};
  margin-right: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 0.25em 1em;
  border-radius: 3px;
  background-color: ${(props) => props.theme.buttonC};
`;

ButtonC.defaultProps = {
  theme: {
    buttonC: "#222222",
    textC: "white",
  },
};
const theme = {
  textC: "#222222",
  buttonC: "white",
};

export default function Comments(props: any) {
  function randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [Comment, setComment] = useState({
    userName: "",
    content: "",
    date: "",
  });

  const query = useQuery({queryKey:['comments'],queryFn:async()=>{
    const data =  await getApiComments(); 
    const localData = localStorage.getItem("CommentsKey");
    if (localData===null && Comments.length===0){
      data.map((apiComment: any) => {
        const comtemp = {
          content: apiComment.body,
          userName: apiComment.email,
          date: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
        };
        if (comtemp.content !== "") {
          addComments(comtemp);
        }
      });
    }
    return data;
  }});

  const [Comments, setComments] = useState<any[]>([]);

  const [nHearts,setNHearts] = useState(()=>{
    const localData = localStorage.getItem("ThemeHearts");
    return localData?+localData:0;
  });

  useEffect(() => {
     setComments([]);
    const localData = localStorage.getItem("CommentsKey");
    if (localData && Comments.length===0) {
      JSON.parse(localData).map((localComment: any) => {
        const comtemp = {
          content: localComment.content,
          userName: localComment.userName,
          date: localComment.date,
        };
        if (comtemp.content !== "") {
          addComments(comtemp);
        }
      });
    }
  },[]);

  function handleChange(event: any) {
    const { value } = event.target;
    setComment((prevComment) => {
      return {
        ...prevComment,
        content: value,
        userName: "@userName",
        date: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
      };
    });
  }
  function submitComment(event: any) {
    if (Comment.content !== "") {
      addComments(Comment);
      setComment({
        userName: "",
        content: "",
        date: "",
      });
      resetTranscript();
      event.preventDefault();
    }
  }

  function addComments(newComment: any) {
    setComments((prevComments) => {
      return [...prevComments, newComment];
    });
  }

  function deleteComment(event: any) {
    setComments((prevComments) => {
      return prevComments.filter((CommentItem, index) => {
        return index !== 0;
      });
    });
  }

  function addHearts(){
    if(nHearts<5){
    let temp=nHearts+1;
    setNHearts(temp);

    }
  }

  function substractHearts(){
    if(nHearts>0){
    let temp=nHearts-1;
    setNHearts(temp);
  }
  }


  function hearts() {
    let hearts = [];
    for (let i = 0; i < nHearts; i++) {
      hearts.push(
        <Image
          src="/heart.png"
          alt="Next.js Logo"
          width={24}
          height={24}
          className="justify-self-end mx-2"
          priority
          key={i}
        />
      );
    }
    return <div className="flex">{hearts}</div>;
  }
  useEffect(() => {
    if (Comments.length > 0) {
      localStorage.setItem("CommentsKey", JSON.stringify(Comments));
    }
    if(nHearts>=0){
    localStorage.setItem("ThemeHearts", JSON.stringify(nHearts));
    }
  });
  function componentDidUpdate() {
    console.log(transcript);
    setComment((prevComment) => {
      return {
        ...prevComment,
        content: transcript,
        userName: "@userName",
        date: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
      };
    });
  }
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true }).then(
      componentDidUpdate
    );
  const stopListening = () =>
    SpeechRecognition.stopListening().then(componentDidUpdate);

  if (!browserSupportsSpeechRecognition) {
    return <span>{"Browser doesnt support speech recognition."}</span>;
  }

  return (
    <div className={styles.body}>
      <IconBtn onClick={props.logOut}>
        <ArrowLeftIcon className="w-6 h-6"></ArrowLeftIcon>
      </IconBtn>
      <h2 className="text-3xl/[32px] font-semibold">
        {"Do you like appples?"}
      </h2>
      <h3>{hearts()}</h3>
      <div>
        <ThemeProvider theme={theme}>
          <ButtonC onClick={substractHearts}>{"-"}</ButtonC>
        </ThemeProvider>
        <ButtonC onClick={addHearts}>{"+"}</ButtonC>
      </div>
      <div>
        <h4 className="text-2xl font-medium">{"Leave a Comment:"}</h4>
        <TextArea
          placeholder="Write here..."
          onChange={handleChange}
          value={Comment.content === "" ? transcript : Comment.content}
        />
        <Button name="Add commment" onClick={submitComment}></Button>
        <p className="text-xl">
          {"Microphone:"} {listening ? "on" : "off"}
        </p>
        <ButtonC onClick={startListening}>{"Start Recording"}</ButtonC>
        <ButtonC onClick={stopListening}>{"Stop Recording"}</ButtonC>
      </div>
      <div className={styles.commentsArea}>
        <h3 className="text-2xl font-semibold">
          {"Total Comments"}({Comments.length}):
        </h3>
        {Comments.map((CommentItem, index) => {
          return (
            <CommentCard
              key={index}
              userName={CommentItem.userName}
              content={CommentItem.content}
              date={CommentItem.date}
            />
          );
        })}
      </div>
    </div>
  );
}

