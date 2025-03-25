import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Feather";

const Message = () => {
  const navigation = useNavigation()
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const route = useRoute();
  const { users, id } = route.params || {};

  const userId = id;
  const sendTo = users?.userid;
  const chatId = userId && sendTo ? (userId < sendTo ? `${userId}_${sendTo}` : `${sendTo}_${userId}`) : null;

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = firestore()
      .collection("CHATS")
      .doc(chatId)
      .collection("Messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot.empty) {
          const allMessages = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            };
          });
          setMessages(allMessages);
        } else {
          setMessages([]);
        }
      });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(async () => {
   

    const mymsg = {
      text: input,
      sendBy: userId,
      sendTO: sendTo,
      createdAt: firestore.FieldValue.serverTimestamp()
    };

    try {
      await firestore()
        .collection("CHATS")
        .doc(chatId)
        .collection("Messages")
        .add(mymsg);
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [userId, sendTo, input, chatId]);

  const renderItem = ({ item }) => (
    <View style={item.sendBy === userId ? styles.myMessage : styles.otherMessage}>
      <Text style={item.sendBy === userId ? styles.myText : styles.otherText}>{item.text}</Text>
      <Text style={styles.timeText}>{item.createdAt ? item.createdAt.toLocaleTimeString() : "Sending..."}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={{ uri: users?.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{users?.name || "User"}</Text>
          <Text style={styles.userStatus}>Online</Text>
        </View>
        <TouchableOpacity>
          <Icon name="video" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="phone" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      
      <FlatList data={messages} renderItem={renderItem} keyExtractor={(item) => item.id} inverted />
      
      
      <View style={styles.inputContainer}>
        <Icon name="camera" size={24} color="#888" />
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Type here..." />
        <TouchableOpacity onPress={onSend}>
          <Icon name="send" size={24} color="#6A0DAD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F9F9F9",
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userStatus: {
    fontSize: 14,
    color: "purple",
  },
  icon: {
    marginHorizontal: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6A0DAD",
    padding: 12,
    borderRadius: 20,
    margin: 5,
    maxWidth: "70%",
  },
  myText: {
    color: "#fff",
    fontSize: 16,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "purple",
    padding: 12,
    borderRadius: 20,
    margin: 5,
    maxWidth: "70%",
  },
  otherText: {
    color: "#000",
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 30,
    margin: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
