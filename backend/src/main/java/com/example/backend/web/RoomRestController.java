package com.example.backend.web;

import com.example.backend.model.Room;
import com.example.backend.model.dto.EditRoomDto;
import com.example.backend.model.dto.RoomTypesAndPriceDto;
import com.example.backend.model.forms.RoomForm;
import com.example.backend.model.enumerations.RoomType;
import com.example.backend.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/rooms")
@AllArgsConstructor
public class RoomRestController {

    private final RoomService roomService;

    @GetMapping("/roomData")
    public List<String> getRoomData(){
        return Arrays.stream(RoomType.values()).map(Enum::toString).collect(Collectors.toList());
    }

    @GetMapping("/roomsInHotel/{hotelId}")
    public List<Room> getRoomsInHotel(@PathVariable String hotelId){
        return this.roomService.getRoomsInHotel(hotelId);
    }

    @GetMapping("/details/{roomId}")
    public ResponseEntity<Room> getDetailsAboutRoom(@PathVariable String roomId){
        return this.roomService.getRoomDetails(roomId)
                .map(room -> ResponseEntity.ok().body(room))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @GetMapping("/roomTypesAndPrice/{hotelId}")
    public List<RoomTypesAndPriceDto> getRoomTypesAndPriceInHotel(@PathVariable String hotelId){
        return this.roomService.getRoomTypesAndPriceInHotel(hotelId);
    }

    @PostMapping("/addNewRoom")
    public ResponseEntity<?> addNewRoom(@RequestBody RoomForm roomForm){
        return this.roomService.addNewRoomForHotel(roomForm)
                .map(room->ResponseEntity.ok().body(room))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{roomId}")
    public ResponseEntity<Room> editRoom(@PathVariable String roomId, @RequestBody EditRoomDto editRoomDto){
        return this.roomService.updateRoom(roomId,editRoomDto)
                .map(room->ResponseEntity.ok().body(room))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity deleteHotel(@PathVariable String roomId){
        boolean result;
        result = this.roomService.deleteRoom(roomId);
        if(result)
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}
