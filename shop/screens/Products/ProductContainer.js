import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'

const data = require('../../assets/data/product.json');

const ProdcutContainer = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(data);
        return () => {
            setProducts([])
        }
    }, [])
    return (
        <View>
            <Text>Prodcut Container</Text>
            <View style={{marginTop: 100}}> 
                <FlatList
                    data={products}
                    horizontal
                    renderItem={({ item }) => <Text>{item.brand}</Text>}
                    keyExtractor={item=>item.name}
                />
           </View>
        </View>
    )
}
export default ProdcutContainer;