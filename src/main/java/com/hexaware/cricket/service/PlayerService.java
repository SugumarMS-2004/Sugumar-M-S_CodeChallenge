package com.hexaware.cricket.service;

import com.hexaware.cricket.dto.PlayerDTO;
import com.hexaware.cricket.entity.Player;
import com.hexaware.cricket.exception.ResourceNotFoundException;

import java.util.List;

public interface PlayerService {
    
    public Player createPlayer(PlayerDTO playerDto);
    public Player updatePlayer( PlayerDTO playerDto) throws ResourceNotFoundException;
    public List<Player> getAllPlayers();
    public PlayerDTO getPlayerById(int playerId) throws ResourceNotFoundException;
    public void deletePlayer(int playerId);
}

