import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Image,
  ScrollView,
} from 'native-base';
import {useToast} from 'native-base';
import auth from '@react-native-firebase/auth';
import {useAuthContext} from '../../../context/AuthContext';
export default function Register() {
  const {dispatch} = useAuthContext();
  const toast = useToast();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    console.log(name, value);
    setState({...state, [name]: value});
  };
  const handleSubmit = () => {
    let {email, password} = state;

    console.log('email', email, 'password : ', password);
    // setState({
    //   email: '',
    //   password: '',
    //   //   comfirePassword: '',
    // });
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        toast.show({
          placement: 'top',
          description: `${state.email} User has been successfully signed in!`,
        });
        dispatch({type: 'LOGOUT', payload: {user}});

        console.log('working auth');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          toast.show({
            placement: 'top',
            description: ` That email address is already in use!`,
          });
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          toast.show({
            placement: 'top',
            description: `That email address is invalid!`,
          });
          console.log('That email address is invalid!');
        }
      });
  };
  return (
    <>
      <View style={Styles.container}>
        <Center w="100%">
          {/* <Image
          source={{
            uri: 'https://icms-image.slatic.net/images/ims-web/3ae67ef5-e5f6-42c3-9a40-993ef9a7bfae.png',
          }}
          alt="Alternate Text"
          size="xs"
          style={{width: 100, marginTop: 20}}
        /> */}
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
              size="xl"
              fontWeight="800"
              fontSize={25}
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
              style={{textAlign: 'center'}}>
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              style={{textAlign: 'center'}}
              fontWeight="medium"
              size="xs">
              Let Create an Account
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                  onChangeText={value => handleChange('email', value)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  placeholder="Enter Your Paasword"
                  onChangeText={value => handleChange('password', value)}
                  keyboardType="numeric"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  placeholder="Enter Your Comfirm Paasword"
                  onChangeText={value => handleChange('comfirePassword', value)}
                  keyboardType="numeric"
                />
              </FormControl>
              <Button mt="2" style={Styles.buttonColor} onPress={handleSubmit}>
                Sign up
              </Button>
            </VStack>
          </Box>
        </Center>
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonColor: {
    backgroundColor: '#06f752',
  },

  centerText: {
    textAlign: 'center',
  },
});
