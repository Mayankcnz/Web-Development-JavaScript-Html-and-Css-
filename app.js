var app = angular.module('plunker', ['ngAnimate']);

app.controller('MainCtrl', function($scope, $http) {
  
  $scope.currentBuildingID = 0;
  var Project_Number = 3;
  
   
  $scope.projectInformation = [];
 
  $scope.loginVisible = true;
  $scope.directoryVisible = false;
  $scope.makeitVisible = false;
  $scope.AfterEdit = false;
  $scope.shouldIshow = false;
  $scope.showonAddPress = false;
  $scope.afterprojectInfo = false;
  $scope.showProject = false;
  $scope.count = 0;
  
  //$scope.id = 0;
  $scope.id = 0;
  
  $scope.Project_ID = null;
  $scope.Contractor_Name = null;
  $scope.Owner_Name = null;
  $scope.Project_Start_Date = null;
  $scope.Project_Name = null;
  $scope.Building_ID = null;
  $scope.Building_Address = null;
  $scope.Building_Type = null;
  $scope.Construction_Date = null;
  $scope.Owner_Name = null;
 

  $scope.myData = null;
  $scope.name = 'World';
  
  $scope.target = 'https://happybuildings.sim.vuw.ac.nz/api/chandemaya/user_list.json';
  
  $http.get($scope.target)
          .then(
            function sucessCall(response) { 
              $scope.myData = response.data.users;
             // $scope.feedback = "File read successfully.";
            },
            function errorCall() {
              $scope.feedback = "Error reading file.";
              $scope.myData = null;
            }
  );  

  var form = document.getElementById("myForm");
   
  $scope.loginValidation = function() { 
  $scope.validUsernameManager = false;
  $scope.validPasswordManager = false;
 
  $scope.validPasswordOwner = false;
  $scope.validPasswordOwner = false;
   
   
   var getuser = document.getElementById("customx").value;
   var getpass = document.getElementById("givepass").value;
  
   if($scope.myData === null){
     $scope.feedbaclk = "Sorry, error reading file";
   }
   var gets =  document.getElementById("myButton1").innerText;
   if( gets == "Choose") {
     $scope.feedback = "Pls Choose"; 
   }
   
    for(i = 0; $scope.myData !== null && i < $scope.myData.length; i++) {
     if($scope.count === 0){
       document.getElementById('givepass').style.borderColor = "red"; 
       document.getElementById('customx').style.borderColor = "red";   
       $scope.feedback = "please select an option first";
	     
     }else if($scope.count == 1){

     if($scope.myData[i].LoginName == getuser && $scope.myData[i].UserType == "manager") {
        $scope.validUsernameManager = true;
     }
     if($scope.myData[i].Password == getpass &&  $scope.myData[i].UserType == "manager"){ 
       $scope.validPasswordManager = true;
     }
   
   }else if($scope.count == 2) {
     if($scope.myData[i].LoginName == getuser && $scope.myData[i].UserType == "owner") {
       $scope.validUsernameOwner = true;
     }
     if($scope.myData[i].Password == getpass &&  $scope.myData[i].UserType == "owner"){
       $scope.validPasswordOwner = true;
     }
  }
 } 
   
   if($scope.count == 1){
   if($scope.validUsernameManager && $scope.validPasswordManager){
     
     $scope.feedback = "Login Sucessful as "+getuser;
     $scope.loginVisible = false;
     $scope.directoryVisible = true;
     
   }else {
     
     if(getuser.length === 0 && getpass.length === 0){         
         $scope.feedback = "Please input username and password";         
        document.getElementById('givepass').style.borderColor = "red"; 
        document.getElementById('customx').style.borderColor = "red"; 
       }else { 
     $scope.feedback = "Login Failed";     
     document.getElementById('customx').style.borderColor = "red";    
     document.getElementById('givepass').style.borderColor = "red";
       }     
   }
  }else if($scope.count == 2){ 
    if($scope.validUsernameOwner && $scope.validPasswordOwner){
     
     $scope.feedback = "Login Sucessful as "+getuser;
     $scope.loginVisible = false;
     $scope.directoryVisible = true;   
   }else {
     
     if(getuser.length === 0 && getpass.length === 0){  
         $scope.feedback = "Please input username and password"; 
        document.getElementById('givepass').style.borderColor = "red"; 
        document.getElementById('customx').style.borderColor = "red"; 
       }else {
     $scope.feedback = "Login Failed";
     document.getElementById('customx').style.borderColor = "red";
     document.getElementById('givepass').style.borderColor = "red";

 	}
  }
 
 }
};
  
  $scope.PostTOJSON = function() {
    
  var id = document.getElementById("ID").value;
  var owner = document.getElementById("OWNER").value;
  var Address = document.getElementById("ADDRES").value;
  var BuildingType = document.getElementById("BUILDINGTYPE").value;
  var ConstructionDate = document.getElementById("CONSTRUCTIONDATE").value;
   
  };
  
  $scope.onthis = function() {
  $scope.showProject = true; 
  };
	
  $scope.currentProject = null;
  $scope.comments = null;
  var testCommentArray = [];
  
  
  $scope.EditProject = function(its) {
    
    $scope.shouldIshow = true;
    $scope.AfterEdit = false;
	  
    var index = $scope.projectsBasedonID.indexOf(its);
    $scope.currentProject = $scope.projectsBasedonID[index];
    $scope.comments = $scope.projectBasedonID[index].Comments;
  };

    
  
  $scope.projectInfo = []; //stores the project into this array
  $scope.tempArray = [];

  //var tmpArr = []; //stores the projects of the building
  $scope.projects = null;
  
  $scope.counter = 0;
   $scope.runner = 0;
  
  var x = 100;
  
  $scope.projectsBasedonID = [];
  
  for (var i = 0; i < x; i++) {
  
    $scope.me = 'https://happybuildings.sim.vuw.ac.nz/api/chandemaya/project.' + [i] + '.json';
    
    $http.get($scope.me) //get the file from the url and store the data
      .success(function(data) {
        tmpArr = data;
        $scope.projectInfo.push(tmpArr);
        $scope.feedback = 'Server Loaded';
        //console.log($scope.projectArray.hasOwnProperty("ProjectID"));
        $scope.counter++;
      });
      
      $scope.runner++;
      
  }

$scope.onedit = function(it) {
  
   $scope.projectsBasedonID = [];
   
  $scope.directoryVisible = false;
  $scope.AfterEdit = true;
  
  var index = $scope.buildingData.indexOf(it);
  var min = $scope.buildingData[index].ID;
  
  $scope.tempArray.push(min.toString());
  //$scope.min = index;
  min = min.toString();
  

  for(i = 0; $scope.projectInfo !== null && i < $scope.projectInfo.length; i++) {
    
    
    if($scope.projectInfo[i].BuildingID == min) {
    
     $scope.projectsBasedonID.push({
       
       //$scope.projectInfo[i]
  ProjectID: $scope.projectInfo[i].ProjectID,
  Name: $scope.projectInfo[i].Name,
  BuildingID: $scope.projectInfo[i].BuildingID,
  status: $scope.projectInfo[i].Status,
  StartDate: $scope.projectInfo[i].StartDate,
  EndDate: $scope.projectInfo[i].EndDate,
  ContactPerson: $scope.projectInfo[i].ContactPerson,
  ProjectManager: $scope.projectInfo[i].ProjectManager,
  Contractor: $scope.projectInfo[i].Contractor
    
    });   
   }
  }
  
  $scope.lul = $scope.projectBasedonID; 
};

$scope.clickedEdit = function() {
  
  $scope.shouldIshow = true;
  $scope.AfterEdit = false;
};
  
  
   $scope.gobacktoHomePage = function() {
    
     alert("Are you sure?");
    $scope.loginVisible = true;
    $scope.directoryVisible = false;
    $scope.AfterEdit = false;
    $scope.shouldIshow = false;
    $scope.count = 0;
    $scope.feedback = "";
    document.getElementById("myButton1").innerText ="Choose who to login as...";
    
    form.reset();
    
  };
  
  $scope.closeproject = function() {
    $scope.showProject = false;
  };
  
  $scope.takeitBackDirectory = function() {
    
    $scope.directoryVisible = true;
    $scope.AfterEdit = false;
  };
  
  $scope.takeitBacktoProject = function() {
    
    $scope.shouldIshow = false;
    $scope.AfterEdit = true;
  
  };
  
  $scope.pressedIT = function() {
    if(!$scope.makeitVisible) {
      $scope.makeitVisible = true;
    }else {
      $scope.makeitVisible = false;
    }
  };
  
  $scope.clickedManager = function() {
    
  
     $scope.count = 1;
   
   document.getElementById("myButton1").innerText ="Manager";
   $scope.makeitVisible = false; 
  
    
  };
  
  $scope.clickedOwner = function() {
    
      $scope.count = 2;
      
      
     document.getElementById("myButton1").innerText ="Owner";
     $scope.makeitVisible = false;
    
    
  };
  
  $scope.addProject = function() {
    
    $scope.runner++;
    
    var write = 'https://happybuildings.sim.vuw.ac.nz/api/chandemaya/update.project.json';
    
     var index = 0;
   
  
    var projectObj = {
      
          "ProjectID":	$scope.runner,
						"Name":	$scope.Name,
						"BuildingID":	"222",	
						"Status":	$scope.statuss,	
						"StartDate":	$scope.Startdate,
						"EndDate":	$scope.EndDate,
						"ContactPerson":	$scope.ContactPerson,
						"ProjectManager":	$scope.Manager,
						"Contractor":	$scope.Contractor,
      
    };
    
   $scope.promise1 = $http
            ({
              method: "POST",
              url: write,
              data: projectObj,
              headers: {'Content-Type': 'application/json'}
            })
            .then(function sucessCall(response) { 
              $scope.lol = "Post>> " + JSON.stringify(projectObj);
            }, function errorCall(response) {
              $scope.lol = "Error posting:" + " Status: "+ response.status + " Writing: " + JSON.stringify(projectObj);
            }
      );
   
    
$scope.ProjectId = "";
$scope.Name = "";
$scope.BuildingID	= "";
$scope.statuss = "";
$scope.Startdate = "";
$scope.EndDate = "";
$scope.ContactPerson = "";
$scope.Manager = "";
$scope.Contractor = "";

  };

  $scope.duckerino = function() {
    
    this.feedback = "";
    
  document.getElementById('givepass').style.borderColor = "white"; 
   
   document.getElementById('customx').style.borderColor = "white"; 
  };
  
  $scope.pressedAdd = function() {
    $scope.showonAddPress = true;
    
  };
  
  $scope.takeLastPageBack = function() {
    
    $scope.afterprojectInfo = false;
    $scope.shouldIshow = true;
    
  };
  
  
   $scope.commentss = [];
  
  $scope.addComment = function() {
    
    $scope.commentss.push({
      
      "coo": $scope.getss
      
    });
    
    $scope.getss = "";
  };
  
  $scope.ClickedCancel = function() {
    
    $scope.showonAddPress = false;
  };
  
  $scope.didclicked = function() {
    
    $scope.afterprojectInfo = true;
    $scope.shouldIshow = false;
    
    
  };
  
  $scope.deleteProject = function(ind) {
    
     var index = $scope.projectsBasedonID.indexOf(ind);
    $http.delete('/api/Default?' + index);

    $scope.projectsBasedonID.splice(index, 1);

  };
  
  $scope.deleteComment = function(it) {
    
    var index = $scope.commentss.indexOf(it);
    

    $scope.commentss.splice(index, 1);
    
  };
  
  $scope.deleteitem = function(it) {
    
      var index = $scope.buildingData.indexOf(it);
    $http.delete('/api/Default?' + index);

    $scope.buildingData.splice(index, 1);
    
  };

 $scope.closeValidation = function() {
   
form.reset();

 };

  
  $scope.buildingData = null;
  
  $scope.look = 'https://happybuildings.sim.vuw.ac.nz/api/chandemaya/building_dir.json';
  
   $http.get($scope.look)
          .then(
            function sucessCall(response) { 
              $scope.buildingData = response.data.buildings;
              $scope.feedback = "File read successfully Mayank.";
            },
            function errorCall() {
              $scope.feedback = "Error reading file.";
              $scope.buildingData = null;
            }
  );   

  
   $scope.addBulding = function() {
     
 
    var write = 'https://happybuildings.sim.vuw.ac.nz/api/chandemaya/update.building.json';

   var sourceObj = {
 
     "ID": $scope.newbuilding.ID,
     "Owner": $scope.newbuilding.Owner,
     "Address": $scope.newbuilding.Address,
     "BuildingType": $scope.newbuilding.BuildingType,
    "ConstructionDate": $scope.newbuilding.ConstructionDate,
     
     
   };
   
    $scope.promise1 = $http
            ({
              method: "POST",
              url: write,
              data: sourceObj,
              headers: {'Content-Type': 'application/json'}
            })
            .then(function sucessCall(response) { 
              $scope.lol = "Post>> " + JSON.stringify(sourceObj);
            }, function errorCall(response) {
              $scope.lol = "Error posting:" + " Status: "+ response.status + " Writing: " + JSON.stringify(sourceObj);
            }
      );
   
    
   $scope.newbuilding.ID = "";
  $scope.newbuilding.Owner = "";
   $scope.newbuilding.Address = "";
    $scope.newbuilding.BuildingType = "";
     $scope.newbuilding.ConstructionDate = "";
     
     var ID = document.getElementById("ID").value;
     var Owner = document.getElementById("OWNER").value;
     var Address = document.getElementById("ADDRESS").value;
    
     
     var table = document.getElementById("mytable");
     
     var row = table.insertRow(2);
     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2);
     var actionCell = row.insertCell(3);
     cell1.innerHTML = ID;
     cell2.innerHTML = Owner;
     cell3.innerHTML = Address;
     actionCell.innerHTML = '<button on-click = "delete('+2+')>Edit</button>';

  };
  
  $scope.delete = function(index) {
    
  var table = document.getElementById("mytable");
  table.deleteRow(index + 1);
    
  };
  
  
});





