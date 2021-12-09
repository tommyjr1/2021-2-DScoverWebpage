<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Web programming</title>
</head>

<body>

<%@ page import ="java.sql.*" %>
<% String userName="";
    try{
    	
    	userName = request.getParameter("username");   
        String password = request.getParameter("password");
        String studentid = request.getParameter("studentid");   
        String userid = request.getParameter("userid");
/*         String details = request.getParameter("details");
 */        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/dscoverdb?" + "user=root&password=Jewelmysql");
        
        String sql = "insert into users(userid, password, username, studentid) values(?,?,?,?)";
        PreparedStatement ps = null;
        ps = conn.prepareStatement(sql);
        ps.setString(1,userid);
        ps.setString(2, password);
        ps.setString(3, userName);
        ps.setString(4, studentid);
/*         ps.setString(5, details);
 */        
        int i=ps.executeUpdate();
                                   
        if(i==0)  {         
        
           userName = "";   
           }         
   }
   catch(Exception e){       
       out.println("Something went wrong !! Please try again");       
   }      
%>


</body>

</html>
