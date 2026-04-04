<?php
require_once '../../config/config.php';
require_once '../../config/database.php';

if (!isAdmin()) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

if (!verifyCSRFToken($_POST['csrf_token'] ?? '')) {
    echo json_encode(['success' => false, 'message' => 'Invalid token']);
    exit();
}

$id = intval($_POST['id'] ?? 0);

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $stmt = $db->prepare("DELETE FROM users WHERE id = ? AND role = 'member'");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true, 'message' => 'Member deleted']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Delete failed']);
}
?>