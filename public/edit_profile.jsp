<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Web programming</title>
</head>

<body>

<%@ page import ="java.sql.*" %>
<% String userName="";
String userid = "test2";

    try{
    	
    	userName = request.getParameter("username");   
        String password = request.getParameter("password");
        String studentid = request.getParameter("studentid");   
/*         String details = request.getParameter("details");
 */        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/dscoverdb?" + "user=root&password=Jewelmysql");
        
        String sql = "UPDATE users SET usersname=?,password=?,studentid=? WHERE userid=? ";
        PreparedStatement ps = null;
        ps = conn.prepareStatement(sql);
        ps.setString(4,userid);
        ps.setString(2, password);
        ps.setString(1, userName);
        ps.setString(3, studentid);
/*         ps.setString(5, details);
 */        
        int i=ps.executeUpdate();
                                   
        if(i==0)  {         
           userName = "";   
           }
        else{
        	%>
        	<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        	  <div class="toast-header">
        	    <img src="..." class="rounded me-2" alt="...">
        	    <strong class="me-auto">Bootstrap</strong>
        	    <small>11 mins ago</small>
        	    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        	  </div>
        	  <div class="toast-body">
        	    Hello, world! This is a toast message.
        	  </div>
        	</div>
        	<%
        }
   }
   catch(Exception e){       
       out.println("Something went wrong !! Please try again");       
   }      
%>


</body>

</html>
