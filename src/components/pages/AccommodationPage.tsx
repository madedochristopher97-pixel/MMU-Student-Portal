import { useState } from 'react';
import { Building2, Users, Bed, MapPin, Check, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

// Hostel blocks configuration
const hostelBlocks = [
  { id: 'block-a', name: 'Block A', gender: 'Ladies', totalRooms: 90, color: 'bg-pink-100 border-pink-300' },
  { id: 'block-b', name: 'Block B', gender: 'Ladies', totalRooms: 85, color: 'bg-pink-100 border-pink-300' },
  { id: 'block-c', name: 'Block C', gender: 'Boys', totalRooms: 95, color: 'bg-blue-100 border-blue-300' },
  { id: 'block-d', name: 'Block D', gender: 'Boys', totalRooms: 88, color: 'bg-blue-100 border-blue-300' },
  { id: 'block-e', name: 'Block E', gender: 'Boys', totalRooms: 92, color: 'bg-blue-100 border-blue-300' },
];

// Room types
const roomTypes = [
  { 
    id: 'ordinary', 
    name: 'Ordinary Room', 
    capacity: 4, 
    price: 10000,
    features: ['4 Beds', 'Shared Bathroom', 'Study Desk', 'Wardrobe'],
    description: 'Standard accommodation for 4 students'
  },
  { 
    id: 'rooftop', 
    name: 'Rooftop Room', 
    capacity: 2, 
    price: 12000,
    features: ['2 Beds', 'Private Bathroom', 'Study Desk', 'Wardrobe', 'Premium Finishing', 'Better Ventilation'],
    description: 'Premium accommodation for 2 students with enhanced amenities'
  },
];

// Generate sample room data
const generateRooms = () => {
  const rooms = [];
  let roomId = 1;

  hostelBlocks.forEach((block) => {
    const ordinaryRooms = Math.floor(block.totalRooms * 0.85); // 85% ordinary
    const rooftopRooms = block.totalRooms - ordinaryRooms; // 15% rooftop

    // Generate ordinary rooms
    for (let i = 1; i <= ordinaryRooms; i++) {
      const occupied = Math.random() > 0.4; // 60% occupancy
      rooms.push({
        id: roomId++,
        blockId: block.id,
        blockName: block.name,
        roomNumber: `${block.name.split(' ')[1]}${String(i).padStart(3, '0')}`,
        type: 'ordinary',
        capacity: 4,
        occupied: occupied ? Math.floor(Math.random() * 4) + 1 : 0,
        price: 10000,
        floor: Math.floor((i - 1) / 20) + 1,
        status: occupied ? 'occupied' : 'available'
      });
    }

    // Generate rooftop rooms
    for (let i = 1; i <= rooftopRooms; i++) {
      const occupied = Math.random() > 0.5; // 50% occupancy for premium
      rooms.push({
        id: roomId++,
        blockId: block.id,
        blockName: block.name,
        roomNumber: `${block.name.split(' ')[1]}R${String(i).padStart(2, '0')}`,
        type: 'rooftop',
        capacity: 2,
        occupied: occupied ? Math.floor(Math.random() * 2) + 1 : 0,
        price: 12000,
        floor: 'Rooftop',
        status: occupied ? 'occupied' : 'available'
      });
    }
  });

  return rooms;
};

const allRooms = generateRooms();

// Mock current booking for the student
const currentBooking = {
  roomNumber: 'C045',
  blockName: 'Block C',
  roomType: 'Ordinary Room',
  capacity: 4,
  price: 10000,
  floor: 3,
  bookedDate: '15/01/2024',
  expiryDate: '15/12/2024',
};

export function AccommodationPage() {
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedRoomType, setSelectedRoomType] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [hasBooking] = useState(true); // Set to true to show current booking

  // Filter rooms
  const filteredRooms = allRooms.filter((room) => {
    const blockMatch = selectedBlock === 'all' || room.blockId === selectedBlock;
    const typeMatch = selectedRoomType === 'all' || room.type === selectedRoomType;
    const availableMatch = room.occupied < room.capacity;
    return blockMatch && typeMatch && availableMatch;
  });

  const handleBookRoom = (room: any) => {
    setSelectedRoom(room);
    setShowBookingDialog(true);
  };

  const confirmBooking = () => {
    alert(`Room ${selectedRoom.roomNumber} booked successfully! Please proceed to payments to confirm your booking.`);
    setShowBookingDialog(false);
    setSelectedRoom(null);
  };

  // Calculate statistics
  const totalRooms = allRooms.length;
  const availableRooms = allRooms.filter(r => r.occupied < r.capacity).length;
  const occupancyRate = Math.round(((totalRooms - availableRooms) / totalRooms) * 100);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Accommodation</h1>
        <p className="text-slate-600">View and book hostel accommodation</p>
      </div>

      {/* Current Booking Card */}
      {hasBooking && (
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900 mb-1">Your Current Booking</h3>
                <p className="text-sm text-slate-600">Active accommodation details</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <Check className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-600 mb-1">Room Number</p>
                <p className="text-slate-900">{currentBooking.roomNumber}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Block</p>
                <p className="text-slate-900">{currentBooking.blockName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Room Type</p>
                <p className="text-slate-900">{currentBooking.roomType}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Price/Semester</p>
                <p className="text-green-600">KES {currentBooking.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-orange-200 flex justify-between items-center">
              <div className="text-sm text-slate-600">
                Booked on {currentBooking.bookedDate} • Valid until {currentBooking.expiryDate}
              </div>
              <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                Cancel Booking
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Building2 className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-slate-600">Total Rooms</p>
          </div>
          <p className="text-slate-900">{totalRooms}</p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bed className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-slate-600">Available Rooms</p>
          </div>
          <p className="text-green-600">{availableRooms}</p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-slate-600">Occupancy Rate</p>
          </div>
          <p className="text-slate-900">{occupancyRate}%</p>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-slate-600">Hostel Blocks</p>
          </div>
          <p className="text-slate-900">{hostelBlocks.length}</p>
        </Card>
      </div>

      {/* Hostel Blocks Overview */}
      <div>
        <h3 className="text-slate-900 mb-4">Hostel Blocks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {hostelBlocks.map((block) => {
            const blockRooms = allRooms.filter(r => r.blockId === block.id);
            const blockAvailable = blockRooms.filter(r => r.occupied < r.capacity).length;
            
            return (
              <Card key={block.id} className={`${block.color} border-2 shadow-lg p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-slate-900 mb-1">{block.name}</h4>
                    <p className="text-xs text-slate-600">{block.gender}</p>
                  </div>
                  <Building2 className="w-5 h-5 text-slate-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Rooms:</span>
                    <span className="text-slate-900">{block.totalRooms}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Available:</span>
                    <span className="text-green-600">{blockAvailable}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Room Types */}
      <div>
        <h3 className="text-slate-900 mb-4">Room Types & Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roomTypes.map((roomType) => (
            <Card key={roomType.id} className="bg-white border-slate-200 shadow-lg overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-slate-900">{roomType.name}</h4>
                  <p className="text-orange-600">KES {roomType.price.toLocaleString()}/semester</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">{roomType.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-600">Capacity: {roomType.capacity} students</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-900">Features:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {roomType.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white border-slate-200 shadow-lg p-6">
        <h3 className="text-slate-900 mb-4">Find Available Rooms</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="block-filter">Hostel Block</Label>
            <Select value={selectedBlock} onValueChange={setSelectedBlock}>
              <SelectTrigger id="block-filter" className="bg-slate-50">
                <SelectValue placeholder="All Blocks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blocks</SelectItem>
                {hostelBlocks.map((block) => (
                  <SelectItem key={block.id} value={block.id}>
                    {block.name} ({block.gender})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="room-type-filter">Room Type</Label>
            <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
              <SelectTrigger id="room-type-filter" className="bg-slate-50">
                <SelectValue placeholder="All Room Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Room Types</SelectItem>
                <SelectItem value="ordinary">Ordinary Room (4 People)</SelectItem>
                <SelectItem value="rooftop">Rooftop Room (2 People)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSelectedBlock('all');
                setSelectedRoomType('all');
              }}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Available Rooms List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900">Available Rooms ({filteredRooms.length})</h3>
          {(selectedBlock !== 'all' || selectedRoomType !== 'all') && (
            <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
              Filtered Results
            </Badge>
          )}
        </div>

        {filteredRooms.length === 0 ? (
          <Card className="bg-white border-slate-200 shadow-lg p-12 text-center">
            <X className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">No available rooms found</p>
            <p className="text-sm text-slate-500">Try adjusting your filters</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.slice(0, 12).map((room) => (
              <Card key={room.id} className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-slate-900">Room {room.roomNumber}</p>
                      <p className="text-xs text-slate-600">{room.blockName} • Floor {room.floor}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                      Available
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Type:</span>
                      <span className="text-slate-900">{room.type === 'ordinary' ? 'Ordinary' : 'Rooftop'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Capacity:</span>
                      <span className="text-slate-900">{room.capacity} people</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Occupied:</span>
                      <span className="text-orange-600">{room.occupied}/{room.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Price:</span>
                      <span className="text-green-600">KES {room.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleBookRoom(room)}
                    disabled={hasBooking}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    size="sm"
                  >
                    {hasBooking ? 'Already Booked' : 'Book Room'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredRooms.length > 12 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Showing 12 of {filteredRooms.length} available rooms
            </p>
          </div>
        )}
      </div>

      {/* Booking Confirmation Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Room Booking</DialogTitle>
            <DialogDescription>
              Review the room details before confirming your booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedRoom && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Room Number</p>
                  <p className="text-slate-900">{selectedRoom.roomNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Block</p>
                  <p className="text-slate-900">{selectedRoom.blockName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Room Type</p>
                  <p className="text-slate-900">{selectedRoom.type === 'ordinary' ? 'Ordinary Room' : 'Rooftop Room'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Capacity</p>
                  <p className="text-slate-900">{selectedRoom.capacity} people</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Floor</p>
                  <p className="text-slate-900">{selectedRoom.floor}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Price</p>
                  <p className="text-green-600">KES {selectedRoom.price.toLocaleString()}/semester</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> After confirming, please proceed to the Financials section to complete payment. 
                  Your booking will be confirmed once payment is received.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking} className="bg-orange-600 hover:bg-orange-700">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
