import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HotelBooking from './hotel'
import ResturantBooking from './resturant'
import FlightBooking from './flight'
import CabBooking from './cabs'

const Booking = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Book Your Perfect Journey
      </h1>
      
      <Tabs defaultValue="hotel" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="hotel" className="data-[state=active]:bg-purple-600">
            <i className="fas fa-hotel mr-2"/>Hotels
          </TabsTrigger>
          <TabsTrigger value="restaurant" className="data-[state=active]:bg-pink-600">
            <i className="fas fa-utensils mr-2"/>Restaurants
          </TabsTrigger>
          <TabsTrigger value="flight" className="data-[state=active]:bg-blue-600">
            <i className="fas fa-plane mr-2"/>Flights
          </TabsTrigger>
          <TabsTrigger value="cab" className="data-[state=active]:bg-orange-600">
            <i className="fas fa-taxi mr-2"/>Cabs
          </TabsTrigger>
        </TabsList>

        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-gray-200">
          <TabsContent value="hotel"><HotelBooking /></TabsContent>
          <TabsContent value="restaurant"><ResturantBooking /></TabsContent>
          <TabsContent value="flight"><FlightBooking /></TabsContent>
          <TabsContent value="cab"><CabBooking /></TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default Booking