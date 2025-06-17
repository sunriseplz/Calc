import React from 'react';

function Message(props){
    const classes = 'message ' +  props.statusMessage;

    return (
        <div className={ classes } id="message"></div>
    );
}

export default Message;