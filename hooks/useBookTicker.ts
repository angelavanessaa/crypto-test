import { useState, useEffect } from 'react';

const useBookTicker = (coinPair: string) => {
  const [livePrice, setLivePrice] = useState(null);
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const symbol = coinPair.split('/').join('').toLocaleLowerCase();
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth`);

    ws.onmessage = e => {
      const message = JSON.parse(e?.data);

      if (message.a) {
        setAsks(message.a);
      }

      if (message.b) {
        setBids(message.b);
      }
    };

    ws.onerror = e => {
      console.tron(e);
    };

    ws.onclose = e => {
      console.tron(e.code, e.reason);
    };

    return () => {
      ws.close();
    }
  }, [coinPair]);

  return { bids, asks };
};

export default useBookTicker;