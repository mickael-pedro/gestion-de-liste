import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import TextArea from "react-textarea-autosize";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";

class TaskActionButton extends React.Component {
    state = {
        formOpen: false,
        text: "",
    };

    openForm = () => {
        this.setState({
            formOpen: true
        });
    };

    closeForm = e => {
        this.setState({
            formOpen: false
        });
    };

    handleInputChange = e => {
        this.setState({
            text: e.target.value,
        })
    };

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text: ""
            })
            dispatch(addList(text));
        }

        return;
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text: ""
            });
            dispatch(addCard(listID, text));
        }

        return;
    }

    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = list ? "Ajouter une liste" : "Ajouter une tâche";
        const buttonTextOpacity = list ? 1 : 0.8;
        const buttonTextColor = list ? "#172b4d" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return (
            <div
                onClick={this.openForm}
                style={{
                    ...styles.addButton, 
                    opacity: buttonTextOpacity, 
                    color: buttonTextColor, 
                    backgroundColor: buttonTextBackground,
                    minWidth: "272px",
                }}>
                <AddIcon/>
                <p>{buttonText}</p>
            </div>
        )
    };

    renderForm = () => {
        const { list } = this.props;

        const placeholder = list ? "Entrez le titre de la liste" : "Entrez votre tâche";
        const buttonTitle = list ? "Ajouter liste" : "Ajouter tâche";

        return <div>
            <Card style={{
                overflow: "visible",
                minHeight: 80,
                minWidth: 272,
                padding: "6px 8px 2px"
            }}>
                <TextArea 
                    placeholder={placeholder} 
                    autoFocus 
                    onBlur={this.closeForm}
                    value={this.state.text}
                    onChange={this.handleInputChange}
                    style={{
                        resize: "none",
                        width: "100%",
                        overflow: "hidden",
                        outline: "none",
                        border: "none"
                    }}
                />
            </Card>
            <div style={styles.formButton}>
                <Button
                    onMouseDown={list ? this.handleAddList : this.handleAddCard}
                    variant="contained"
                    style={{ color: "white", backgroundColor:"#5aac44"}}
                >
                    {buttonTitle}{" "}
                </Button>
                <CloseIcon style={{ marginLeft: 8, cursor: "pointer" }}/>
            </div>
        </div>
    };

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    };
}

const styles = {
    addButton: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 2,
        paddingLeft: 8,
        height: 36,
        width: 272,
    },
    formButton: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",
    }
}

export default connect()(TaskActionButton);