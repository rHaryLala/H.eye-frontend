'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import FaceRecognition from '@/components/face-recognition';

export default function AttendancePage() {
  const [isCapturing, setIsCapturing] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Système de Présence</h1>
      <div className="mb-6">
        <Button 
          onClick={() => setIsCapturing(!isCapturing)}
          variant={isCapturing ? "destructive" : "default"}
        >
          {isCapturing ? "Arrêter la Caméra" : "Démarrer la Caméra"}
        </Button>
      </div>
      
      {isCapturing && (
        <div className="border rounded-lg p-4 bg-muted/20">
          <FaceRecognition />
        </div>
      )}
    </div>
  );
}
