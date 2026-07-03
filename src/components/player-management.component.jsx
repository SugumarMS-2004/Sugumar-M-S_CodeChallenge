import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import PlayerService from "../services/player.service";

const PlayerManagementComponent = () => {
  const [playerIdInput, setPlayerIdInput] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(""); // "id" or "jersey"
  const [message, setMessage] = useState("");

  const handleFetchById = () => {
    if (!playerIdInput) return alert("Please enter a Player ID");
    setMessage("");
    PlayerService.get(playerIdInput)
      .then((res) => {
        setCurrentPlayer(res.data);
        setIsEditing(false);
      })
      .catch((e) => {
        console.error(e);
        alert("Player not found.");
      });
  };

  const handleDelete = () => {
    if (!currentPlayer) return;
    if (window.confirm("Are you sure you want to delete this player profile?")) {
      PlayerService.deletePlayer(currentPlayer.playerId)
        .then(() => {
          setMessage("Player deleted successfully.");
          setCurrentPlayer(null);
          setIsEditing(false);
        })
        .catch((e) => console.error(e));
    }
  };

  // Validation rules matching Spring Boot annotations exactly
  const validationSchema = yup.object().shape({
    playerName: yup.string().min(2, "Min 2 chars").max(15, "Max 15 chars").required("Player Name is required"),
    jerseyNumber: yup.number().typeError("Must be a number").min(1).max(999).required("Jersey Number is required"),
    role: yup.string().matches(/^(Batsman|Bowler|Keeper|All Rounder)$/, "Role must be Batsman, Bowler, Keeper, or All Rounder").required("Role is required"),
    totalMatches: yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Total Matches is required"),
    teamName: yup.string().required("Team Name is required"),
    countryName: yup.string().required("Country Name is required"),
    description: yup.string().max(250, "Max 250 characters").optional()
  });

  const handleFormSubmit = (values) => {
    setMessage("");
    if (editMode === "id") {
      PlayerService.update(currentPlayer.playerId, values)
        .then((res) => {
          setMessage("Updated successfully by Player ID!");
          setCurrentPlayer(res.data);
          setIsEditing(false);
        })
        .catch((err) => console.error(err));
    } else if (editMode === "jersey") {
      PlayerService.updateByJerseyNumber(currentPlayer.jerseyNumber, values)
        .then((res) => {
          setMessage("Updated successfully by Jersey Number!");
          setCurrentPlayer(res.data);
          setIsEditing(false);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Player Management System</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <input 
          type="number" 
          placeholder="Enter Player ID" 
          value={playerIdInput} 
          onChange={(e) => setPlayerIdInput(e.target.value)} 
        />
        <button type="button" onClick={handleFetchById} style={{ marginLeft: "10px" }}>
          Fetch Player
        </button>
      </div>

      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}

      {currentPlayer ? (
        <div style={{ border: "1px solid #ccc", padding: "15px", marginTop: "15px" }}>
          
          {!isEditing ? (
            <div>
              <h3>Player Details</h3>
              <p><strong>ID:</strong> {currentPlayer.playerId}</p>
              <p><strong>Name:</strong> {currentPlayer.playerName}</p>
              <p><strong>Jersey:</strong> #{currentPlayer.jerseyNumber}</p>
              <p><strong>Role:</strong> {currentPlayer.role}</p>
              <p><strong>Team:</strong> {currentPlayer.teamName}</p>
              <p><strong>Country:</strong> {currentPlayer.countryName}</p>
              <p><strong>Matches:</strong> {currentPlayer.totalMatches}</p>
              <p><strong>Bio:</strong> {currentPlayer.description || "No bio added."}</p>
              <hr />
              
              <button type="button" onClick={() => { setIsEditing(true); setEditMode("id"); }} style={{ marginRight: "10px" }}>
                Update by ID
              </button>
              <button type="button" onClick={() => { setIsEditing(true); setEditMode("jersey"); }} style={{ marginRight: "10px", backgroundColor: "orange" }}>
                Update by Jersey
              </button>
              <button type="button" onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
                Delete Player
              </button>
            </div>
          ) : (
            <div>
              <h3>Editing Profile ({editMode === "id" ? "Mode: Update by ID" : "Mode: Update by Jersey"})</h3>
              <Formik
                initialValues={{
                  playerName: currentPlayer.playerName,
                  jerseyNumber: currentPlayer.jerseyNumber,
                  role: currentPlayer.role || "",
                  totalMatches: currentPlayer.totalMatches,
                  teamName: currentPlayer.teamName,
                  countryName: currentPlayer.countryName,
                  description: currentPlayer.description || ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {() => (
                  <Form>
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block" }}>Player Name</label>
                      <Field name="playerName" type="text" />
                      <div style={{ color: "red" }}><ErrorMessage name="playerName" /></div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block" }}>Jersey Number</label>
                      <Field name="jerseyNumber" type="number" />
                      <div style={{ color: "red" }}><ErrorMessage name="jerseyNumber" /></div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block" }}>Role</label>
                      <Field name="role" as="select">
                        <option value="">Select a Role</option>
                        <option value="Batsman">Batsman</option>
                        <option value="Bowler">Bowler</option>
                        <option value="Keeper">Keeper</option>
                        <option value="All Rounder">All Rounder</option>
                      </Field>
                      <div style={{ color: "red" }}><ErrorMessage name="role" /></div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block" }}>Total Matches</label>
                      <Field name="totalMatches" type="number" />
                      <div style={{ color: "red" }}><ErrorMessage name="totalMatches" /></div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block" }}>Team Name</label>
                      <Field name="teamName" type="text" />
                      <div style={{ color: "red" }}><ErrorMessage name="teamName" /></div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block" }}>Country</label>
                      <Field name="countryName" type="text" />
                      <div style={{ color: "red" }}><ErrorMessage name="countryName" /></div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block" }}>Bio Description</label>
                      <Field name="description" as="textarea" rows="3" />
                      <div style={{ color: "red" }}><ErrorMessage name="description" /></div>
                    </div>

                    <button type="submit" style={{ backgroundColor: "green", color: "white", marginRight: "10px" }}>
                      Save Changes
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: "#666" }}>Please enter an ID above to view or modify details.</p>
      )}
    </div>
  );
};

export default PlayerManagementComponent;