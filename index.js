function loadCharacter(peopleUrl) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          var htmlTag="<p id='next'></p>";
              htmlTag+="<div class='container'><h2>Person</h2><div class='list-group'>";          
              htmlTag+="<a rel='' class='list-group-item '><h4 class='list-group-item-heading'>Name : ";
              htmlTag+=myObj.name + "</h4>";
              htmlTag+="<p class='list-group-item-text'>Height : "+myObj.height+"</p>";
              htmlTag+="<p class='list-group-item-text'>Mass :"+myObj.mass+"</p>";
              htmlTag+="<p class='list-group-item-text'>Hair Color : "+myObj.hair_color+"</p>";
              htmlTag+="<p class='list-group-item-text'>Skin Color : "+myObj.skin_color+"</p>";
              htmlTag+="<p class='list-group-item-text'>Eye Color : "+myObj.eye_color+"</p>";
              htmlTag+="<p class='list-group-item-text'>Birth Year : "+myObj.birth_year+"</p>";
              htmlTag+="<p class='list-group-item-text'>Gender : "+myObj.gender+"</p>";
              htmlTag+="<p class='list-group-item-text'>Homeworld : "+myObj.homeworld+"</p>";
              htmlTag+="<p class='list-group-item-text'>Films : "+setUrl(myObj.films)+"<p id='demo'><br>Films Information:"+loadFilms(myObj.films)+"</p></p>";
              htmlTag+="<p class='list-group-item-text'>Species : "+setUrl(myObj.species)+"</p>";
              htmlTag+="<p class='list-group-item-text'>Vehicles : "+setUrl(myObj.vehicles)+"</p>";
              htmlTag+="<p class='list-group-item-text'>Starships : "+setUrl(myObj.starships)+"</p>";
              htmlTag+="<p class='list-group-item-text'>Created : "+myObj.created+"</p>";
              htmlTag+="<p class='list-group-item-text'>Edited : "+myObj.edited+"</p>";
              htmlTag+="<p class='list-group-item-text'>URL : "+myObj.url+"</p>";
              htmlTag+="</a>"; 
              htmlTag+="</div></div>";
       
             document.getElementById("content").innerHTML=htmlTag;
       }
      
       };
  xhttp.open("GET", peopleUrl, true);
  xhttp.send();
 }
 countBar=function (barURL,buttonTag){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          for (var item of myObj.results){
            buttonTag+="<button id='"+item.url+"' class='btn btn-success' type='button' onClick=loadCharacter('"+item.url+"') >"+item.name+"</button>";
          }
            if(myObj.next==null){
            document.getElementById("next").innerHTML+=buttonTag+"</div><div id='container'><p id='content'></p></div>";
          }else{
            countBar(myObj.next,buttonTag);
          }
       }
       };
  xhttp.open("GET", barURL, true);
  xhttp.send();      
};

function loadFilms(filmUrl){
  var tag="demo";
  var url;
  for (url of filmUrl){
           var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var obj = JSON.parse(this.responseText);
           
           var x="<ul><li><b><h4>Title :"+obj.title+"</h4></b></li>";
           x+="<ul><li>Episode ID :"+obj.episode_id+"</li>";
           x+="<li>Opening Crawl :"+obj.opening_crawl+"</li>";
           x+="<li>Director :"+obj.director+"</li>";
           x+="<li>Producer :"+obj.producer+"</li>";
           x+="<li>Release Date :"+obj.release_date+"</li>";
           x+="<li>Characters :"+setUrl(obj.characters)+"</li>";
           x+="<li>Planets :"+setUrl(obj.planets)+"</li>";
           x+="<li>Starships :"+setUrl(obj.starships)+"</li>";
           x+="<li>Vehicles :"+setUrl(obj.vehicles)+"</li>";
           x+="<li>Species :"+setUrl(obj.species)+"</li>";
           x+="<li>Created :"+obj.created+"</li>";
           x+="<li>Edited :"+obj.edited+"</li>";
           x+="<li>Url :"+obj.url+"</li></ul>";
           x+="</ul>";
           document.getElementById(tag).innerHTML+=x;
      }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
  }
  return "";
}

function setUrl(tags){
  if(tags.length==0){
    return "";
  }
  var result="<ol>";
  var item;
  for(item of tags){
      result+="<li>"+item+"</li>";
     }
     return result+"</ol>";
}

function getNextURL(){
  var count=parseInt(document.getElementById("next").value);
  count++;
  document.getElementById("next").innerHTML=count.toString();
  alert("https://swapi.co/api/people/"+count);
  return "https://swapi.co/api/people/"+count;
}
