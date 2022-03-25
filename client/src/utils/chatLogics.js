export const getReciever = (loggedUser, chatUsers) => {
    if(loggedUser.id === chatUsers[0]._id){
        return chatUsers[1]
    } else {
        return chatUsers[0]
    }
}

export const isSameSenderMargin = (messages, m, i, loggedUserId) => {
    if (i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id && messages[i].sender._id !== loggedUserId) {
        return 0
    } else if (i < messages.length - 1 && messages[i + 1].sender._id !== m.sender._id && messages[i].sender._id !== loggedUserId || (i === messages.length - 1 && messages[i].sender._id !== loggedUserId) ) {
        return 0
    } else {
        return "auto"
    }
}

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id
}
  