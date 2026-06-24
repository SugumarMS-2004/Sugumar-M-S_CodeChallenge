package com.hexaware.cricket.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.cricket.dto.PlayerDTO;
import com.hexaware.cricket.entity.Player;
import com.hexaware.cricket.exception.ResourceNotFoundException;
import com.hexaware.cricket.service.PlayerService;

@RestController
@RequestMapping("/api/players")
public class PlayerRestController {
	
	@Autowired
	private PlayerService service;
	
	@PostMapping("/add")
	public Player createPlayer(@RequestBody PlayerDTO playerDto) {
		return service.createPlayer(playerDto);
	}
	
	@PutMapping("/update/{playerId}")
	public Player updatePlayer(@PathVariable int playerId ,@RequestBody PlayerDTO playerDto) throws ResourceNotFoundException{
		playerDto.setPlayerId(playerId);
		return service.updatePlayer(playerDto);
	}
	
	@GetMapping("/getall")
		public List<Player> getAllPlayers(){
			return service.getAllPlayers();
		}
	
	
	
	@GetMapping("/get/{playerId}")
	public PlayerDTO getPlayerById(@PathVariable int playerId) throws ResourceNotFoundException {
		return service.getPlayerById(playerId);
	}
	
	@DeleteMapping("/delete/{playerId}")
    public String deletePlayer(@PathVariable int playerId) {
        service.deletePlayer(playerId);
        return "Player deleted successfully with ID: " + playerId;
    }
	

}
