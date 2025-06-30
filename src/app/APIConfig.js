import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '@/aws-exports';

Amplify.configure(config);
const API = generateClient();

export default API;