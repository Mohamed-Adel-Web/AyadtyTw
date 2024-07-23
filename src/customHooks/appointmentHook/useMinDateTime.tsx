
"use client"
import { useState, useEffect } from 'react';

const useMinDateTime = (): string => {
  const [minDateTime, setMinDateTime] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    setMinDateTime(currentDateTime);
  }, []);

  return minDateTime;
};

export default useMinDateTime;
