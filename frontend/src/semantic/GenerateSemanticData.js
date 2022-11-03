
const GenerateSemanticData={

    createTouristTripFromOffer:(offer)=>{
        return{
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: "Trip to "+offer.location,
            description: "Tourist trip to "+offer.location+" while staying in hotel "+offer.hotelName,
            image: offer.imageUrl,
            arrivalTime: offer.startDate.split('/').reverse().join("-")+"T10:00",
            departureTime: offer.endDate.split('/').reverse().join("-")+"T15:00",
            offers:{
                "@type": "Offer",
                name: "Trip proposed by FlyAway for tourists around the world.",
                description: "The price is for the selected trip per night. Plane tickets not included.",
                price: offer.pricePerNight,
                priceCurrency: "EUR",
                offeredBy: {
                    "@type": "Organization",
                    name: "FlyAway",
                    url: "http://localhost:3000/"
                }
            }
        }
    },

    createTouristTripItem:(touristTrip)=>{
      return{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: "Trip in hotel: " + touristTrip.hotelForTrip.name,
          description: "Tourist trip to "+touristTrip.hotelForTrip.hotelLocation.city+" while staying in hotel "+touristTrip.hotelForTrip.name,
          image: touristTrip.hotelImages[0],
          arrivalTime: touristTrip.startTime.split('/').reverse().join("-")+"T10:00",
          departureTime: touristTrip.endTime.split('/').reverse().join("-")+"T15:00",
          offers:{
              "@type": "Offer",
              name: "Trip proposed by FlyAway for tourists around the world.",
              description: "The price is for the selected trip per night. Plane tickets not included.",
              price: touristTrip.pricePerNight,
              priceCurrency: "EUR",
              offeredBy: {
                  "@type": "Organization",
                  name: "FlyAway",
                  url: "http://localhost:3000/"
              }
          }
      }
    },

    createReview:(review)=>{
      return{
          "@context": "https://schema.org/",
          "@type": "Review",
          author:review.userGivesReview.username,
          datePublished:review.time,
          reviewBody: review.description,
          itemReviewed:{
              "@type": "Organization",
              name: "FlyAway",
          },
          reviewRating:{
              "@type": "Rating",
              ratingValue: review.stars,
              worstRating: 1,
              bestRating: 5,
          }
      }
    },

    createHotelReview:(hotelReview)=>{
        return{
            "@context": "https://schema.org/",
            "@type": "Review",
            author:hotelReview.author,
            datePublished:hotelReview.datePublished,
            reviewBody: hotelReview.reviewBody,
            itemReviewed:{
                "@type": "Hotel",
                name: hotelReview.hotelName,
            },
            reviewRating:{
                "@type": "Rating",
                ratingValue: hotelReview.reviewRating,
                worstRating: 1,
                bestRating: 5,
            }
        }
    },

    createTouristDestination:(destination)=>{
        return{
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: destination.destinationLocation.city,
            tourBookingPage: "http://localhost:3000/trips",
            image:destination.destinationThumbnail,
            geo: {
            "@type": "GeoCoordinates",
                latitude: destination.destinationLocation.latitude,
                longitude: destination.destinationLocation.longitude
            },
        }
    },

    createTouristDestinationDetails:(destination, location)=>{
        return{
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: location.city,
            tourBookingPage: "http://localhost:3000/trips",
            image:destination.destinationThumbnail,
            geo: {
                "@type": "GeoCoordinates",
                latitude: location.latitude,
                longitude: location.longitude
            },
        }
    },

    createTouristAttraction:(attraction)=>{
        return{
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name:attraction.name,
            description:attraction.description,
            image:attraction.imageUrl,
            geo: {
                "@type": "GeoCoordinates",
                latitude: attraction.latitude,
                longitude: attraction.longitude
            },
        }
    },

    createHotel:(hotel, location)=>{
        return{
            "@context": "https://schema.org",
            "@type": "Hotel",
            name:hotel.name,
            checkinTime:hotel.checkInHour+":00",
            checkoutTime:hotel.checkOutHour+":00",
            starRating: {
                "@type": "Rating",
                ratingValue: hotel.stars
            },
            address: {
                "@type": "PostalAddress",
                addressCountry: location.country,
                addressRegion: location.city,
                streetAddress: hotel.address
            },
            geo: {
                "@type": "GeoCoordinates",
                latitude: location.latitude,
                longitude: location.longitude
            },
        }
    },

    createRoom:(room)=>{
        return{
            "@context": "https://schema.org",
            "@type": "HotelRoom",
            bed: room.roomType,
            occupancy:room.numberOfGuests,
            photo:room.roomImages[0],
            name: room.roomType + " room for " + room.numberOfGuests + " quests"
        }
    }
}

export default GenerateSemanticData;