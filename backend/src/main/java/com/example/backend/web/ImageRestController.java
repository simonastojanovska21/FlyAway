package com.example.backend.web;

import com.example.backend.model.HotelImage;
import com.example.backend.model.RoomImage;
import com.example.backend.model.forms.ImageForm;
import com.example.backend.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/images")
@AllArgsConstructor
public class ImageRestController {

    private final ImageService imageService;

    @GetMapping("/forHotel/{hotelId}")
    public List<HotelImage> getImagesForHotel(@PathVariable String hotelId){
        return this.imageService.getImagesForHotel(hotelId);
    }

    @PostMapping("/addForHotel/{hotelId}")
    public ResponseEntity<?> addImageForHotel(@PathVariable String hotelId, @RequestBody ImageForm imageForm){
        return this.imageService.addImageForHotel(hotelId,imageForm.getImageUrl())
                .map(hotelImage -> ResponseEntity.ok().body(hotelImage))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/deleteForHotel/{imageId}")
    public ResponseEntity deleteImageForHotel(@PathVariable String imageId){
        boolean result;
        result = this.imageService.deleteImageForHotel(imageId);
        if(result)
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/forRoom/{roomId}")
    public List<RoomImage> getImagesForRoom(@PathVariable String roomId){
        return this.imageService.getImagesForRoom(roomId);
    }

    @PostMapping("/addForRoom/{roomId}")
    public ResponseEntity<?> addImageForRoom(@PathVariable String roomId, @RequestBody ImageForm imageForm){
        return this.imageService.addImageForRoom(roomId,imageForm.getImageUrl())
                .map(roomImage -> ResponseEntity.ok().body(roomImage))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/deleteForRoom/{imageId}")
    public ResponseEntity deleteImageForRoom(@PathVariable String imageId){
        boolean result;
        result = this.imageService.deleteImageForRoom(imageId);
        if(result)
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}
