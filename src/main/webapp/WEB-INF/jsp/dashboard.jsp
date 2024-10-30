<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>

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
        <c:forEach var="elemento" items="${elementos}" varStatus="status">
            <li>
                ${elemento}
                <form action="deleteElement" method="post" style="display:inline;">
                    <input type="hidden" name="index" value="${status.index}">
                    <button type="submit">Eliminar</button>
                </form>
            </li>
        </c:forEach>
    </ul>

    <button onclick="window.location.href='logoutServlet'">Logout</button>
    <button onclick="window.location.href='draw'">Ir a Draw</button>
</body>
</html>
