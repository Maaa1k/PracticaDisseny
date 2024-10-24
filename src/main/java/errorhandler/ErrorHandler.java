package errorhandler;

public class ErrorHandler {
    public static void manejarError(ErrorCodes codigoError) {
        // Aquí puedes implementar lógica adicional, como registrar el error
        System.out.println("Código de error: " + codigoError + " - " + codigoError.getStatus());
        // Notificar al usuario
        notificarUsuario(codigoError.getStatus());
    }

    private static void notificarUsuario(String mensaje) {
        // Lógica para notificar al usuario
        System.out.println("Notificación al usuario: " + mensaje);
    }
}
