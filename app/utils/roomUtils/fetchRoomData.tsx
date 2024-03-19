export default function fetchRoomData(codigo: string) {
  return fetch("/api/salas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codigo }),
  }).then(response => response.json())
}
