import { Avatar, IconButton } from '@mui/material'
import styled from 'styled-components'
import ChatIcon from '@mui/icons-material/Chat';
import { Button } from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';
import { auth ,db } from '../firebase';
import * as EmailValidator from "email-validator"
import Chat from './Chat';
import getRecipientEmail from '../utils/getRecipientEmail';
function Sidebar() {
  const [user] = useAuthState(auth);

  const userChatRef = db.collection("chats").where ('users','array-contains',user.email)
  const [chatSnapshot] = useCollection(userChatRef)
  const createChat = ()=>{
    const input = prompt(
      'Please enter email address for the user you want to talk to'
      );
    // @todo convert this to a modal instead
    if (!input) return null 
    if (EmailValidator.validate(input) && chatAlreadyExists(input) && input !== user.email){
      // add chats into db "chats" collectionif it dosent already exist exist and is valid
    
      db.collection('chats').add({
        users : [user.email , input]
      })
    }
    }
  const chatAlreadyExists = (recipientEmail) =>{
    
    !!chatSnapshot?.docs.find(
      (chat) =>
       chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
    
  }
  return (
    <div>
        <Container>
          {/* Header */}
          <Header>
            <UserAvatar src={user.photoURL} onClick={()=>{auth.signOut()}}/>
            <IconContainer>
              <IconButton>
                <ChatIcon/>
              </IconButton>
              <IconButton>
                <MoreVertIcon/>
              </IconButton>              
            </IconContainer>
          </Header>
          <Search>
            <SearchIcon/>
            <SearchInput placeholder='search in chats'/>
          </Search>  
          <SidebarButton onClick={createChat}>
              Start a new chat 
          </SidebarButton>

          {/* List of Chats */}
          {chatSnapshot?.docs.map(chat => (
              <Chat key={chat.id} id ={chat.id} users={chat.data().users}/>
          ))}

        </Container>        

    </div>
  )
  }

export default Sidebar


const Header = styled.div`
 display: flex;
 position: sticky;
 top:0;
 background-color:white;
 z-index: 1;
 justify-content: space-between;

 align-items: center;
 padding: 15px;
 border-bottom: 1px solid whitesmoke
`
const Container = styled.div`
 /* width: 40%; */
`;


const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover{
      opacity: 0.8 
    }
`

const IconContainer =  styled.div`

`

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
    
`
const SearchInput = styled.input`
    outline-width:0 ;
    border:none;
    flex: 1;
`
const SidebarButton = styled(Button)`
    width:100%;
    
    &&&{
      border-top: 1px solid whitesmoke;
      border-bottom: 1px solid whitesmoke;
    }
    `

