# Team Binary Bandits + Purple

## Team Members
Samiul Islam <br>
Oneeb Aamer <br>
Shivam Acharya <br>
Leena Maulvi <br>
Cem Ratip <br>
Sifa Shaikh <br>
Tahseen Humaira <br>

## Deployed Application
Project URL: https://seg-large-group.vercel.app/ <br>
#### Job searcher login credentials:
Email:  <br>
Password:
#### Company login credentials:
Email:  <br>
Password:

## Installation Instructions
1. Clone the repository.
2. ```cd backend```
3. Create a .env file in the backend directory and add the following environment variables: <br>
```AWS_ACCESS_KEY_ID=AKIAWQAQTTQM4KT6WI7Y``` <br>
```AWS_SECRET_ACCESS_KEY=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```<br>
4. ```npm install```
5. ```npm run build```
6. ```npm run dev```
7. ```cd ..```
8. ```cd frontend```
9. Create a .env file in the frontend directory and add the following environment variables: <br>
```REACT_APP_BACKEND_URL=http://localhost:8000/``` <br>
```REACT_APP_GOOGLE_API_KEY=AIzaSyC0FpC_LZEQb2iyXwOEcyM57llwjE9hBOQ```<br>
10. ```npm install```
11. ```npm run build```
12. ```npm run start```

## Testing Instructions
Run frontend tests:
1. ```cd frontend```
2. ```npm run test:coverage``` <br>

Run backend tests:
1. ```cd backend```
2. ```npx jest --coverage```

## Code References
Infinite scroll feature (JobList.js lines 6-78): https://webdesign.tutsplus.com/tutorials/how-to-implement-infinite-scrolling-with-javascript--cms-37055

