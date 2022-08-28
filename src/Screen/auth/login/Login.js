import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Text,
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

export default function Login({navigation}) {
  const {dispatch} = useAuthContext();
  const toast = useToast();
  const [state, setState] = useState({
    emailid: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setState({...state, [name]: value});
  };
  const handleSubmit = () => {
    let {emailid, password} = state;

    console.log('habib', emailid, 'habibpasswrd', password);
    // setState({
    //   emailid: '',
    //   password: '',
    // });

    auth()
      .signInWithEmailAndPassword(emailid, password)
      .then(userCredential => {
        const user = userCredential.user;
        toast.show({
          placement: 'top',
          description: `${state.emailid} User has been successfully signed in!`,
        });
        dispatch({type: 'LOGIN', payload: user});
      })
      .catch(error => {
        toast.show({
          placement: 'top',
          description: `${error} `,
        });
        navigation.navigate('Register');

        console.log(error);
      });
  };
  return (
    <>
      <View style={Styles.container}>
        <Center w="100%" textAlign="center">
          {/* <Image
            source={{
              uri: 'https://icms-image.slatic.net/images/ims-web/3ae67ef5-e5f6-42c3-9a40-993ef9a7bfae.png',
            }}
            alt="Alternate Text"
            size="xs"
            style={{width: 100, marginTop: 20}}
          /> */}
          <Box safeArea p="2" py="8" w="90%" maxW="290">
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
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                  onChangeText={value => handleChange('emailid', value)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  placeholder="Enter Your Paasword"
                  type="password"
                  onChangeText={value => handleChange('password', value)}
                  keyboardType="numeric"
                />
                <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'indigo.500',
                  }}
                  alignSelf="flex-end"
                  mt="1">
                  Forget Password?
                </Link>
              </FormControl>
              <Button mt="2" onPress={handleSubmit} style={Styles.buttonColor}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  I'm a new user.{' '}
                </Text>
                <Link
                  _text={{
                    color: '#06f752',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  onPress={() => navigation.navigate('Register')}>
                  Sign Up
                </Link>
              </HStack>
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
