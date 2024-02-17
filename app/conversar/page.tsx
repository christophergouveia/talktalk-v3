"use client";

import { useEffect, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';

export default function ConversarHome() {
    const [conn, setConn] = useState<DataConnection | null>(null);

  useEffect(() => {

    const peer = new Peer();

    peer.on('connection', (connection) => {
      console.log('Conexão recebida:', connection);
    });
  }, []);

  const sendMessage = (message: any) => {
    if (conn) {
      conn.send(message);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <section className="w-2/3 h-[68%] shadow-lg dark:shadow-none dark:border dark:border-gray-400 rounded-lg m-auto">
        <div className="flex items-center justify-center">
            <div className="perfil-content">
                <div className="rounded-full w-56 h-56 bg-black"></div>
                <form>
                    <input type="text" name="nickname"/>
                </form>

            </div>
        </div>
      </section>
    </div>
  );
}