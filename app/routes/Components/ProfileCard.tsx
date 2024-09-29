import React from 'react';
import { Card, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { User, Mail, MapPin } from 'lucide-react';

const ProfileCard: React.FC = () => {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-b-[40px]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <div className="h-16 w-16 bg-white rounded-full p-1 shadow-md">
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-300 rounded-full">
              <User className="h-8 w-8 text-indigo-700" />
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-6 pt-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-indigo-500" />
            <p className="text-lg font-medium text-gray-800">John Doe</p>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-indigo-500" />
            <p className="text-sm text-gray-600">john.doe@example.com</p>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-indigo-500" />
            <p className="text-sm text-gray-600">New York, USA</p>
          </div>
        </div>
        <div className="mt-6">
          <Button 
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white transition-all duration-300"
          >
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;