import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// Add locations data
const LOCATIONS = [
  { id: 1, name: "Downtown", hotels: 12 },
  { id: 2, name: "Beach Front", hotels: 8 },
  { id: 3, name: "City Center", hotels: 15 },
  { id: 4, name: "Airport Area", hotels: 6 },
  { id: 5, name: "Business District", hotels: 10 }
];

const HOTELS = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "Downtown",
    rating: 4.8,
    price: 2999,
    image: "🏨",
    amenities: ["Pool", "Spa", "Gym", "WiFi"],
    rooms: [
      { type: "Deluxe", price: 2999, capacity: 2 },
      { type: "Suite", price: 4999, capacity: 4 },
      { type: "Presidential", price: 9999, capacity: 4 }
    ],
    reviews: [
      { user: "James", rating: 5, comment: "Excellent stay!" },
      { user: "Sarah", rating: 4.5, comment: "Great service" }
    ]
  },
  {
    id: 2,
    name: "Seaside Resort",
    location: "Beach Front",
    rating: 4.9,
    price: 3999,
    image: "🌊",
    amenities: ["Private Beach", "Restaurant", "Bar", "WiFi"],
    rooms: [
      { type: "Ocean View", price: 3999, capacity: 2 },
      { type: "Beach Suite", price: 5999, capacity: 3 },
      { type: "Villa", price: 12999, capacity: 6 }
    ],
    reviews: [
      { user: "Michael", rating: 5, comment: "Perfect beach getaway!" },
      { user: "Emma", rating: 5, comment: "Amazing views" }
    ]
  }
];

const HotelBooking = () => {
  const [filters, setFilters] = useState({
    location: "",
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 2,
    rooms: 1
  });

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Location Dropdown */}
          <div className="lg:col-span-3">
            <Label>Location</Label>
            <Select onValueChange={(val) => setFilters({...filters, location: val})}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map(loc => (
                  <SelectItem key={loc.id} value={loc.name}>
                    <div className="flex justify-between">
                      <span>{loc.name}</span>
                      <span className="text-gray-500 text-sm">{loc.hotels} hotels</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="lg:col-span-6">
            <Label>Check In - Check Out</Label>
            <div className="flex gap-4 mt-2">
              <Calendar
                selected={filters.checkIn}
                onSelect={(date) => setFilters({...filters, checkIn: date})}
                className="border rounded-md"
                mode="single"
              />
              <Calendar
                selected={filters.checkOut}
                onSelect={(date) => setFilters({...filters, checkOut: date})}
                className="border rounded-md"
                mode="single"
              />
            </div>
          </div>

          {/* Rooms & Guests */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div>
                <Label>Rooms</Label>
                <Select 
                  value={filters.rooms.toString()} 
                  onValueChange={(val) => setFilters({...filters, rooms: parseInt(val)})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Room' : 'Rooms'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Guests</Label>
                <Select 
                  value={filters.guests.toString()}
                  onValueChange={(val) => setFilters({...filters, guests: parseInt(val)})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
          Search Hotels
        </Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HOTELS.map(hotel => (
          <Dialog key={hotel.id}>
            <DialogTrigger asChild>
              <Card className="p-6 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-4xl mb-3">{hotel.image}</div>
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <p className="text-gray-500">{hotel.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {hotel.rating} ⭐
                      </span>
                      <span className="text-lg font-semibold">₹{hotel.price}</span>
                    </div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {hotel.amenities.map(amenity => (
                    <span key={amenity} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{hotel.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Room Types</h4>
                  <div className="space-y-2">
                    {hotel.rooms.map(room => (
                      <Card key={room.type} className="p-3">
                        <div className="flex justify-between">
                          <div>
                            <h5 className="font-medium">{room.type}</h5>
                            <p className="text-sm text-gray-500">Up to {room.capacity} guests</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{room.price}</p>
                            <Button size="sm" className="mt-2">Book Now</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Guest Reviews</h4>
                  <div className="space-y-2">
                    {hotel.reviews.map((review, idx) => (
                      <Card key={idx} className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.user}</span>
                          <span>⭐ {review.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default HotelBooking;