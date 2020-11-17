<img src='Findl Project Sketches.png' alt="Final Sketches" />

<h3> Final Project 1 <h3/>
<p>
Final Project 1 consists of designing an interface for the AA Meetings website in NYC. I've parsed the meeting data from all of the html files from all of the meeting zones and loaded it into a PostgreSQL database. 
My final design consists of a map of NYC with a dot representing each AA meetings location using the latitude and longitude. Each dot will have a different color that will vary depending on it's meeting type.
I hope to be able to make the map interactive so that when someone toggles over a specific dot they will see that meetings information appear below the map.
I hope to also have filters on the side of the map for meetings days, times, special interests and wheelchair accessibility. 
If an individual were to select one of these filters the dots on the map would appear at a higher opacity or be highlighted on the map. 
The legend will also show the color coding of each dot as they relate to the meeting type.
The indidivual could then click on one of the meetings on the map that have been highlighted based on their specific criteria in order to decide which specific meeting to attend. 
This will require aggregation in the filters by special interests, meeting dates, meeting times, and wheelchair accessibility with various SQL SELECT statements so that individuals can then filter the map for the meeting of their choice. 
The default view is the map of New York City with a dot for each AA meeting. The filtered view will have certain dots highlighted and others with a very low opacity.
I am assuming the user of the page will have a basic understanding of how to apply a filter to a site and will be able to understand that meetings are color coded based on their type.
<p/>
<h3> Final Project 2 <h3/>
<p>
Final Project 2 is a running diary or recommendation list of restaurants I have visited in the past several months. 
I will include information on whether or not I liked the restaurant, the date I attended and what I've ordered. 
I also hope to add an interactive feature on the side with a filter of whether or not I would recommend the restaurant.
This way users can filter based on the recommendation.
The default view is a running list of all of the restaurants I've visited.
My main assumption is that the user is looking for a list of restaurants around New York City. 
<p/>

<h3> Final Project 3 <h3/>
<p>
Final Project 3 is an interface for the sensor data currently recording the temperature in my kitchen.
My roommates and I had noticed that although our apartment is normally devastatingly hot the temperature drastically increases in the kitchen when we are cooking and causes the fire alarm to go off. 
The sensor data is writing the temperature to my database once every 5 mins. I will additionally keep a running log on the side that will list the date and time the fire alarm goes off and whether or not we were cooking at that time. 
I want the interface to have a drop down feature where the user is able to select the date and time the fire alarm was set off and then view a line graph of the temperature readings in my apartment 20 mins before and after the alarm was set off. 
I hope this will eventually give us a good idea of how hot it has to get in the kitchen for the alarm to be set off.
The default view will be the last time the alarm went off along with a line chart showing the temperature values surrounding the time. 
There will also be a highlighted area stating whether or not we were cooking at that time. 
I want the user to be able to toggle over the line and read the temperature at that point. 
I also eventually hope to calculate the average temperature the kitchen reaches when the fire alarm is set off.
<p/>