<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title></title>
</head>

<body>

<%@ page import ="java.sql.*" %>
<% String userName="";
    try{
    	
        String userid = request.getParameter("userid");   
        String password = request.getParameter("password");
        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/dscoverdb?" + "user=root&password=Jewelmysql");    
        PreparedStatement pst = conn.prepareStatement("Select userid,password,username from users where userid=? and password=?");
        pst.setString(1, userid);
        pst.setString(2, password);
        ResultSet rs = pst.executeQuery();                        
        if(rs.next())           
           userName = rs.getString("username");        
        else
        	userName = "";            
   }
   catch(Exception e){       
       out.println("Something went wrong !! Please try again");       
   }      
%>
