import Mockup from './mockup';

declare var NODE_ENV: string;

new Mockup(NODE_ENV !== 'development');
