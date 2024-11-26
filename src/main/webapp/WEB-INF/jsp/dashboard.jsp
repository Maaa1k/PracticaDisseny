<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
</head>
<body>
    <h1>Bienvenido al Dashboard</h1>
    <h2>Dibujos Guardados</h2>
    <table>
        <thead>
            <tr>
                <th>Nombre del Dibujo</th>
                <th>ID Dibujo</th>
                <th>Nombre Usuario</th>
                <th>Acciones</th> <!-- Nueva columna para acciones -->
            </tr>
        </thead>
        <tbody>
            <c:forEach var="drawing" items="${drawings}">
                <tr>
                    <td>${drawing.name}</td>
                    <td>${drawing.id}</td>
                    <td>${drawing.user}</td>
                    <td>
                        <!-- Enlace para ver el dibujo -->
                        <a href="newview?id=${drawing.id}">Ver</a>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
    <button onclick="window.location.href='logoutServlet'">Logout</button>
    <button onclick="window.location.href='draw'">Ir a Draw</button>
</body>
</html>
