import React from 'react'
import {HStack,Avatar,Text} from "@chakra-ui/react"

const Message = ({text,uri,user}) => {
  return (
    <HStack alignSelf={user==="me"?'flex-end':"flex-start"} bg={"gray.100"} marginRight={"2"} paddingX={"5"} paddingY={".6"} borderRadius={'base'}>
        {
            user==="other" && <Avatar src={uri}/>
        }
        <Text>{text}</Text>
        {
            user==="me" && <Avatar src={uri}/>
        }
    </HStack>
  )
}

export default Message
