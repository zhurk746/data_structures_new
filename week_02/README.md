I first installed the cheerio module in order to obtain functionality that would allow me to parse the data within the Zone 6.
Using the starter code as a base, I substituted the text file that contained the html of information related to AA meetings in zone 6 so that cheerio would be able to parse the contents of the file. 
I let "Address" equal the blank array that functions within cheerio as well as, split Javascript functions would fill with the street addresses of each AA meeting within Zone 6 as requested within the assignment. 
I used cheerio to split the code at each "td" as I noticed that information for each AA meeting was listed within a seperate <td> in the html code. 
From there, I noticed that Street addresses were followed a "b" and "br" line within the html code. 
Thus, I used a split function at the <br> and noticed that the third element returned for each meeting was the street address. 
To further clean up and shorten the address I used split on a "," and a ".". 
I then transferred the array of shortened street addresses into a .txt file as requested within the Assignment. 
