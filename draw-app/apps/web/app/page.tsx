"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomSlug, setRoomSlug] = useState("");
  const router = useRouter();

  function joinRoom() {
    const slug = roomSlug.trim();

    if (!slug) {
      return;
    }

    router.push(`/room/${encodeURIComponent(slug)}`);
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw"
    }}>
      <form onSubmit={(event) => {
        event.preventDefault();
        joinRoom();
      }}>
        <input style={{
          padding: 10
        }} value={roomSlug} onChange={(e) => {
          setRoomSlug(e.target.value);
        }} type="text" placeholder="Room slug" required></input>

        <button style={{padding: 10}} type="submit">Join room</button>
      </form>
    </div>
  );
}
