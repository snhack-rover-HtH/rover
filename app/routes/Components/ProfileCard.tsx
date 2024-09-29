import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'; // Adjust this import based on your directory structure
import { Button } from './ui/button'; // Adjust this import based on your directory structure
import { User } from 'lucide-react'; // Import icons from lucide-react
import { useLoaderData } from '@remix-run/react';
import { createClient } from '@supabase/supabase-js';

// Loader function to fetch data from the "location" table
export const loader = async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data } = await supabase.from('location').select('room_number');
  return data;
};

const ProfileCard: React.FC = () => {
  const locations = useLoaderData() as { room_number: string }[]; // Get locations from loader
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [location, setLocation] = useState('CRX101'); // Default to the first location
  const [tempName, setTempName] = useState(name);
  const [tempLocation, setTempLocation] = useState(location);

  const handleEdit = () => {
    setIsEditing(true);
    setTempName(name);
    setTempLocation(location);
  };

  const handleSave = () => {
    setName(tempName);
    setLocation(tempLocation);
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setTempName(name);
    setTempLocation(location);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-full">
          <User className="h-8 w-8 text-gray-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          {isEditing ? (
            <>
              <input
                type="text"
                className="border p-2 text-lg font-medium"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
              <select
                className="border p-2 text-sm"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
              >
                {locations.map((loc: { room_number: string }) => (
                  <option key={loc.room_number} value={loc.room_number}>
                    {loc.room_number}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <p className="text-lg font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{location}</p>
            </>
          )}
        </div>
        <div className="flex space-x-2 mt-4">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="outline" size="sm" onClick={handleDiscard}>
                Discard Changes
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )} 
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
