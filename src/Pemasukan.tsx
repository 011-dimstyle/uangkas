import React from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Pemasukan(): React.ReactElement {
  return (
    <div className="p-5 flex items-center overflow-y-auto">
      {/* <Input className="h-7 w-70 focus:ring-0 focus:ring-offset-0 focus:outline-none outline-none" type="text" placeholder="Rp" onChange={e => {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
      }}
      />
      <Checkbox className="h-7 w-7" onCheckedChange={e => console.log(e) }/> */}
      <Card >
        hei
      </Card>
    </div>
  );
}
