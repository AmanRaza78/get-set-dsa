"use client";

import { useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { levelValues } from "@/lib/levelTypes";

export default function SelectLevels() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <input type="hidden" name="level" value={selectedLevel || ""} />
      {levelValues.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={
              selectedLevel === item.name
                ? "border-primary border-2"
                : "border-2 border-primary/10"
            }
            onClick={()=>setSelectedLevel(item.name)}
          >
            <CardHeader>
                <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}