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
    <h2>Dibujos Guardados</h2>
    <table>
        <thead>
            <tr>
                <th>Nombre del Dibujo</th>
                <th>Imagen</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach var="drawing" items="${drawings}">
                <tr>
                    <!-- Mostrar el nombre del dibujo -->
                    <td>${drawing.name}</td>
                    <td>
                        <!-- Mostrar el dibujo usando su URL base64 -->
                        <img src="${drawing.drawingData}" alt="Dibujo" style="max-width: 200px; max-height: 200px; margin: 10px;">
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>

    <button onclick="window.location.href='logoutServlet'">Logout</button>
    <button onclick="window.location.href='draw'">Ir a Draw</button>
</body>
</html>
