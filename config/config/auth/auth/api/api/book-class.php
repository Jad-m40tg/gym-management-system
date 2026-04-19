<?php
require_once '../config/config.php';
require_once '../config/database.php';

if (!isLoggedIn()) {
    echo json_encode(['success' => false, 'message' => 'Please login first']);
    exit();
}

$classId = intval($_POST['class_id'] ?? 0);
$userId = $_SESSION['user_id'];

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Check capacity
    $stmt = $db->prepare("
        SELECT c.capacity, COUNT(cb.id) as booked
        FROM classes c
        LEFT JOIN class_bookings cb ON c.id = cb.class_id AND cb.status = 'booked'
        WHERE c.id = ?
        GROUP BY c.id
    ");
    $stmt->execute([$classId]);
    $class = $stmt->fetch();
    
    if ($class['booked'] >= $class['capacity']) {
        echo json_encode(['success' => false, 'message' => 'Class is full']);
        exit();
    }
    
    // Check if already booked
    $stmt = $db->prepare("
        SELECT id FROM class_bookings
        WHERE user_id = ? AND class_id = ? AND status = 'booked'
    ");
    $stmt->execute([$userId, $classId]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Already booked']);
        exit();
    }
    
    // Book class
    $stmt = $db->prepare("
        INSERT INTO class_bookings (user_id, class_id, status)
        VALUES (?, ?, 'booked')
    ");
    $stmt->execute([$userId, $classId]);
    
    echo json_encode(['success' => true, 'message' => 'Class booked successfully']);
    
} catch (Exception $e) {
    error_log("Book class error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Booking failed']);
}
?>
