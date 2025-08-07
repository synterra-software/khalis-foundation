This is pragrammatic task

Follow next steps:

1. Install dependencies:
   ```npm i && npm i -D```

2. Add .env file with next content:
   ```
   NEXT_PUBLIC_SERVER_PORT=3001
   NEXT_PUBLIC_SERVER_URL=ws://localhost
   ```

3. Start development server:
   - Terminal A: ```npm run dev``` - nextjs server
   - Terminal B: ```npm run ws``` - websocket server

4. Go to http://localhost:3000 to see the result

Main architecture decisions:
- Putted websocket into context to use as 1 instance (library that I use has this flag but if we want to use something else or native implementation it will be easy to change)
- Part of components are client side to use react feature and where it is possible used server side ones
- Props drilling in home component invoked to omit multiple subscriptions to server messages

short [video](https://drive.google.com/file/d/1V6utkYGur4TTn782EBFsQBm_-rHvE5wx/view?usp=sharing) with results
