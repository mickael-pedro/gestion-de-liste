import React, { useState } from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardContent } from "@mui/material";
import { deleteCard, updateCard, switchStatusCard } from "../actions";
import { connect } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

let cursor = -1;

const TaskCard = ({text, status, id, listID, dispatch}) => {
    const [cardText, setcardText] = useState(text);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDeleteCard = e => {
        dispatch(deleteCard(id, listID));
    };

    const handleSwitchStatus = e => {
        dispatch(switchStatusCard(id, listID));
    };

     const handleFinishUpdating = e => {
      if (cardText !== '') {
        dispatch(updateCard(id, listID, cardText));
      }
      setIsUpdating(false);
    }

    const handleOnChange = e => {
      cursor = e.target.selectionStart;
      setcardText(e.target.value);
    }

    const handleOnFocus = e => {
      e.target.selectionStart = cursor;
    }

    const RenderUpdateTitle = () => {
      return (
        <form>
          <textarea
            value={cardText}
            autoFocus
            onFocus={handleOnFocus}
            onChange={handleOnChange}
            onBlur={handleFinishUpdating}
            style={styles.textArea}
          />
        </form>
      )
    }

    return (
        <Card style={styles.cardContainer}>
            <CardContent style={styles.cardContent}>
                {isUpdating ? (
                    <RenderUpdateTitle/>
                ) : (
                <Typography gutterBottom>
                    {text}
                </Typography>
                )}
                <div style={styles.buttonsContainer}>
                  <EditIcon onClick={() => setIsUpdating(true)}/>
                  <DeleteIcon onClick={handleDeleteCard} className={'delete-icon'}/>
                  {status ? (
                    <DoneIcon onClick={handleSwitchStatus} className={'done-icon'}/>
                  ) : (
                    <CloseIcon onClick={handleSwitchStatus}/>
                  )}
                </div>
            </CardContent>
      </Card>
    )
}

const styles = {
    cardContainer: {
        marginTop: 8,
        marginBottom: 8,
    },
    cardContent: {
        paddingBottom: 16,
        wordWrap: "break-word",
    },
    buttonsContainer : {
      display: "flex",
      justifyContent: "right",
      marginLeft : "auto",
      gap : "3px",
    },
    textArea : {
      resize: "none",
      width: "97%",
      overflow: "hidden",
      outline: "none",
      border: "none",
      borderRadius: "3px",
      boxShadow: "inset 0 0 0 2px #0079bf"
    },
}

export default connect()(TaskCard);