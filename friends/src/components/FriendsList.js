import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'

import { Container, Grid, Card, Icon, Button } from 'semantic-ui-react';

import FriendsForm from './FriendForm'

import "../App.css"

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [editMyFriend, setEditMyFriend] = useState({});

  useEffect(() => {
    // get friends list
    axiosWithAuth().get('/friends')
      .then(res => setFriends(res.data))
      .catch(err => err.response)
  }, [])

  const killFriend = e => {
    setFriends(friends.filter(friend => friend.id !== e))
  }

  const editFriend = id => {
    setEditMyFriend(friends.find(friend => friend.id === id))
  }

  return (
    <Container>
      <FriendsForm updateFriends={setFriends} editFriend={editMyFriend} />
      <div />
      <Grid className="cardParent">
        {
          friends.map(friend => (
            <Grid.Column key={friend.id} width={4}>
              <Card raised className="Card">
                <Card.Content>
                  <Card.Header onClick={() => editFriend(friend.id)}>{friend.name}</Card.Header>
                  <Card.Meta>{friend.email}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button name="trash" onClick={() => killFriend(friend.id)}>Delete</Button>>
                  Age: {friend.age}
                </Card.Content>
              </Card>
            </Grid.Column>
          ))
        }
      </Grid>
    </Container>
  )
}

export default FriendsList;