<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
</head>
<body>
    <h1>Bienvenido al Dashboard</h1>

    <h2>Lista de Elementos</h2>
    <ul>
        <c:forEach var="elemento" items="${elementos}">
            <li>${elemento}</li>
        </c:forEach>
    </ul>

    <h2>Dibujos Guardados</h2>
    <div>
        <c:forEach var="drawing" items="${drawings}">
            <img src="${drawing}" alt="Dibujo" style="max-width: 200px; max-height: 200px; margin: 10px;">
        </c:forEach>
    </div>

    <button onclick="window.location.href='logoutServlet'">Logout</button>
    <button onclick="window.location.href='draw'">Ir a Draw</button>
</body>
</html>
