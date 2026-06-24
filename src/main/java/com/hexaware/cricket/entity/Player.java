package com.hexaware.cricket.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "Players")
public class Player {

    @Id
    
    @Column(name = "player_id")
    private int playerId;

    @Column(name = "player_name", nullable = false)
    private String playerName;

    @Column(name = "jersey_number", nullable = false)
    private int jerseyNumber;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "total_matches", nullable = false)
    private int totalMatches;

    @Column(name = "team_name", nullable = false)
    private String teamName;

    @Column(name = "country_name", nullable = false)
    private String countryName;

    @Column(name = "description")
    private String description;

    
    public Player() {}


	public Player(int playerId, String playerName, int jerseyNumber, String role, int totalMatches,
			String teamName, String countryName, String description) {
		super();
		this.playerId = playerId;
		this.playerName = playerName;
		this.jerseyNumber = jerseyNumber;
		this.role = role;
		this.totalMatches = totalMatches;
		this.teamName = teamName;
		this.countryName = countryName;
		this.description = description;
	}


	public int getPlayerId() {
		return playerId;
	}


	public void setPlayerId(int playerId) {
		this.playerId = playerId;
	}


	public String getPlayerName() {
		return playerName;
	}


	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}


	public int getJerseyNumber() {
		return jerseyNumber;
	}


	public void setJerseyNumber(int jerseyNumber) {
		this.jerseyNumber = jerseyNumber;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public Integer getTotalMatches() {
		return totalMatches;
	}


	public void setTotalMatches(int totalMatches) {
		this.totalMatches = totalMatches;
	}


	public String getTeamName() {
		return teamName;
	}


	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}


	public String getCountryStateName() {
		return countryName;
	}


	public void setCountryStateName(String countryName) {
		this.countryName = countryName;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}

    
}