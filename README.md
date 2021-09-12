### Assessment : React app :  building list of user in map view 

### Installation
Before running the project just install the dependencies in the local node_modules folder  with this command :<br/>
`npm install`                    

In order to run the project you should use :<br/>
`npm start`

### Additional informations 
1. Map : Created with Openlayer.
2. Redux: used for state managmement .
3. Localstorage:used to store data("list of users" - "users' buildings list ") .

### Demo
we have 4 interfaces 
1. View start point will be showing a dropdown with a placeholder of the select user 

<p align="center"><img src="https://github.com/trudy19/IbtikarAssessment/blob/master/ImagesReadme/1.png" alt="Invoker"></p>


2. Show each user building list in a container after the dropdown list and Select first building from the selected user as default <br/>
after selecting the desired country, a red marker will be displayed in the right position with filled and outlined country map .

<p align="center"><img src="https://github.com/trudy19/IbtikarAssessment/blob/master/ImagesReadme/2.png" alt="Invoker"></p>
<br/>

3. on Hover of country : display Building name and Country name in a tooltip
<p align="center"><img src="https://github.com/trudy19/IbtikarAssessment/blob/master/ImagesReadme/6.png" alt="Invoker"></p>

4. We can select any building from the list to see the MapView of that building.
<br/>
<p align="center"><img src="https://github.com/trudy19/IbtikarAssessment/blob/master/ImagesReadme/3.png" alt="Invoker"></p>
<br/>
Add building to  current selected user buildings list when click in button add building and 
edit ,delete building from the building list of current user.  
<br/>

5. show the creation building view after clicking the button "add building"
<p align="center"><img src="https://github.com/trudy19/IbtikarAssessment/blob/master/ImagesReadme/4.png" alt="Invoker"></p>

6. show the edit building view after clicking the button "edit" 
<br/>
<p align="center"><img src="https://github.com/trudy19/IbtikarAssessment/blob/master/ImagesReadme/5.png" alt="Invoker"></p>

