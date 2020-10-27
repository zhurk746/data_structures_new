For this weeks assignments I had to populate my database with meeting information for all AA meeting zones.
I used previous starter code and had to reconsider how to parse particular parts of the meeting. 
I noticed that the scrub I had put together using a sequence of split and regular expressions did not work when applied to all zones. 
I found splitting the table on the string containing it's specific html type and then zeroing in on the data by replacing sequences of n's and t's 
as well, as trim and map functions worked best to clear the data. I had each piece of data correspond to a particular meeting even if meetings were held at the same location so I ended up geocoding multiple times. 
