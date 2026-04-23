<?php
require_once '../config/config.php';
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $sql = "
        SELECT 
            c.id,
            c.name,
            c.day_of_week,
            c.start_time,
            c.duration_minutes,
            c.difficulty,
            c.capacity,
            t.name AS trainer_name,
            (SELECT COUNT(*) FROM class_bookings WHERE class_id = c.id AND status = 'booked') AS booked_count
        FROM classes c
        JOIN trainers t ON c.trainer_id = t.id
        ORDER BY 
            FIELD(c.day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
            c.start_time
    ";
    
    $stmt = $db->query($sql);
    $classes = $stmt->fetchAll();
    
    // Add available spots
    foreach ($classes as &$class) {
        $class['available_spots'] = $class['capacity'] - $class['booked_count'];
    }
    
    echo json_encode(['success' => true, 'data' => $classes]);
    
} catch (Exception $e) {
    error_log("Get classes error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to load classes']);
}
?>