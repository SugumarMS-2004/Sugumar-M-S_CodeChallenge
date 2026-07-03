package com.hexaware.cricket.repository;

import java.util.Optional;
import com.hexaware.cricket.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
     public Optional<Player> findByJerseyNumber(int jerseyNumber);
}