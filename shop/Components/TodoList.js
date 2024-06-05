import React, {useState} from "react";
import { View, Text, Button } from "react-native";

import Todo from "./Todo";

const TodoList = () => {
    const [title, setTite] = useState('TodoList');
    return (
        <View>
            <Text>{title}</Text>
            <Todo name={'Ali Azimo'} />
            <Todo name={ 'Levi Ali Azimo'} />

            <Button title="Change me" onPress={()=> setTite('My list')}/>
        </View>
    )
}
export default TodoList;