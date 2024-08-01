"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface ReservationSearchProps {
  onSearch: (searchTerm: string) => void;
}

export default function ReservationSearch({
  onSearch,
}: ReservationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="flex items-center gap-2 w-full" onSubmit={handleSearch}>
      <Input
        type="search"
        placeholder="Search by doctor name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        className="flex-1"
      />
      <Button type="submit">
        <SearchIcon className="w-5 h-5" />
        <span className="sr-only">Submit</span>
      </Button>
    </form>
  );
}
