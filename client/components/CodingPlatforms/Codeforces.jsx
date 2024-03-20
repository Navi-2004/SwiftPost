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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Loading";

const Codeforces = () => {
  const [username, setUsername] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [availabe, setAvailable] = useState(false);
  const[founded,setFounded]=useState(false);
  async function fetchData() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in AsyncStorage');
      }
    
      const res = await axiooss.get(`/coding/find/${userId}`);
      const codeforcesContest = res.data.find(
        (contest) => contest.platformName.trim() === "Codeforces"
      );

      if (!codeforcesContest) {
        setFounded(false);
        setAvailable(true);
        console.log("No contest data found for codeforces platform");
        // Alert.alert("No contest data found for codeforces platform");
      }
      else{
      const codeforcesUsername = codeforcesContest.username;
      setUsername(codeforcesUsername);
      console.log(username);


      // Call the second Axios function after getting the username
      await fetchcodeforcesProfile(codeforcesUsername);
      setAvailable(true);
      setFounded(true);
      }
    } catch (error) {
      setFounded(false);
      setAvailable(true);
      console.error("Error fetching contest data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  //   async function fetchcodeforcesProfile(username) {
  //     try {
  //         const url = `https://codeforces.com/profile/${username}`;
  //         const response = await axios.get(url);

  //         if (response.status !== 200) {
  //             throw new Error(`Failed to fetch profile for ${username}`);
  //         }

  //         const html = response.data;
  //         const $ = cheerio.load(html);

  //         // Extract contest rating and max rating
  //         const liElement = $('li');
  //         const textContent = liElement.text().trim();
  //         const contestRatingRegex = /Contest rating:\s*(\d+)/;
  //         const maxRatingRegex = /max\.\s*(\w+),\s*(\d+)/;
  //         const contestRatingMatch = textContent.match(contestRatingRegex);
  //         const maxRatingMatch = textContent.match(maxRatingRegex);
  //         const contestRating = contestRatingMatch ? contestRatingMatch[1] : null;
  //         const maxRating = maxRatingMatch ? `${maxRatingMatch[1]} ${maxRatingMatch[2]}` : null;

  //         // Extract activity details
  //         const activityFooter = $('._UserActivityFrame_footer');
  //         const activityDetails = [];
  //         activityFooter.find('._UserActivityFrame_countersRow').each((index, row) => {
  //             const rowDetails = [];
  //             $(row).find('._UserActivityFrame_counter').each((index, counter) => {
  //                 const value = $(counter).find('._UserActivityFrame_counterValue').text().trim();
  //                 const description = $(counter).find('._UserActivityFrame_counterDescription').text().trim();
  //                 rowDetails.push({ value, description });
  //             });
  //             activityDetails.push(rowDetails);
  //         });

  // Store extracted data in profileData state
  async function fetchcodeforcesProfile(username) {
    try {
      const url = `https://codeforces.com/profile/${username}`;
      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch profile for ${username}`);
      }

      const html = response.data;
      const $ = cheerio.load(html);

      // Extract contest rating and max rating
      const liElement = $("li");
      const textContent = liElement.text().trim();
      const contestRatingRegex = /Contest rating:\s*(\d+)/;
      const maxRatingRegex = /max\.\s*(\w+),\s*(\d+)/;
      const contestRatingMatch = textContent.match(contestRatingRegex);
      const maxRatingMatch = textContent.match(maxRatingRegex);
      const contestRating = contestRatingMatch ? contestRatingMatch[1] : null;
      const maxRating = maxRatingMatch
        ? `${maxRatingMatch[1]} ${maxRatingMatch[2]}`
        : null;

      // Extract activity details
      const activityFooter = $("._UserActivityFrame_footer");
      const activityDetails = [];
      activityFooter
        .find("._UserActivityFrame_countersRow")
        .each((index, row) => {
          const rowDetails = [];
          $(row)
            .find("._UserActivityFrame_counter")
            .each((index, counter) => {
              const value = $(counter)
                .find("._UserActivityFrame_counterValue")
                .text()
                .trim();
              const description = $(counter)
                .find("._UserActivityFrame_counterDescription")
                .text()
                .trim();
              rowDetails.push({ value, description });
            });
          activityDetails.push(rowDetails);
        });

      // Store extracted data in profileData state
      setProfileData({
        contestRating,
        maxRating,
        activityDetails,
      });

      setAvailable(true);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  //  console.log(profileData);
  //     } catch (error) {
  //         console.error('Error fetching profile data:', error);
  //     }
  // }
  if(!availabe)
  {
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
              <Text style={styles.cardTitle}>Codeforce Details</Text>
            </View>
            {profileData && (
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>Contest Rating: {profileData.contestRating}</Text>
                <Text style={styles.cardText}>Max Rating: {profileData.maxRating}</Text>
                {profileData.activityDetails.map((rowDetails, index) => (
                  <View key={index}>
                    {rowDetails.map((counter, i) => (
                      <View key={i}>
                        <Text style={styles.cardText}>{counter.description}:{counter.value}</Text>
                        {/* <Text style={styles.cardText}>{counter.value}</Text> */}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
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
    alignItems: "stretch", // Ensure card expands vertically
    justifyContent: "stretch", // Ensure card expands vertically
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 8,
    padding: 20,
    width: "100%", // Ensure card expands horizontally
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
    width: "100%",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.black,
  },
});

export default Codeforces;
