package com.hexaware.cricket.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.cricket.dto.PlayerDTO;
import com.hexaware.cricket.entity.Player;
import com.hexaware.cricket.exception.ResourceNotFoundException;

@SpringBootTest
@Transactional
class PlayerServiceTest {

    @Autowired
    private PlayerService playerService;

    private PlayerDTO playerDto;

    @BeforeEach
    void setUp() {
        playerDto = new PlayerDTO();
        playerDto.setPlayerId(501);
        playerDto.setPlayerName("Virat Kohli");
        playerDto.setJerseyNumber(18);
        playerDto.setRole("Batsman");
        playerDto.setTotalMatches(275);
        playerDto.setTeamName("RCB");
        playerDto.setCountryName("India");
        playerDto.setDescription("Top order batsman.");

        playerService.createPlayer(playerDto);
    }

    @Test
    void testCreatePlayer() throws ResourceNotFoundException {
        PlayerDTO found = playerService.getPlayerById(501);
        assertNotNull(found);
        assertEquals("Virat Kohli", found.getPlayerName());
    }

    @Test
    void testUpdatePlayer() throws ResourceNotFoundException {
        playerDto.setPlayerName("King Kohli");
        Player updated = playerService.updatePlayer(501,playerDto);
        
        assertNotNull(updated);
        assertEquals("King Kohli", updated.getPlayerName());
    }

    @Test
    void testGetPlayerById() throws ResourceNotFoundException {
        PlayerDTO found = playerService.getPlayerById(501);
        assertEquals(501, found.getPlayerId());
        assertEquals("Batsman", found.getRole());
    }

    @Test
    void testGetAllPlayers() {
        List<Player> players = playerService.getAllPlayers();
        assertFalse(players.isEmpty());
    }

}