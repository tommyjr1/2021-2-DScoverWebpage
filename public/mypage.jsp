<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
    <title>Mypage</title>
  </head>
  <body>
  	<h1>My Page</h1>
  	<div class='wrapper'>
	  	<nav>
		  <div class="nav nav-tabs" id="nav-tab" role="tablist">
		    <button class="nav-link" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">History</button>
		    <button class="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
	<!-- 	    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contacst</button>
	 -->	  </div>
		</nav>
		
		<div class="tab-content" id="nav-tabContent">
		  <div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
		  	my content
		  	<div class="card" style="width: 18rem;">
			  <div class="card-body">
			    <h5 class="card-title">Card title</h5>
			    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
			    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			    <a href="#" class="card-link">Card link</a>
			    <a href="#" class="card-link">Another link</a>
			  </div>
			</div>
		  	
		  	
		 
		  </div>
		  <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
		  	my profile
		  	
		  	<%@ page import ="java.sql.*" %>
			<% String userName="";String userStudentid="";String userPassword="";
	    	String userid = "test2";    
			try{
			    	
/* 			        String userid = request.getParameter("userid");
 */			/*         String details = request.getParameter("details");
			 */        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
			        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/dscoverdb?" + "user=root&password=Jewelmysql");
			        PreparedStatement pst = conn.prepareStatement("SELECT * FROM users WHERE userid=?");
			        pst.setString(1, userid);
			       
			        ResultSet rs = pst.executeQuery();
			        
			        if(rs.next()){           
				        userName = rs.getString("username");
				        userStudentid = rs.getString("studentid");
				        userPassword = rs.getString("password");
			        }
				    else
			        	userName = ""; 
			    }
			   catch(Exception e){       
			       out.println("Something went wrong !! Please try again");       
			   }      
			%>
			<form action="edit_profile.jsp" method="post">
		  		<table>
		  			<tr>
		  				<td>Name</td>
		  				<td> <input type="text" name="username" value="<%=userName %>"> </td>
		  			</tr>
		  			<tr>
					    <td>Student ID</td>
					    <td> <input type="text" name="studentid" value="<%=userStudentid %>"> </td>
				    </tr>
				    <tr>
					    <td>Password</td>
					    <td> <input type="password" name="password" value="<%=userPassword %>"> </td>
				    </tr>
				    <tr>
				    	<td><button type="submit" name="editprofile">Save</button></td>
				    </tr>
		  		</table>
		  	</form>
		  </div>
		  <!--  --><div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
		</div>
  	
  	</div>
  
  

	
    
    
  </body>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  
</html>