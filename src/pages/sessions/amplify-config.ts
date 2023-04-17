// src/amplify-config.ts
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_YBTiIn9dS',
    userPoolWebClientId: '3fkp7tfclqcsckgvnlnnn1als7',
  },
});

export default Amplify;
