import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Box, Image, ScrollView, Button} from 'native-base';
import {useCartContext} from '../../../context/CartContext';
import SingleProduct from '../../frontend/home/SingleProduct';
export default function Products() {
  const {
    state: {fetchData, cart},
  } = useCartContext();

  const cardGap = 15;
  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

  return (
    <ScrollView>
      <Box
        alignItems="center"
        small
        primary
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button colorScheme="success" size="sm">
          All
        </Button>
        <Button colorScheme="success" size="sm" mx="2">
          House
        </Button>
        <Button colorScheme="success" size="sm">
          Apartment
        </Button>
        <Button colorScheme="success" size="sm" mx="2">
          Shope
        </Button>
      </Box>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {fetchData.map((product, index) => {
          return (
            <SingleProduct key={product.id} product={product} index={index} />
          );
        })}
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  productImage: {
    width: 100,
  },
});
