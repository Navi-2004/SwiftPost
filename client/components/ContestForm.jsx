import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import COLORS from "../constants/color";
import axios from "../axiosConfig";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import Loading from "./Loading";

const ContestForm = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [formValues, setFormValues] = useState({
    platformName: "",
    username: "",
    contestTiming: "",
    userId: "",
    contestDay: "",
  });

  useEffect(() => {
    fetchData();
    getAndSetUserId();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in AsyncStorage");
      }
      else{
      console.log(userId);

      const res = await axios.get(`/coding/find/${userId}`);
      setData(res.data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch contest data. Please check your network connection.");  
    }
  };

  const getAndSetUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id)
      setFormValues({ ...formValues, userId: id });
    } catch (error) {
      console.error("Error fetching user ID:", error);
      // Handle error
    }
  };

  const handleSubmit = async () => {
    try {
     await  getAndSetUserId();
     console.log(formValues)
     formValues.userId=userId
          console.log(formValues.userId)
      const res = await axios.post("/coding/add", formValues);
      setData([...data, res.data]);
      setFormValues({
        platformName: "",
        username: "",
        contestTiming: "",
        userId: "",
        contestDay: "",
      });
      Alert.alert("Success", "Contest added successfully");
    } catch (error) {
      console.error("Error:", error);
      // handleNetworkError();
      Alert.alert("Error", "Failed to add contest. Please check your network connection.");
    }
  };
  const handleDelete = (itemId) => {
    axios
      .delete(`/coding/delete/${itemId}`)
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Success", "Contest deleted successfully");
          setData(data.filter((item) => item._id !== itemId));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert(
          "Error",
          "Failed to delete contest. Please check your network connection."
        );
      });
  };
 
  if(!data)
  {
    return <Loading />
  }
  return (
    <ScrollView>
      <View>
        <SafeAreaView>
          <Header />
          <View style={styles.container}>
            <Text style={styles.title}>Coding Profile</Text>

            <Text style={styles.subtitile}>
              Add your Coding profile information
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Platform Name"
              value={formValues.platformName}
              onChangeText={(text) =>
                setFormValues({ ...formValues, platformName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={formValues.username}
              onChangeText={(text) =>
                setFormValues({ ...formValues, username: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Contest Timing"
              value={formValues.contestTiming}
              onChangeText={(text) =>
                setFormValues({ ...formValues, contestTiming: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Contest Day"
              value={formValues.contestDay}
              onChangeText={(text) =>
                setFormValues({ ...formValues, contestDay: text })
              }
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.contain}>
          {data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View>
                <Text style={styles.platformName}>
                  Platform Name:{item.platformName}
                </Text>
                <Text style={styles.username}>Username :{item.username}</Text>
                <Text style={styles.contestTiming}>
                  Contest Time :{item.contestTiming}
                </Text>
                <Text style={styles.contestDay}>
                  Contest Day: {item.contestDay}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditContest", { contestId: item._id })
                  }
                >
                  <Text style={styles.button}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 30 }}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text style={styles.button}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitile: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: COLORS.secondary,
    shadowRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  contain: {
    flex: 1,
    display: "flex",
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    backgroundColor: "#ffffff",
    display: "flex",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    elevation: 3,
  },
  platformName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.primary,
  },
  username: {
    fontSize: 14,
    marginBottom: 3,
  },
  contestTiming: {
    fontSize: 14,
    marginBottom: 3,
  },
  contestDay: {
    fontSize: 14,
    marginBottom: 3,
  },
  button: {
    backgroundColor: COLORS.primary,
    color: COLORS.black,
    padding: 10,
    width: 100,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ContestForm;
