import styled, { css } from "styled-components";
import styles from "./CommentCard.module.css";

const Card=styled.div`
border: 1px solid;
border-radius: 16px;
padding: 32px;
word-wrap: break-word;
margin-top: 16px
`;


export default function CommentCard(props:any){
    return(
        <Card>
            <h5 className={styles.h5}>{props.userName}</h5>
            <p className={styles.date}>{props.date}</p>
            <p className={styles.comment}>{props.content}</p>
        </Card>
    )
}