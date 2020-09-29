I first took JSON data for aa locations in zone 6 and thought about how I would put them into a SQL database. 
I have basic/intermediate SQL knowledge so it was evident to me that I should create a table that had columns with the names of what each element within my JSON object represented. 
I created a PostgreSQL database in AWS named aa that I then planned to insert my aa JSON data elements into. 
I created a table called aalocations that had 3 columns called address, lat and long. Refer to file week4 javascript for further detail. 
I then inserted data into the SQL table where I was able to logically position each element within the JSON object to its corresponding column in my SQL table. 
Thus, streetAddress data moved into the address column, latitude into the lat column and longitude into the long column. Refer to week4populate javascript for detail. 
Then, to ensure the process ran as expected I checked and viewed the data within my newly formed PostgreSQL table using a sequel Select All command by substiting the all with an asterics. 