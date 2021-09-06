package com.ekke.backend.repository;

import com.ekke.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ItemRepository extends JpaRepository<Item, Long> {

}
