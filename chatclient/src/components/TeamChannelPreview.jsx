import React,{useCallback, useEffect} from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import {useDispatch,useSelector} from 'react-redux';
import { userActions } from './store/userslice';
import { DotsVertical } from 'tabler-icons-react';
          

import Drawermodrole from './drawermodrole';



const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();




    const ChannelPreview = () => {
        const { channel: activeChannel, client } = useChatContext();


        const role=useSelector(state=> state.user.ismoderator);
        
        const dispatch=useDispatch();


        const dotogglemod=()=>{
            dispatch(userActions.togglemod());
        }

        
        const chmembers=[];
        let temp=[];
        
    
        const getUsers = useCallback( async () => {
            const members = activeChannel.queryMembers({})
                    let channelmembers=((await members).members);
                    
                    channelmembers.map((users,i)=>(chmembers.push(users.user)));
                    // 
                    chmembers.map((users,i)=>{
                        if(users.id===client.userID);
                        {
                           temp[0]=users;
                        }
                    })
        },[client.userID]);

         getUsers()
    

const togglerole=()=>{
           if(temp.role!='user')
           {
               dotogglemod();
           }
}

//   console.log(temp);
//   console.log(client.user.ID);
    
           






        return(   
            <>
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
         {!role && <span  onClick={togglerole}><DotsVertical size={25}/></span>}
         {role && <Drawermodrole/>}

        </>
        )
      


            
    };


    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
        console.log(members);

        return (
            <div className="channel-preview__item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    );
}

export default React.memo(TeamChannelPreview);
