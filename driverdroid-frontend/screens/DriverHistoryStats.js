import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const DriverHistoryStats = ({ route }) => {
  const [historyDataList, setHistoryDataList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const data = route.params.historyData;
        let dataList = [];
        for (var i = 0; i < data.length; i++) {
          let dataItem = {};
          dataItem['date'] = data[i].dateTime.substring(0, 10);
          dataItem['time'] = data[i].dateTime.substring(11, 19);
          dataItem['location'] = data[i].location;
          dataList.push(dataItem);
        }
        setHistoryDataList(dataList);
      })();
    }, [route])
  );

  const FlatListHeader = () => {
    return (
      <View>
        <Text style={styles.text}>Your drowsiness warnings history</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <View>
        {(historyDataList.length != 0) &&
          <FlatList
            data={historyDataList}
            ListHeaderComponent={FlatListHeader}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.listItem}>Date : {item.date}{"\n"}Time : {item.time}{"\n"}Location : {item.location}{"\n"}</Text>
            )}
          />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#F8F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
    color: '#39504A',
    textAlign: 'center',
  },

  listItem: {
    backgroundColor: '#00BFFF',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
    color: '#39504A',
    padding: 5,
    marginBottom: 8,
  },
});

export default DriverHistoryStats;