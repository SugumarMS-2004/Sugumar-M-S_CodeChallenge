package com.hexaware.cricket.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.cricket.dto.PlayerDTO;
import com.hexaware.cricket.entity.Player;
import com.hexaware.cricket.exception.ResourceNotFoundException;
import com.hexaware.cricket.repository.PlayerRepository;
import com.hexaware.cricket.service.PlayerService;

@Service
@Transactional
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public Player createPlayer(PlayerDTO playerDto) {
        Player player = new Player();
        player.setPlayerId(playerDto.getPlayerId());
        player.setPlayerName(playerDto.getPlayerName());
        player.setJerseyNumber(playerDto.getJerseyNumber());
        player.setRole(playerDto.getRole());
        player.setTotalMatches(playerDto.getTotalMatches());
        player.setTeamName(playerDto.getTeamName());
        player.setCountryStateName(playerDto.getCountryStateName());
        player.setDescription(playerDto.getDescription());
        
        return playerRepository.save(player);
    }

    @Override
    public Player updatePlayer(PlayerDTO playerDto) throws ResourceNotFoundException {
        
        Player existingPlayer = playerRepository.findById(playerDto.getPlayerId())
                .orElseThrow(() -> new ResourceNotFoundException("Player profile modification failed! ID not found: " + playerDto.getPlayerId()));
        
        
        existingPlayer.setPlayerName(playerDto.getPlayerName());
        existingPlayer.setJerseyNumber(playerDto.getJerseyNumber());
        existingPlayer.setRole(playerDto.getRole());
        existingPlayer.setTotalMatches(playerDto.getTotalMatches());
        existingPlayer.setTeamName(playerDto.getTeamName());
        existingPlayer.setCountryStateName(playerDto.getCountryStateName());
        existingPlayer.setDescription(playerDto.getDescription());
        
       
        return playerRepository.save(existingPlayer);
    }

    @Override
    public PlayerDTO getPlayerById(int playerId) throws ResourceNotFoundException {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new ResourceNotFoundException("Player profile fetch failed! Record not found for ID: " + playerId));
        
        PlayerDTO playerDto = new PlayerDTO();
        playerDto.setPlayerId(player.getPlayerId());
        playerDto.setPlayerName(player.getPlayerName());
        playerDto.setJerseyNumber(player.getJerseyNumber());
        playerDto.setRole(player.getRole());
        playerDto.setTotalMatches(player.getTotalMatches());
        playerDto.setTeamName(player.getTeamName());
        playerDto.setCountryStateName(player.getCountryStateName());
        playerDto.setDescription(player.getDescription());
        
        return playerDto;
    }

    @Override
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public void deletePlayer(int playerId) {
        playerRepository.deleteById(playerId);
        
    }
}