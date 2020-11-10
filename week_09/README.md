<p>
This week I set up a sensorData table using PostgreSQL in order to have my sensorData continuously stored in a database. 
I plan to eventually analyze this sensorData and determine how much the temperature fluctuates in my kitchen when my roommates or I are cooking. 
The sensor is currently set up close to the fire alarm so, I will also be keeping a seperate log of instances when the fire alarm goes off in order to retroactively compare the temperature in the kitchen with the normal daily temperature vs when cooking or when the fire alarm goes off.
I used the pm2 module in order to have my database be populated on a continuous basis and modified the starter code with my credentials for my particle deviceID and access token.
</p>