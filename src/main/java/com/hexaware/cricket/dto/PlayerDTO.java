package com.hexaware.cricket.dto;

import jakarta.validation.constraints.*;
import org.springframework.stereotype.Component;

@Component 
public class PlayerDTO {
    
	@NotNull
	@Min(value = 1)
    private int playerId;

    @NotBlank
    @Min(value = 2)
    @Max(value = 15)
    private String playerName;

    @NotNull
    @Min(value = 1)
    @Max(value = 999)
    private int jerseyNumber;

    @NotBlank
    @Pattern(regexp = "^(Batsman|Bowler|Keeper|All Rounder)$")
    private String role;

    @NotNull
    @Min(value = 0)
    private int totalMatches;

    @NotBlank
    private String teamName;

    @NotBlank
    private String countryName;

    @Max(value  = 250)
    private String description;
    
    public PlayerDTO() {}

	public PlayerDTO(int playerId, String playerName,
			 int jerseyNumber,
			 String role,
			int totalMatches, String teamName,  String countryName,
			 String description) {
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

	public void setJerseyNumber(Integer jerseyNumber) {
		this.jerseyNumber = jerseyNumber;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public int getTotalMatches() {
		return totalMatches;
	}

	public void setTotalMatches(Integer totalMatches) {
		this.totalMatches = totalMatches;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getCountryName() {
		return countryName;
	}


	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

    
    
}