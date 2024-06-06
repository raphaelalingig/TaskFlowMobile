import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  Portal,
  Modal,
  TextInput,
  Text,
  Button,
  DataTable,
  Menu,
} from "react-native-paper";
import axios from "axios";
import MultiSelect from "react-native-multiple-select";
import { LogBox } from "react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const Groups = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [assignee, setAssignee] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userData, setUserData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [menuVisible, setMenuVisible] = useState({});
  const [menuVisibleProjects, setMenuVisibleProjects] = useState([]);

  LogBox.ignoreLogs([
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ]);

  useEffect(() => {
    fetchUserData();
    fetchProjectData();
    fetchGroupData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://172.20.8.129:8080/api/user/");
      if (!response.ok) {
        throw new Error("Failed to fetch Users");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const fetchProjectData = async () => {
    try {
      const response = await fetch("http://172.20.8.129:8080/api/projects/");
      if (!response.ok) {
        throw new Error("Failed to fetch Projects");
      }
      const data = await response.json();
      setProjectData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const fetchGroupData = async () => {
    try {
      const response = await fetch("http://172.20.8.129:8080/api/group/");
      if (!response.ok) {
        throw new Error("Failed to fetch Groups");
      }
      const data = await response.json();
      setGroupData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const postdata = async () => {
    try {
      const response = await axios.post("http://172.20.8.129:8080/api/group/", {
        name: groupName,
        members: assignee,
        projects: projects,
      });
      fetchGroupData();
      console.log("Group added successfully", response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      await axios.delete(`http://172.20.8.129:8080/api/group/${groupId}/`);
      // Remove the deleted group from the state
      setGroupData(groupData.filter((group) => group.id !== groupId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      console.log("Group Name:", groupName);
      console.log("Assignee: ", assignee);
      console.log("Projects:", projects);
      await postdata();
      await fetchGroupData();
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Group added Successfully",
      });

      hideModal();
      setGroupName("");
      setAssignee([]);
      setProjects([]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const openMenu = (groupId) => {
    setMenuVisible((prev) => ({ ...prev, [groupId]: true }));
  };

  const closeMenu = (groupId) => {
    setMenuVisible((prev) => ({ ...prev, [groupId]: false }));
  };

  const openMenuProjects = (groupId) => {
    setMenuVisibleProjects((prev) => ({ ...prev, [groupId]: true }));
  };

  const closeMenuProjects = (groupId) => {
    setMenuVisibleProjects((prev) => ({ ...prev, [groupId]: false }));
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View style={styles.container}>
      <AlertNotificationRoot>
        <ScrollView>
          <DataTable
            style={{
              backgroundColor: "white",
              padding: 10,
              marginBottom: 90,
            }}
          >
            <DataTable.Header style={{ height: 60 }}>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Members</DataTable.Title>
              <DataTable.Title>Projects</DataTable.Title>
              <DataTable.Title>Actions</DataTable.Title>
            </DataTable.Header>
            {groupData.map((group) => (
              <DataTable.Row key={group.id} value={group.id}>
                <DataTable.Cell>{group.name}</DataTable.Cell>
                <DataTable.Cell>
                  <Menu
                    visible={menuVisible[group.id]}
                    onDismiss={() => closeMenu(group.id)}
                    anchor={
                      <TouchableOpacity
                        onPress={() => openMenu(group.id)}
                        style={{
                          backgroundColor: "#07b4d2",
                          padding: 3,
                        }}
                      >
                        <Text style={{ color: "white" }}>Members</Text>
                      </TouchableOpacity>
                    }
                  >
                    {group.members.map((member, index) => (
                      <Menu.Item
                        key={index}
                        title={
                          userData.find((user) => user.id === member)
                            ?.username || "Unknown"
                        }
                      />
                    ))}
                  </Menu>
                </DataTable.Cell>
                <DataTable.Cell>
                  {/* Projects Dropdown */}
                  <Menu
                    visible={menuVisibleProjects[group.id]}
                    onDismiss={() => closeMenuProjects(group.id)}
                    anchor={
                      <TouchableOpacity
                        onPress={() => openMenuProjects(group.id)}
                        style={{
                          backgroundColor: "#07b4d2",
                          padding: 3,
                        }}
                      >
                        <Text style={{ color: "white" }}>Projects</Text>
                      </TouchableOpacity>
                    }
                  >
                    {/* Here you can map over the projects for the specific group and display them as menu items */}
                    {group.projects.map((project, index) => (
                      <Menu.Item key={index} title={project.name} />
                    ))}
                  </Menu>
                </DataTable.Cell>
                <DataTable.Cell>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      padding: 3,
                      borderRadius: 5,
                    }}
                    onPress={() => deleteGroup(group.id)}
                  >
                    <Text style={{ color: "white" }}>DELETE</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
        <View style={styles.plusButton}>
          <Portal>
            <Modal
              visible={modalVisible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <View style={styles.modal}>
                <View style={styles.title}>
                  <Text variant="headlineSmall">New Group: </Text>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    backgroundColor: "#D9D9D9",
                    margin: 5,
                  }}
                ></View>

                <View style={styles.bodyText}>
                  <View style={styles.inputs}>
                    <TextInput
                      label="Group Name"
                      mode="outlined"
                      value={groupName}
                      onChangeText={setGroupName}
                    />
                  </View>
                  <View style={styles.inputs}>
                    <ScrollView style={{ maxHeight: 200 }}>
                      <MultiSelect
                        items={userData.map((user) => ({
                          id: user.id,
                          name: user.username,
                        }))}
                        uniqueKey="id"
                        onSelectedItemsChange={(selectedItems) =>
                          setAssignee(selectedItems)
                        }
                        selectedItems={assignee}
                        selectText="Select Members"
                        searchInputPlaceholderText="Search Members..."
                        tagRemoveIconColor="red"
                        tagBorderColor="blue"
                        tagTextColor="blue"
                        selectedItemTextColor="blue"
                        selectedItemIconColor="blue"
                        itemTextColor="black"
                        displayKey="name"
                        searchInputStyle={{ color: "blue" }}
                        submitButtonColor="blue"
                        submitButtonText="Submit"
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.inputs}>
                    <ScrollView style={{ maxHeight: 200 }}>
                      <MultiSelect
                        items={projectData.map((project) => ({
                          id: project.id,
                          name: project.project_name,
                        }))}
                        uniqueKey="id"
                        onSelectedItemsChange={(selectedItems) =>
                          setProjects(selectedItems)
                        }
                        selectedItems={projects}
                        selectText="Select Projects"
                        searchInputPlaceholderText="Search Projects..."
                        tagRemoveIconColor="red"
                        tagBorderColor="blue"
                        tagTextColor="blue"
                        selectedItemTextColor="blue"
                        selectedItemIconColor="blue"
                        itemTextColor="black"
                        displayKey="name"
                        searchInputStyle={{ color: "blue" }}
                        submitButtonColor="blue"
                        submitButtonText="Submit"
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.modalButtons}>
                    <Button style={styles.modaButtonCancel} onPress={hideModal}>
                      <Text style={{ color: "white" }}>Cancel</Text>
                    </Button>
                    <Button
                      style={styles.modaButtonSubmit}
                      onPress={handleSubmit}
                    >
                      <Text style={{ color: "white" }}>Submit</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </Portal>
          <TouchableOpacity onPress={showModal}>
            <AntDesign name="pluscircle" size={64} color="black" />
          </TouchableOpacity>
        </View>
      </AlertNotificationRoot>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#D9D9D9",
  },
  head: { height: 60, backgroundColor: "white", borderWidth: 1 },
  text: { margin: 10 },
  row: { flexDirection: "row", backgroundColor: "white" },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "red",
    borderRadius: 6,
    justifyContent: "center",
  },
  btnText: { textAlign: "center", color: "#fff" },
  plusButton: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
  },
  bodyText: {
    gap: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modaButtonCancel: {
    padding: 5,
    backgroundColor: "red",
    marginRight: 10,
  },
  modaButtonSubmit: {
    padding: 5,
    backgroundColor: "blue",
  },
  inputDate: {
    width: 165,
  },
  inputs: {
    marginBottom: 10,
  },
  title: {
    marginBottom: 10,
  },
  menuContainer: {
    position: "relative",
  },
});

export default Groups;
