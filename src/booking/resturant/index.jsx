import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Constants
const LOCATIONS = [
  { id: 1, name: "Downtown", area: "City Center", count: 24 },
  { id: 2, name: "Midtown", area: "Business District", count: 18 },
  { id: 3, name: "East Side", area: "Cultural Hub", count: 15 }
];

const RESTAURANTS = [
  {
    id: 1,
    name: "La Bella Italia",
    type: "Fine Dining",
    cuisine: "Italian",
    rating: 4.8,
    price: "₹₹₹",
    image: "🍝",
    location: "Downtown",
    slots: ["18:00", "19:00", "20:00"],
    menu: {
      starters: [
        { name: "Bruschetta", price: 199 },
        { name: "Caprese", price: 249 }
      ],
      mains: [
        { name: "Margherita", price: 399 },
        { name: "Carbonara", price: 449 }
      ]
    },
    reviews: [
      { user: "John", rating: 5, text: "Excellent!" },
      { user: "Mary", rating: 4, text: "Great food" }
    ]
  }
];

const ResturantBooking = () => {
  const [filters, setFilters] = useState({
    location: "",
    cuisine: "",
    date: "",
    guests: 2
  });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label>Location</Label>
            <Select onValueChange={(val) => setFilters({...filters, location: val})}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map(loc => (
                  <SelectItem key={loc.id} value={loc.name}>
                    <div className="flex justify-between w-full">
                      <span>{loc.name}</span>
                      <span className="text-sm text-gray-500">{loc.count}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Date</Label>
            <Input 
              type="date" 
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setFilters({...filters, date: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Guests</Label>
            <Input 
              type="number" 
              min={1} 
              max={10}
              value={filters.guests}
              onChange={(e) => setFilters({...filters, guests: e.target.value})}
            />
          </div>

          <div className="flex items-end">
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Search Tables
            </Button>
          </div>
        </div>
      </Card>

      {/* Restaurant List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESTAURANTS.map(restaurant => (
          <Dialog key={restaurant.id}>
            <DialogTrigger asChild>
              <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{restaurant.image}</div>
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {restaurant.rating} ⭐
                  </span>
                  <span className="text-gray-600">{restaurant.price}</span>
                </div>
                <p className="text-gray-500 mt-2">{restaurant.cuisine}</p>
                <div className="mt-4 flex gap-2">
                  {restaurant.slots.map(slot => (
                    <span key={slot} className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-sm">
                      {slot}
                    </span>
                  ))}
                </div>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{restaurant.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Menu</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium">Starters</h5>
                      {restaurant.menu.starters.map(item => (
                        <div key={item.name} className="flex justify-between text-sm py-1">
                          <span>{item.name}</span>
                          <span>₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Main Course</h5>
                      {restaurant.menu.mains.map(item => (
                        <div key={item.name} className="flex justify-between text-sm py-1">
                          <span>{item.name}</span>
                          <span>₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Reviews</h4>
                  <div className="space-y-2">
                    {restaurant.reviews.map((review, idx) => (
                      <div key={idx} className="bg-gray-50 p-2 rounded">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.user}</span>
                          <span className="text-sm">⭐ {review.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{review.text}</p>
                      </div>
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

export default ResturantBooking;