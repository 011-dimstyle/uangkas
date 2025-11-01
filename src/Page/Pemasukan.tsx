import React, { useState } from "react";

import { Card } from '@/components/ui/card';


export default function Pemasukan(): React.ReactElement | undefined {
  const nameList = [<Card name="Dimas Alexander Sabian Abimanyu" />,<Card name="Dimas Alexander Sabian Abimanyu" />, <Card name="Dimas Alexander Sabian Abimanyu" />]
  const [cardList , setCardList] = useState<React.ReactNode[]>(nameList);
  return (
    <>
    <div className="p-5 flex flex-wrap gap-10">
      {cardList}
    </div>
    </>
  );
}
