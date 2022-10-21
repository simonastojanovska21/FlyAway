package com.example.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class RoomImage {

    @Id
    @GeneratedValue
    private UUID id;

    private String url;

    @ManyToOne
    private Room imageForRoom;

    public RoomImage(String url, Room imageForRoom) {
        this.url = url;
        this.imageForRoom = imageForRoom;
    }
}
