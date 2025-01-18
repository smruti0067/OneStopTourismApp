import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

// City Data with Pricing Multipliers
const POPULAR_CITIES = [
  { code: 'DEL', name: 'New Delhi', country: 'India', image: '🇮🇳', priceMultiplier: 1.0 },
  { code: 'DXB', name: 'Dubai', country: 'UAE', image: '🇦🇪', priceMultiplier: 1.5 },
  { code: 'JFK', name: 'New York', country: 'USA', image: '🇺🇸', priceMultiplier: 2.0 },
  { code: 'LHR', name: 'London', country: 'UK', image: '🇬🇧', priceMultiplier: 2.5 },
];

const FLIGHT_CLASSES = [
  { id: 'economy', name: 'Economy', multiplier: 1.0 },
  { id: 'premium', name: 'Premium Economy', multiplier: 1.5 },
  { id: 'business', name: 'Business', multiplier: 2.5 },
  { id: 'first', name: 'First Class', multiplier: 4.0 },
];

const BASE_PRICE = 299;
const TAX = 45;
const FEE = 25;

const FlightBooking = () => {
  const [formData, setFormData] = useState({
    tripType: 'round',
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: { adults: 1, children: 0 },
    class: 'economy',
  });

  const calculateTotalPrice = () => {
    const fromCity = POPULAR_CITIES.find(city => city.code === formData.from);
    const toCity = POPULAR_CITIES.find(city => city.code === formData.to);
    const flightClass = FLIGHT_CLASSES.find(cls => cls.id === formData.class);

    if (!fromCity || !toCity || !flightClass) return 0;

    const cityMultiplier = (fromCity.priceMultiplier + toCity.priceMultiplier) / 2;
    const passengerCount = formData.passengers.adults + formData.passengers.children;
    const classMultiplier = flightClass.multiplier;

    return (
      (BASE_PRICE * cityMultiplier * classMultiplier * passengerCount) +
      TAX +
      FEE
    );
  };

  return (
    <div className="space-y-8">
      {/* Trip Type Selection */}
      <Card className="p-6">
        <RadioGroup
          defaultValue="round"
          className="flex space-x-4 bg-slate-100 p-1 rounded-lg"
          onValueChange={(val) => setFormData({ ...formData, tripType: val })}
        >
          <div className="flex-1">
            <RadioGroupItem value="round" id="round" className="peer sr-only" />
            <Label
              htmlFor="round"
              className="flex justify-center items-center p-2 rounded-md peer-data-[state=checked]:bg-white peer-data-[state=checked]:shadow cursor-pointer"
            >
              ✈️ Round Trip
            </Label>
          </div>
          <div className="flex-1">
            <RadioGroupItem value="one" id="one" className="peer sr-only" />
            <Label
              htmlFor="one"
              className="flex justify-center items-center p-2 rounded-md peer-data-[state=checked]:bg-white peer-data-[state=checked]:shadow cursor-pointer"
            >
              🛫 One Way
            </Label>
          </div>
        </RadioGroup>

        {/* Cities Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Label>From</Label>
            <Select onValueChange={(val) => setFormData({ ...formData, from: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select departure city" />
              </SelectTrigger>
              <SelectContent>
                {POPULAR_CITIES.map(city => (
                  <SelectItem key={city.code} value={city.code}>
                    <span className="flex items-center gap-2">
                      <span>{city.image}</span>
                      <span>{city.name}</span>
                      <span className="text-sm text-gray-500">({city.code})</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <Select onValueChange={(val) => setFormData({ ...formData, to: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select arrival city" />
              </SelectTrigger>
              <SelectContent>
                {POPULAR_CITIES.map(city => (
                  <SelectItem key={city.code} value={city.code}>
                    <span className="flex items-center gap-2">
                      <span>{city.image}</span>
                      <span>{city.name}</span>
                      <span className="text-sm text-gray-500">({city.code})</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Class and Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Label>Class</Label>
            <Select onValueChange={(val) => setFormData({ ...formData, class: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {FLIGHT_CLASSES.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Summary */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h3 className="font-semibold mb-2">Price Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>₹{BASE_PRICE}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{TAX}</span>
            </div>
            <div className="flex justify-between">
              <span>Fees</span>
              <span>₹{FEE}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>₹{calculateTotalPrice()}</span>
            </div>
          </div>
        </div>

        <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
          Search Flights
        </Button>
      </Card>
    </div>
  );
};

export default FlightBooking;
