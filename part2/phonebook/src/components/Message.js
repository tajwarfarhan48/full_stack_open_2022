const Message = ({ message, messageType }) => {
    const greenStyle = {
        border: '2px solid green',
        color: 'green'
    }

    const redStyle = {
        border: '2px solid red',
        color: 'red'
    }

    if ( message === null ) 
        return null 

    if ( messageType === 1 ) 
        return (
            <div style={ greenStyle }>{ message }</div>
        )

    else 
        return (
            <div style={ redStyle }>{ message }</div>
        )
}
 
export default Message;