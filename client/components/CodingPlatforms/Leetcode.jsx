import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from "react-native";
import React from "react";
import axiooss from "../../axiosConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import cheerio from "react-native-cheerio";
import COLORS from "../../constants/color";
import Loading from "../Loading";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Leetcode = () => {
  const [username, setUsername] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [availabe, setAvailable] = useState(false);
  const [userFetched, setUserFetched] = useState(false);
  const [found, setFound] = useState(false);

  async function fetchData() {
    try { 
     
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID not found in AsyncStorage');
  }

  const res = await axiooss.get(`/coding/find/${userId}`);
  const leetcodeContest = res.data.find(
    (contest) => contest.platformName.trim() === 'Leetcode'
  );
      if (!leetcodeContest) {
      // Alert.alert("No contest data found for leetcode platform");
      console.log("No contest data found for leetcode platform");
      setFound(false);
      setAvailable(true);

      }
      
  else{
      const leetcodeUsername = leetcodeContest.username;
      console.log("leetcodeUsername");
      setUsername(leetcodeUsername);
      console.log(username);
      const html = await fetchLeetcodeProfile(leetcodeUsername);
      setProfileData(parseProfileData(html));
        setAvailable(true);
        setFound(true);
  }
      // Call the second Axios function after getting the username
    } catch (error) {
      setFound(false);
      setAvailable(true);
      console.error("Error fetching contest data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

   async function fetchLeetcodeProfile(username) {
    const url = `https://leetcode.com/${username}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch profile for ${username}`);
    }
    return response.data;
  }
  function parseProfileData(html) {
    const $ = cheerio.load(html);
    const contestRating = $(".align-start .mr-4 .text-label-1")
          .eq(0)
          .text()
          .trim();
    const globalRanking = $(".align-start .mr-4 .text-label-1")
      .eq(1)
      .text()
      .trim();
    const contestsAttended = $(".align-start .hidden.md\\:block .text-label-1")
      .eq(0)
      .text()
      .trim();
    const element = $(
      "#__next > div.flex.min-h-screen.min-w-\\[360px\\].flex-col.text-label-1.dark\\:text-dark-label-1.bg-layer-bg.dark\\:bg-dark-layer-bg > div.mx-auto.w-full.grow.p-4.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\].w-full > div.lc-xl\\:flex-row.lc-xl\\:space-y-0.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.lc-xl\\:mx-8.mx-3.flex.items-center > div.mr-8.mt-6.flex.min-w-\\[100px\\].justify-center > div > div > div"
    );

    const totalCount = element.text().trim();
    const easyRegex = /Easy(\d+)\/(\d+)/;
    const mediumRegex = /Medium(\d+)\/(\d+)/;
    const hardRegex = /Hard(\d+)\/(\d+)/;
    const log = $(
      "div.lc-xl\\:max-w-\\[228px\\].flex.w-full.flex-col.space-y-4"
    )
      .text()
      .trim();

    const extractCounts = (log, regex) => {
      const match = log.match(regex);
      if (match) {
        const solved = match[1];
        const total = match[2];
        return { solved, total };
      }
      return null;
    };

    const easyCounts = extractCounts(log, easyRegex);
    const mediumCounts = extractCounts(log, mediumRegex);
    const hardCounts = extractCounts(log, hardRegex);
    console.log("Contest Rating:", contestRating);

    return {
      contestRating,
      globalRanking,
      contestsAttended,
      totalCount,
      easyCounts,
      mediumCounts,
      hardCounts,
    };
  }

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
         {found ? (
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Leetcode Details</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.detail}>Contest Rating: {profileData.contestRating}</Text>
            <Text style={styles.detail}>Global Ranking: {profileData.globalRanking}</Text>
            <Text style={styles.detail}>Contests Attended: {profileData.contestsAttended}</Text>
            <Text style={styles.detail}>Total Count: {profileData.totalCount}</Text>
            <Text style={styles.detail}>Easy Counts: {JSON.stringify(profileData.easyCounts)}</Text>
            <Text style={styles.detail}>Medium Counts: {JSON.stringify(profileData.mediumCounts)}</Text>
            <Text style={styles.detail}>Hard Counts: {JSON.stringify(profileData.hardCounts)}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 13,
    width: '100%',
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardBody: {
    marginBottom: 10,
    color: COLORS.white,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.black,
  },
});

export default Leetcode;




//   async function fetchLeetcodeProfile(username) {
  //     const url = `https://leetcode.com/${username}`;
  //     const response = await axios.get(url);

  //     if (response.status !== 200) {
  //       throw new Error(`Failed to fetch profile for ${username}`);
  //     }

  //     const html = response.data;
  //     const $ = cheerio.load(html);
  //     // Extract contest rating
  //     const contestRating = $(".align-start .mr-4 .text-label-1")
  //       .eq(0)
  //       .text()
  //       .trim();

  //     // Extract global ranking
  //     const globalRanking = $(".align-start .mr-4 .text-label-1")
  //       .eq(1)
  //       .text()
  //       .trim();

  //     // Extract the number of contests attended
  //     const contestsAttended = $(".align-start .hidden.md\\:block .text-label-1")
  //       .eq(0)
  //       .text()
  //       .trim();

  //     const element = $(
  //       "#__next > div.flex.min-h-screen.min-w-\\[360px\\].flex-col.text-label-1.dark\\:text-dark-label-1.bg-layer-bg.dark\\:bg-dark-layer-bg > div.mx-auto.w-full.grow.p-4.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\].w-full > div.lc-xl\\:flex-row.lc-xl\\:space-y-0.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.lc-xl\\:mx-8.mx-3.flex.items-center > div.mr-8.mt-6.flex.min-w-\\[100px\\].justify-center > div > div > div"
  //     );

  //     // Retrieve the text content of the div
  //     const totalCount = element.text().trim();

  //     // Print or use the retrieved total count

  //     // Extract the counts for easy, medium, and hard problems
  //     const parentDiv = $(
  //       "div.lc-xl\\:max-w-\\[228px\\].flex.w-full.flex-col.space-y-4"
  //     );
  //     console.log(parentDiv.text());
  //     const log=parentDiv.text();

  //     // Extract the counts for easy, medium, and hard problems
  //     const easyRegex = /Easy(\d+)\/(\d+)/;
  //     const mediumRegex = /Medium(\d+)\/(\d+)/;
  //     const hardRegex = /Hard(\d+)\/(\d+)/;

  //     // Function to extract counts using regular expressions
  //     const extractCounts = (log, regex) => {
  //       const match = log.match(regex);
  //       if (match) {
  //         const solved = match[1];
  //         const total = match[2];
  //         return { solved, total };
  //       }
  //       return null;
  //     };

  //     // Extract counts for easy, medium, and hard problems
  //     const easyCounts = extractCounts(log, easyRegex);
  //     const mediumCounts = extractCounts(log, mediumRegex);
  //     const hardCounts = extractCounts(log, hardRegex);

  //     console.log("Easy counts:", easyCounts);
  //     console.log("Medium counts:", mediumCounts);
  //     console.log("Hard counts:", hardCounts);
  //     console.log("Total Count:", totalCount);

  //     console.log("Contest Rating:", contestRating);
  //     console.log("Global Ranking:", globalRanking);
  //     console.log("Contests Attended:", contestsAttended);
  //   }
 
