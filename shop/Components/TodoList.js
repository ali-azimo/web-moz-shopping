import React, {useState} from "react";
import { View, Text, Button } from "react-native";

const TodoList = () => {
    const [title, setTite] = useState('TodoList');
    return (
        <View>
            <Text>{title}</Text>
            <Button title="Change me" onPress={()=> setTite('My lsit')}/>
        </View>
    )
}
export default TodoList;