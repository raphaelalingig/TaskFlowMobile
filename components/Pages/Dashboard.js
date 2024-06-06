import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-paper";

const Dashboard = () => {
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    fetchProjectData();
    fetchTaskData();
  }, []);

  const fetchProjectData = async () => {
    try {
      const response = await fetch("http://172.20.8.129:8080/api/projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch Project Data");
      }
      const data = await response.json();
      setProjectData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const fetchTaskData = async () => {
    try {
      const response = await fetch("http://172.20.8.129:8080/api/task/");
      if (!response.ok) {
        throw new Error("Failed to fetch Task Data");
      }
      const data = await response.json();
      setTaskData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.taskContent}>
        <View style={styles.taskStatus}>
          <View style={styles.opentask}>
            <Text>Open Projects</Text>
            <Text>{projectData.length}</Text>
          </View>
          <View style={styles.closetask}>
            <Text>Open Tasks</Text>
            <Text>{taskData.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>Available Projects: </Text>
        {projectData.map((project) => (
          <View key={project.id} value={project.id}>
            <Text style={styles.projectNames}>{project.project_name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tasksContent}>
        <Text style={styles.projectTitle}>Available Tasks: </Text>
        {taskData.map((task) => (
          <View key={task.id} value={task.id}>
            <Text style={styles.projectNames}>{task.task_name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  taskContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    marginBottom: 20,
  },
  taskStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  projectContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    marginBottom: 20,
  },
  projectTitle: {
    marginBottom: 10,
  },
  projectNames: {
    marginBottom: 5,
  },
  tasksContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
  },
});
