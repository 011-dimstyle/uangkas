import React from "react";

export default function Pemasukan(): React.ReactElement {
  return (
    <div className="p-5">
      <input
        className=""
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => {
          const value = e.currentTarget.value;
          e.currentTarget.value.replace("/d+/", value);
        }}
      />
    </div>
  );
}
