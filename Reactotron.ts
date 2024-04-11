let Reactotron;

declare global {
  interface Console {
    /**
     * Print message on Reactotron
     * @memberof Console
     */
    tron: (...messages: any[]) => void;
  }
}

if (__DEV__) {
  const _Reactotron = require('reactotron-react-native');
  Reactotron = _Reactotron.default;

  Reactotron.configure({
      name: 'CryptoClone',
    })
    .use(_Reactotron.trackGlobalErrors())
    .use(_Reactotron.openInEditor())
    .use(_Reactotron.overlay())
    .use(_Reactotron.asyncStorage())
    .use(_Reactotron.networking());

  console.tron = Reactotron.log;
} else {
  console.tron = () => {
    // return empty function on not DEV
  };
}

export default Reactotron;
