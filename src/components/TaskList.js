import React, {useState} from "react";
import TaskCard from "./TaskCard";
import TaskActionButton from "./TaskActionButton";
import { deleteList, updateList } from "../actions";
import { connect } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

let cursor = -1;

const TaskList = ({ title, cards, listID, dispatch }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [listTitle, setListTitle] = useState(title);

    const handleDeleteList = e => {
      dispatch(deleteList(listID));
    };

    const handleFinishUpdating = e => {
      if (listTitle !== '') {
        dispatch(updateList(listID, listTitle));
      }
      setIsUpdating(false);
    }

    const handleOnChange = e => {
      cursor = e.target.selectionStart;
      setListTitle(e.target.value);
    }

    const handleOnFocus = e => {
      e.target.selectionStart = cursor;
    }

    const handleEnterSubmit = e => {
      if(e.key === 'Enter') {
        e.preventDefault();
        document.activeElement.blur()
      }
    }

    const tasksDone = cards.filter(task => task.status === true).length;

    const RenderUpdateTitle = () => {
      return (
        <form>
          <textarea
            value={listTitle}
            autoFocus
            maxLength={21}
            onFocus={handleOnFocus}
            onChange={handleOnChange}
            onBlur={handleFinishUpdating}
            onKeyPress={handleEnterSubmit}
            style={styles.textArea}
          />
        </form>
      )
    }

    return (
      <div style={styles.container}>
        {isUpdating ? (
          <RenderUpdateTitle/>
        ) : (
        <h4 style={styles.titleContainer}>
          <div>
            {title} 
          </div>
          <span style={styles.counterContainer}>
            {tasksDone}/{cards.length}
          </span>
          <div style={styles.buttonContainer}>
            <EditIcon onClick={() => setIsUpdating(true)}/>
            <DeleteIcon onClick={handleDeleteList} className={'delete-icon'}/>
          </div>
        </h4>)}
        {cards.map(card => (
          <TaskCard key={card.id} id={card.id} text={card.text} status={card.status} listID={listID}/>
        ))}
        <TaskActionButton listID={listID} />
      </div>
    );
  };

const styles = {
    container: {
      backgroundColor: "#ebecf0",
      width: 300,
      padding: 8,
      height: "100%",
      marginRight: 12,
      boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"
    },
    titleContainer : {
      display: "flex",
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      wordWrap: "break-word",
    },
    counterContainer : {
      display: "flex",
      backgroundColor: "#00000020",
      borderRadius: "20px",
      backgroundPosition: "bottom",
      padding: "0px 10px",
      marginLeft: 20,
    },
    buttonContainer : {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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

export default connect()(TaskList);