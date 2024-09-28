import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'; // Adjust this import based on your directory structure
import { Button } from './ui/button'; // Adjust this import based on your directory structure
import { User } from 'lucide-react'; // Import icons from lucide-react

const ProfileCard: React.FC = () => {
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
          <p className="text-lg font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm">
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
