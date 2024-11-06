package db;

import model.Drawing;

public interface DrawingDAO {
    String findByDrawUsername(String username);
}
