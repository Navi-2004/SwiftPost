import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axiooss from "../../axiosConfig";
import cheerio from "react-native-cheerio";
import COLORS from "../../constants/color";
import axios from "axios";
import Loading from "../Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Codechef = () => {
  const [codingDetails, setCodingDetails] = useState({
    // division: "",
    rating: "",
    globalRank: "",
    countryRank: "",
    problemsSolved: "",
    contestName: "",
  });
  const [username, setUsername] = useState(null);

  const [availabe, setAvailable] = useState(false);
  const [founded, setFounded] = useState(false);

  async function fetchData() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in AsyncStorage");
      }

      const res = await axiooss.get(`/coding/find/${userId}`);
      const codechefContest = res.data.find(
        (contest) => contest.platformName.trim() === "Codechef"
      );

      if (!codechefContest) {
        setFounded(false);
        setAvailable(true);
        console.log("No contest data found for Codechef platform");
        // Alert.alert("No contest data found for Codechef platform");
      }
    else{
      const codechefUsername = codechefContest.username;
      setUsername(codechefUsername);
      console.log("Codecehf username");
      console.log(username);

      // Call the second Axios function after getting the username
      await fetchCodeChefProfile(codechefUsername);
    }
    } catch (error) {
      console.error("Error fetching contest data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const username = "navi_4";

  async function fetchCodeChefProfile(username) {
    try {
      // const res = await axiooss.get('/coding/find');
      // const codechefContest = res.data.find(contest => contest.platformName === 'Codechef');

      // if (!codechefContest) {
      //   throw new Error('No contest data found for Codechef platform');
      // }
      // else{
      //   console.log(codechefContest);
      // }

      // const codechefUsername = codechefContest.username;
      // setUsername(codechefUsername);
      // console.log(username);

      const url = `https://www.codechef.com/users/${username}`;
      const response = await axios.get(url);
      // console.log(response);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch profile for ${username}`);
      }
      if(response==[])
      {
        setFounded(false);
        setAvailable(true);
      }

      const html = response.data;
      // console.log(html);
      const $ = cheerio.load(html);

      // const divisionText = "(Div )";
      // const divisionRegex = /\(([^)]+)\)/;

      // const divisionMatch = divisionText.match(divisionRegex);
      // const division = divisionMatch ? divisionMatch[1] : null;
      // const division = "Div 2";

      const globalRankElement = $(
        '.rating-ranks ul.inline-list li:contains("Global Rank") strong'
      );
      const countryRankElement = $(
        '.rating-ranks ul.inline-list li:contains("Country Rank") strong'
      );

      const globalRank = globalRankElement.text().trim();
      const countryRank = countryRankElement.text().trim();
      console.log(globalRank);
      console.log(countryRank);

      const rating = $(".rating-number").text().trim();

      const h3Element = $('h3:contains("Practice Problems")');
      const text = h3Element.text().trim();
      const problemsSolved = text.match(/\d+/)[0];
      // const problemsSolved=1

      const ratingBox = $("#rating-box-all");
      const contestNameElement = ratingBox.find(".contest-name a");
      const contestName = contestNameElement.text().trim();

      setCodingDetails({
        // division,
        rating,
        globalRank,
        countryRank,
        problemsSolved,
        contestName,
      });
      console.log(codingDetails);
      setAvailable(true);
      setFounded(true);
    } catch (error) {
      setFounded(false);
      setAvailable(true);
      // Alert.alert("No contest data found for Codechef platform");
      console.error(`Error fetching CodeChef profile for ${username}:`, error);
    }
  }
  if (!availabe) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading />

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {founded ? (
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Codechef Details</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>
                Rating: {codingDetails.rating}
              </Text>
              <Text style={styles.cardText}>
                Global Rank: {codingDetails.globalRank}
              </Text>
              <Text style={styles.cardText}>
                Country Rank: {codingDetails.countryRank}
              </Text>
              <Text style={styles.cardText}>
                Problems Solved: {codingDetails.problemsSolved}
              </Text>
              <Text style={styles.cardText}>
                Last Contest: {codingDetails.contestName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ):(
        <Text>No data found</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 8,
    padding: 20,
    width: "100%",
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  cardBody: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.black,
  },
});

export default Codechef;
