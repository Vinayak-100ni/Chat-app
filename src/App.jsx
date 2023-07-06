import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react"
import Message from "./Components/Message"
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { app } from "./firebase.js"
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore"

const auth = getAuth(app);
const db = getFirestore(app); //FOR getting the data from firestore && addDoc for adding the document in it

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logOutHandler = () => signOut(auth);



const App = () => {

  const [user, setUser] = useState(false);   //user use for update/transfer the chat to server 
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divForScroll =useRef(null);

  const submitHandler = async (e) => {  //e is used for preventing it from reload 
    e.preventDefault();

    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {  //getting the collection from addDoc/firebase Store (filestore,path(collection name))
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp() //after this we have to edit the rule in firestore Database
      });

      
      divForScroll.current.scrollIntoView({behaviour:"Smooth"});  //it is use to automatically scroll to new messages
    }
    catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))   //query is used for sorting the data orderBy is used for setting the contraints

    const unSubscribe = onAuthStateChanged(auth, (data) => {  //created for passing the data to server 
      setUser(data);
    });

    const unSubscribeForMessages = onSnapshot(q, (snap) => {    //(passing the data(q)),(snapshot func listner)
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() }      //snapshot is used for getting the data and display it on screen
        })
      )
    })

    return () => {
      unSubscribe();
      unSubscribeForMessages();
    };
  },[])

  const myStyle={
    backgroundImage: "url(https://images.all-free-download.com/images/graphiclarge/moonlight_landscape_theme_silhouette_light_effect_decoration_6826813.jpg)",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex:'-2',
    
};

  return (
    <Box bg={'blackAlpha.900'}>
      {user ? (<Container h={"100vh"} bg={"white"} style={myStyle}>
        <VStack h="full" paddingY={4}  margin={0}>
          <Button onClick={logOutHandler} w="full" colorScheme='red'>Log out</Button>

          <VStack style={{zIndex:'1'}} h="full" w={'full'} overflow={'auto'} css={{ '&::-webkit-scrollbar':{display:"none"}}}>  
            { // overflow is used for restrict the overflow of chats from the stack
              //scrollbar syntax is use for remove the scrollbar 
              messages.map(item => (
                <Message key={item.id} text={item.text} uri={item.uri} user={item.uid === user.uid ? "me" : "other"} />
              ))
            }
          <div ref={divForScroll}></div>
          </VStack>

          


          <form onSubmit={submitHandler} style={{ width: "100%" }}>
            <HStack>
              <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={"Enter a message..."} />
              <Button colorScheme='purple' type='submit'>Send</Button>
            </HStack>
          </form>
        </VStack>
      </Container>) : (<VStack justifyContent={"center"} w={'full'} h={'100vh'}>
        <Button onClick={loginHandler} colorScheme='purple'>Sign in with Google</Button>
      </VStack>)
      }
    </Box>
  )
}

export default App
