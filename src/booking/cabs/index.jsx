import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

const POPULAR_LOCATIONS = [
  { id: 1, name: "Airport Terminal 1", landmark: "International Terminal" },
  { id: 2, name: "Central Station", landmark: "Main Railway Station" },
  { id: 3, name: "City Mall", landmark: "Shopping District" },
  { id: 4, name: "Business Park", landmark: "Tech Hub" }
];

const CAR_TYPES = [
  { id: 'mini', name: 'Mini', capacity: 4, price: 12, image: '🚗' },
  { id: 'sedan', name: 'Sedan', capacity: 4, price: 15, image: '🚙' },
  { id: 'suv', name: 'SUV', capacity: 6, price: 20, image: '🚓' },
  { id: 'luxury', name: 'Luxury', capacity: 4, price: 25, image: '🏎️' }
];

const DRIVERS = [
  { id: 1, name: "John Doe", rating: 4.8, trips: 1240, car: "Toyota Camry" },
  { id: 2, name: "Jane Smith", rating: 4.9, trips: 890, car: "Honda Civic" }
];

const CabBooking = () => {
  const [booking, setBooking] = useState({
    pickup: "",
    dropoff: "",
    carType: "sedan",
    date: "",
    time: "",
    passengers: 1
  });

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pickup Location */}
          <div className="space-y-2">
            <Label>Pickup Location</Label>
            <Select onValueChange={(val) => setBooking({...booking, pickup: val})}>
              <SelectTrigger>
                <SelectValue placeholder="Select pickup point" />
              </SelectTrigger>
              <SelectContent>
                {POPULAR_LOCATIONS.map(loc => (
                  <SelectItem key={loc.id} value={loc.name}>
                    <div className="flex flex-col">
                      <span>{loc.name}</span>
                      <span className="text-sm text-gray-500">{loc.landmark}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Drop Location */}
          <div className="space-y-2">
            <Label>Drop Location</Label>
            <Select onValueChange={(val) => setBooking({...booking, dropoff: val})}>
              <SelectTrigger>
                <SelectValue placeholder="Select drop point" />
              </SelectTrigger>
              <SelectContent>
                {POPULAR_LOCATIONS.map(loc => (
                  <SelectItem key={loc.id} value={loc.name}>
                    <div className="flex flex-col">
                      <span>{loc.name}</span>
                      <span className="text-sm text-gray-500">{loc.landmark}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time */}
          <div>
            <Label>Date</Label>
            <Input 
              type="date" 
              className="mt-2"
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBooking({...booking, date: e.target.value})}
            />
          </div>

          <div>
            <Label>Time</Label>
            <Input 
              type="time" 
              className="mt-2"
              onChange={(e) => setBooking({...booking, time: e.target.value})}
            />
          </div>
        </div>

        {/* Car Types */}
        <div className="mt-6">
          <Label>Select Car Type</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {CAR_TYPES.map(car => (
              <Card 
                key={car.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                  booking.carType === car.id ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setBooking({...booking, carType: car.id})}
              >
                <div className="text-3xl mb-2">{car.image}</div>
                <h3 className="font-semibold">{car.name}</h3>
                <p className="text-sm text-gray-500">Up to {car.capacity} persons</p>
                <p className="text-sm font-medium mt-2">₹{car.price}/km</p>
              </Card>
            ))}
          </div>
        </div>

        <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
          Book Now
        </Button>
      </Card>

      {/* Available Drivers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DRIVERS.map(driver => (
          <Card key={driver.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <h3 className="font-semibold">{driver.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>⭐ {driver.rating}</span>
                  <span>•</span>
                  <span>{driver.trips} trips</span>
                </div>
                <p className="text-sm text-gray-500">{driver.car}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CabBooking;