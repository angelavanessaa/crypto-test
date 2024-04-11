import { useState, useEffect } from 'react';

const useWebSocket = (coinPair: string) => {
  const [livePrice, setLivePrice] = useState(null);

  useEffect(() => {
    const symbol = coinPair.split('/').join('').toLocaleLowerCase();
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

    // ws.onopen = () => {
    //   console.tron('connected');
    // };

    ws.onmessage = e => {
      const message = JSON.parse(e?.data);
      if (!livePrice) setLivePrice(String(message.p))
      setLivePrice(String(message.p));
    };

    // ws.onerror = e => {
    //   console.tron(e);
    // };

    // ws.onclose = e => {
    //   console.tron(e.code, e.reason);
    // };

    return () => {
      ws.close();
    }
  }, [coinPair]); // Dependency array including coinPair and price

  return { livePrice };
};

export default useWebSocket;