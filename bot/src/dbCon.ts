import Redis from 'ioredis';

const con = new Redis({host:'redis-db', port:6379});

export default con;
