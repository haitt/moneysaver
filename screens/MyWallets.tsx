import React from 'react';
import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';

const MyWallets = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      'https://o8i61pgcb3.execute-api.ap-southeast-1.amazonaws.com/getWallets',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        setWallets(responseJson);
        setLoading(false);
        if (responseJson.error) {
          Alert.alert(responseJson.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const FlatListItemSeparator = () => {
    return (
      <View
        style={styles.ItemSeparator}
      />
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={wallets}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={({item}: any) => <Text style={styles.FlatListItemStyle}> {item.name} </Text>}
        // keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: 0,
  },

  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'white',
    backgroundColor: '#3498db'
  },

  ItemSeparator: {
    height: 15,
    width: '100%',
    backgroundColor: '#ecf0f1',
  }
});

export default MyWallets;
