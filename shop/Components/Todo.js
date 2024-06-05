import React, {useState} from "react";
import { View, Text, Button } from "react-native";

const Todo = (props) => {
    return (
        <View>
            <Text>{ props.name}</Text>
        </View>
    )   
}
export default Todo;